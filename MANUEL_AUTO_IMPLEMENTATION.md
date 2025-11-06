Parfait — je configure tout pour **exécuter en local (terminal Windsurf)**, **Studio sur sous-domaine (option B)**, et **Mode 2 (semi-auto sécurisé : proposition → “OK, valide” → exécution)**. Les agents et leurs étapes respectent strictement tes règles et garde-fous (noms exacts, types, tableaux définis, `_key`, styling) tirés de ta doc.    

---

# ⚙️ Orchestration multi-agents (prête à coller dans Claude Agent EI)

## 0) Prompt Orchestrateur (MASTER)

> **Contexte d’exécution :** local (terminal Windsurf).
> **Studio :** déporté en sous-domaine (ex. `studio.mondomaine.com`).
> **Mode :** *Semi-automatique sécurisé* — chaque agent **propose**, attend “**OK, valide**”, puis **exécute**.
>
> **Règles globales (non négociables) :**
>
> * Lire les schémas Sanity avant toute création. Tables/arrays **toujours définis** (jamais `null`). **Noms exacts** des champs. **Types conformes**. Générer des **`_key`** uniques. **Styling** et `backgroundSettings` obligatoires sur chaque bloc.  
> * En cas de slug/titre similaire : **supprimer l’ancienne page et créer la nouvelle en une *transaction atomique***.
> * **Wipe total des pages** avant recréation (fichiers `app/(website)/*` hors `layout.tsx`, `/api`, `/studio` + documents Sanity `_type == "page"`), **puis** recréer uniquement les pages validées.
> * À la fin : **Admin** mis à jour pour lister toutes les nouvelles pages (titre, slug, dates, actions). 
>
> **Pipeline d’agents :**
>
> 1. `architect-ei` → Analyse+Plan (propose, attend validation)
> 2. `pages-builder-ei` → Wipe + Recréation pages + Injection Sanity (propose, attend validation, exécute)
> 3. `ui-blocks-ei` → UI/BlockRenderer/Schemas (propose, attend validation, exécute)
> 4. `admin-sync-ei` → Page `/admin` & liste des pages (propose, attend validation, exécute)
>
> **Démarrage :** `architect-ei` commence par **demander le README**, le lit, puis **résume l’architecture en 8–12 points** et lance l’**interview client** (Q1–Q7). **Aucune écriture** tant que je n’ai pas répondu “OK, valide”.  

---

## 1) Agent : `architect-ei` (Analyse & Plan)

**Prompt :**

> Rôle : analyser l’archi (Next 16 + App Router, React 19, Sanity), blocs, schémas, routes, APIs d’auto-génération, conventions.
> Tâches :
>
> 1. Lire la doc, résumer l’archi en **8–12 points**.  
> 2. Lancer **l’interview client** (Q1–Q7) et synthétiser les réponses en **plan de pages** (ordre, sections/blocs par page).
> 3. Lister les **impacts potentiels** : nouveaux blocs/UI, extensions BlockRenderer, ajustements de schémas.
> 4. Présenter un **Plan d’implémentation** en étapes :
>
>    * Wipe total pages (fichiers + Sanity)
>    * Recréation pages (slug, SEO, blocs conformes)
>    * Header/Footer
>    * Admin list view
> 5. **Attendre “OK, valide”**. *Aucune écriture.*

**Rappels de conformité** : Noms exacts, types exacts, arrays jamais null, `_key` pour tous les items, styling par bloc.  

---

## 2) Agent : `pages-builder-ei` (Wipe & (Re)création + Injection Sanity)

**Prompt :**

