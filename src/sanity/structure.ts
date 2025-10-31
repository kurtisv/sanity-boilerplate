import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      // Dossier - Paramètres du site
      S.listItem()
        .title('Paramètres du site')
        .id('settings')
        .child(
          S.list()
            .title('Paramètres du site')
            .items([
              // Header Settings
              S.listItem()
                .title('Header')
                .id('headerSettings')
                .child(
                  S.document()
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                ),
              
              // Footer Settings
              S.listItem()
                .title('Footer')
                .id('footerSettings')
                .child(
                  S.document()
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                ),
              
              // Ajoutez d'autres paramètres ici (ex: Tracking, SEO, etc.)
            ])
        ),
      
      S.divider(),
      
      // Pages (liste normale)
      ...S.documentTypeListItems().filter(
        (item) => !['headerSettings', 'footerSettings'].includes(item.getId() ?? '')
      ),
    ])
