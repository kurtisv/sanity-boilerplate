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
            .title('Documentation et Référence des Blocs')
            .items([
              // Documentation des blocs
              S.listItem()
                .title('📚 Documentation des Blocs')
                .id('blockDocumentation')
                .child(
                  S.documentTypeList('blockDocumentation')
                    .title('Documentation des Blocs')
                    .filter('_type == "blockDocumentation"')
                    .defaultOrdering([{field: 'blockType', direction: 'asc'}])
                ),
              
              S.divider(),
              
              // Instances des blocs (pour référence technique)
              S.listItem()
                .title('Block Instances')
                .id('blockInstances')
                .child(
                  S.list()
                    .title('Types de blocs créés')
                    .items([
                      S.listItem()
                        .title('Text Blocks')
                        .child(
                          S.documentTypeList('textBlock')
                            .title('Text Block Instances')
                            .filter('_type == "textBlock"')
                        ),
                      S.listItem()
                        .title('Hero Blocks')
                        .child(
                          S.documentTypeList('heroBlock')
                            .title('Hero Block Instances')
                            .filter('_type == "heroBlock"')
                        ),
                      S.listItem()
                        .title('Header Blocks')
                        .child(
                          S.documentTypeList('headerBlock')
                            .title('Header Block Instances')
                            .filter('_type == "headerBlock"')
                        ),
                      S.listItem()
                        .title('Footer Blocks')
                        .child(
                          S.documentTypeList('footerBlock')
                            .title('Footer Block Instances')
                            .filter('_type == "footerBlock"')
                        ),
                      S.listItem()
                        .title('Feature Grids')
                        .child(
                          S.documentTypeList('featureGridBlock')
                            .title('Feature Grid Instances')
                            .filter('_type == "featureGridBlock"')
                        ),
                      S.listItem()
                        .title('Contact Blocks')
                        .child(
                          S.documentTypeList('contactBlock')
                            .title('Contact Block Instances')
                            .filter('_type == "contactBlock"')
                        ),
                      S.listItem()
                        .title('Gallery Blocks')
                        .child(
                          S.documentTypeList('galleryBlock')
                            .title('Gallery Block Instances')
                            .filter('_type == "galleryBlock"')
                        ),
                      S.listItem()
                        .title('Team Blocks')
                        .child(
                          S.documentTypeList('teamBlock')
                            .title('Team Block Instances')
                            .filter('_type == "teamBlock"')
                        ),
                      S.listItem()
                        .title('Stats Blocks')
                        .child(
                          S.documentTypeList('statsBlock')
                            .title('Stats Block Instances')
                            .title('Instances de Blocs Statistiques')
                            .filter('_type == "statsBlock"')
                        ),
                    ])
                ),
            ])
        ),
      
      // Autres documents (si ajoutés plus tard)
      ...S.documentTypeListItems().filter(
        (item) => !['page', 'headerSettings', 'footerSettings', 'blockDocumentation', 'textBlock', 'heroBlock', 'headerBlock', 'footerBlock', 'featureGridBlock', 'contactBlock', 'galleryBlock', 'teamBlock', 'statsBlock'].includes(item.getId() ?? '')
      ),
    ])