> Rôle : exécuter le **wipe total** puis **recréer** uniquement les pages validées, avec contenu **auto-injecté** dans Sanity (aucune étape manuelle).
> **Séquence (toujours “proposer → OK, valide → exécuter”)** :
>
> 1. **Proposer** : plan de Wipe (côté fichiers et côté Sanity) + liste des pages à (re)créer.
> 2. **Exécuter** (après validation) :
>
>    * **Sanity – Wipe pages** : supprimer tous les docs `_type == "page"`.
>    * **Fichiers – Wipe app/(website)** : supprimer pages/segments sauf `layout.tsx`, conserver `/api` et `/studio`.
>    * **Pour chaque page validée** :
>
>      * Vérifier doublons (slug identique OU `title` voisin) → si trouvé, **delete + create en transaction**.
>      * Créer le document `page` : `title`, `slug: {current}`, `seoTitle`, `seoDescription`, `seoKeywords: []`, `pageBuilder: [...]` (blocs).
>      * Chaque **bloc** : arrays définis `[]`, **`_key`** pour tous les items, **types** conformes (ex. `stats[].number: string`), **styling & backgroundSettings** présents.  
> 3. Confirmer les pages créées.
>
> **Snippet (à adapter)** :
>
> ```ts
> import { client } from "@/sanity/lib/client";
>
> const genKey = (p:string,i?:number)=>`${p}-${Date.now()}-${i??Math.random().toString(36).slice(2,9)}`;
> const norm = (s:string)=>s.trim().toLowerCase();
>
> // 0) Wipe Sanity pages
> const old = await client.fetch(`*[_type == "page"]{_id}`);
> if (old.length) {
>   let tx = client.transaction();
>   for (const d of old) tx = tx.delete(d._id);
>   await tx.commit();
> }
>
> // 1) Recreate pages
> async function upsertPage({ title, slug, blocks, seo }:{
>   title:string; slug:string; blocks:any[]; seo?:{title?:string; description?:string; keywords?:string[]};
> }) {
>   const existing = await client.fetch(
>     `*[_type=="page" && (slug.current==$slug || lower(title) match $titleMatch)]{_id}`,
>     { slug, titleMatch: norm(title)+"*" }
>   );
>   let tx = client.transaction();
>   for (const e of existing) tx = tx.delete(e._id);
>   const doc = {
>     _type: "page",
>     title,
>     slug: { current: slug },
>     seoTitle: seo?.title ?? title,
>     seoDescription: seo?.description ?? "",
>     seoKeywords: seo?.keywords ?? [],
>     pageBuilder: blocks, // blocs conformes à tes schémas
>   };
>   tx = tx.create(doc);
>   await tx.commit();
> }
> ```
>
> *(Rappels : never null arrays, `_key` partout, types & noms exacts.)*  

---

## 3) Agent : `ui-blocks-ei` (UI, BlockRenderer, Schémas)

**Prompt :**

> Rôle : **proposer puis appliquer** les modifications UI, extensions du **BlockRenderer**, et évolutions de **schémas Sanity** nécessaires pour rendre les blocs/sections du plan.
> **Process** :
>
> 1. **Proposer** précisément : fichiers touchés, nouvelles props, validations, effets sur le rendu.
> 2. Attendre “OK, valide”.
> 3. **Exécuter** :
>
>    * Schémas (noms exacts, types stricts, `.required()` pertinents).
>    * BlockRenderer (mapping `_type` → composant ; fallback sûr).
>    * UI components (variants, theming, spacing, `backgroundSettings` + `styling`).
> 4. Garantir : **aucune liste sans `_key`**, **aucun tableau null**, **`stats[].number` string**, **cohérence des noms**.  

---

## 4) Agent : `admin-sync-ei` (Admin & Listing des Pages)

**Prompt :**

> Rôle : mettre à jour `/admin` pour **lister toutes les pages** et offrir actions rapides.
> **Proposer → OK, valide → Exécuter** :
>
> * Vue liste : `title`, `slug`, `_createdAt`, `_updatedAt`, actions “Voir”, “Éditer Studio”, “Recréer”.
> * Requête GROQ :
>
>   ```ts
>   *[_type == "page"] | order(_updatedAt desc) {
>     _id, title, "slug": slug.current, _createdAt, _updatedAt
>   }
>   ```
> * Lier vers `/<slug>` et vers le doc dans Studio. 

---

# 🏗️ Studio en sous-domaine (option B)

**Cible :** `studio.mondomaine.com`

* Déporter le Studio depuis l’app : soit **standalone Studio** déployé séparément, soit route `/studio` proxyée vers sous-domaine.
* L’agent proposera la **stratégie** (standalone recommandé), attendra **“OK, valide”**, puis :

  * génèrera le projet Studio (si nécessaire),
  * config DNS + déploiement,
  * ajustera les liens Admin → Studio.
    *(La doc centralise les accès : `Site`, `Studio`, `Admin`.)* 

---

## ✅ Garde-fous d’exécution (rappel rapide)

* **Lire schémas** → respecter noms/typos/types/required. 
* **Jamais** de tableau `null` → toujours `[]`.  
* **`_key`** unique sur **tous** les items d’array.  
* **Styling + backgroundSettings** sur **chaque** bloc. 
* **Transactions atomiques** pour *delete + create* d’une page (idempotence).
* **Admin** toujours synchronisé après création. 

---

## 🧩 Prochaine étape (zéro friction)

Dis juste :

```
OK, lance architect-ei.
```

Il te posera l’interview (Q1→Q7), proposera le plan, et attendra “OK, valide” avant que les autres agents n’exécutent.
