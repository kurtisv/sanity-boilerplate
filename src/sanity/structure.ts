import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Studio')
    .items([
      // === PARAMÈTRES DU SITE ===
      S.listItem()
        .title('⚙️ Paramètres du site')
        .id('settings')
        .child(
          S.list()
            .title('Paramètres du site')
            .items([
              // Header Settings
              S.listItem()
                .title('🎯 Header')
                .id('headerSettings')
                .child(
                  S.document()
                    .schemaType('headerSettings')
                    .documentId('headerSettings')
                    .title('Configuration Header')
                ),
              
              // Footer Settings
              S.listItem()
                .title('🦶 Footer')
                .id('footerSettings')
                .child(
                  S.document()
                    .schemaType('footerSettings')
                    .documentId('footerSettings')
                    .title('Configuration Footer')
                ),
            ])
        ),
      
      S.divider(),
      
      // === PAGES ===
      S.listItem()
        .title('📄 Pages')
        .id('pages')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .filter('_type == "page"')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}])
        ),
      
      S.divider(),
      
      // === BLOCS (pour référence/debug) ===
      S.listItem()
        .title('🧩 Blocs (Référence)')
        .id('blocks')
        .child(
          S.list()
            .title('Types de blocs')
            .items([
              S.listItem()
                .title('📝 Text Block')
                .child(S.documentTypeList('textBlock').title('Text Blocks')),
              S.listItem()
                .title('🦸 Hero Block')
                .child(S.documentTypeList('heroBlock').title('Hero Blocks')),
              S.listItem()
                .title('🎯 Feature Grid Block')
                .child(S.documentTypeList('featureGridBlock').title('Feature Grid Blocks')),
            ])
        ),
      
      // Autres documents (si ajoutés plus tard)
      ...S.documentTypeListItems().filter(
        (item) => !['page', 'headerSettings', 'footerSettings', 'textBlock', 'heroBlock', 'featureGridBlock'].includes(item.getId() ?? '')
      ),
    ])
