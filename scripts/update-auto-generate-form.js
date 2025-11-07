/**
 * Script pour mettre à jour le formulaire d'auto-génération
 * Usage: node scripts/update-auto-generate-form.js
 */

const fs = require('fs');
const path = require('path');

const PAGE_PATH = path.join(__dirname, '../src/app/admin/auto-generate/page.tsx');

console.log('🔧 Mise à jour du formulaire d'auto-génération...\n');

// Lire le fichier actuel
let content = fs.readFileSync(PAGE_PATH, 'utf8');

// 1. Mettre à jour l'indicateur d'étapes (5 -> 6)
console.log('✓ Mise à jour de l\'indicateur d\'étapes (5 -> 6)');
content = content.replace(
  '{[1, 2, 3, 4, 5].map(num =>',
  '{[1, 2, 3, 4, 5, 6].map(num =>'
);

// 2. Ajouter StepInfo après StepsIndicator
console.log('✓ Ajout de StepInfo');
const stepInfoCode = `

      <StepInfo>
        <StepNumber>Étape {step}/6</StepNumber>
        <StepDescription>
          {step === 1 && 'Choisissez le type de site que vous souhaitez créer'}
          {step === 2 && 'Renseignez les informations de base de votre site'}
          {step === 3 && 'Sélectionnez les pages à créer'}
          {step === 4 && 'Configurez les blocs pour chaque page'}
          {step === 5 && 'Personnalisez le style et les couleurs'}
          {step === 6 && 'Vérifiez et validez votre configuration'}
        </StepDescription>
      </StepInfo>
`;

content = content.replace(
  '</StepsIndicator>',
  '</StepsIndicator>' + stepInfoCode
);

// 3. Mettre à jour l'étape 1 (ajouter descriptions)
console.log('✓ Mise à jour de l\'étape 1');
content = content.replace(
  /<StepTitle>📋 Type de projet<\/StepTitle>\s*<Grid>/,
  `<StepTitle>📋 Type de projet</StepTitle>
            <StepSubtitle>Sélectionnez le type de site qui correspond le mieux à vos besoins</StepSubtitle>
            <Grid>`
);

content = content.replace(
  /<Card\s+key={type\.id}\s+\$selected={config\.projectType === type\.id}\s+onClick={\(\) => updateConfig\('projectType', type\.id\)}\s*>/g,
  `<ProjectCard
                  key={type.id}
                  $selected={config.projectType === type.id}
                  onClick={() => updateConfig('projectType', type.id)}
                >`
);

content = content.replace(
  /<CardTitle>{type\.name}<\/CardTitle>\s*<\/Card>/g,
  `<CardTitle>{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </ProjectCard>`
);

// 4. Mettre à jour l'étape 2 (ajouter FormGroup et labels)
console.log('✓ Mise à jour de l\'étape 2');
const step2Code = `          <Step>
            <StepTitle>📝 Informations de base</StepTitle>
            <StepSubtitle>Ces informations seront utilisées pour générer le contenu de votre site</StepSubtitle>
            
            <FormGroup>
              <Label>Nom de votre entreprise/site *</Label>
              <Input
                placeholder="Ex: Studio Créatif, Restaurant Le Gourmet..."
                value={config.siteName}
                onChange={e => updateConfig('siteName', e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description courte *</Label>
              <TextArea
                placeholder="Décrivez votre activité en 1-2 phrases. Ex: Nous sommes une agence web spécialisée dans la création de sites modernes et performants."
                value={config.siteDescription}
                onChange={e => updateConfig('siteDescription', e.target.value)}
                rows={3}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Secteur d'activité *</Label>
              <Input
                placeholder="Ex: Technologie, Santé, Restauration, Services..."
                value={config.industry}
                onChange={e => updateConfig('industry', e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Public cible</Label>
              <Input
                placeholder="Ex: Entreprises B2B, Particuliers, Professionnels de la santé..."
                value={config.targetAudience}
                onChange={e => updateConfig('targetAudience', e.target.value)}
              />
            </FormGroup>
          </Step>`;

content = content.replace(
  /{step === 2 && \(\s*<Step>[\s\S]*?<\/Step>\s*\)}/,
  `{step === 2 && (
${step2Code}
        )}`
);

// 5. Remplacer complètement l'étape 3
console.log('✓ Remplacement de l\'étape 3');
const step3Code = `{step === 3 && (
          <Step>
            <StepTitle>📄 Pages à créer</StepTitle>
            <StepSubtitle>Sélectionnez les pages que vous souhaitez inclure dans votre site</StepSubtitle>
            
            <PagesGrid>
              {defaultPages.map(page => (
                <PageCard
                  key={page.id}
                  $selected={isPageSelected(page.id)}
                  $required={page.required}
                  onClick={() => !page.required && togglePage(page.id)}
                >
                  <PageCardHeader>
                    <PageIcon>{page.icon}</PageIcon>
                    <PageName>{page.name}</PageName>
                    {page.required && <RequiredBadge>Requis</RequiredBadge>}
                  </PageCardHeader>
                  <PageDescription>{page.description}</PageDescription>
                  {isPageSelected(page.id) && (
                    <PageBlockCount>
                      {getPageBlocks(page.id).length} bloc(s) configuré(s)
                    </PageBlockCount>
                  )}
                </PageCard>
              ))}
            </PagesGrid>

            {config.pages.length > 0 && (
              <SelectedPagesInfo>
                ✅ {config.pages.length} page(s) sélectionnée(s)
              </SelectedPagesInfo>
            )}
          </Step>
        )}`;

content = content.replace(
  /{step === 3 && \(\s*<Step>[\s\S]*?<\/Step>\s*\)}/,
  step3Code
);

console.log('\n✅ Formulaire mis à jour avec succès!');
console.log('📝 Fichier sauvegardé:', PAGE_PATH);
console.log('\n⚠️  Note: Les étapes 4, 5 et 6 ainsi que les styled components doivent être ajoutés manuellement.');
console.log('📚 Consultez IMPLEMENTATION_FORMULAIRE.md pour le code complet.\n');

// Sauvegarder
fs.writeFileSync(PAGE_PATH, content, 'utf8');
