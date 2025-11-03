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
                .title('🔧 Instances des Blocs')
                .id('blockInstances')
                .child(
                  S.list()
                    .title('Types de blocs créés')
                    .items([
                      S.listItem()
                        .title('📝 Blocs de Texte')
                        .child(
                          S.documentTypeList('textBlock')
                            .title('Instances de Blocs de Texte')
                            .filter('_type == "textBlock"')
                        ),
                      S.listItem()
                        .title('🦸 Blocs Héro')
                        .child(
                          S.documentTypeList('heroBlock')
                            .title('Instances de Blocs Héro')
                            .filter('_type == "heroBlock"')
                        ),
                      S.listItem()
                        .title('🎯 Blocs Header')
                        .child(
                          S.documentTypeList('headerBlock')
                            .title('Instances de Blocs Header')
                            .filter('_type == "headerBlock"')
                        ),
                      S.listItem()
                        .title('🦶 Blocs Footer')
                        .child(
                          S.documentTypeList('footerBlock')
                            .title('Instances de Blocs Footer')
                            .filter('_type == "footerBlock"')
                        ),
                      S.listItem()
                        .title('⭐ Grilles de Fonctionnalités')
                        .child(
                          S.documentTypeList('featureGridBlock')
                            .title('Instances de Grilles de Fonctionnalités')
                            .filter('_type == "featureGridBlock"')
                        ),
                      S.listItem()
                        .title('📞 Blocs Contact')
                        .child(
                          S.documentTypeList('contactBlock')
                            .title('Instances de Blocs Contact')
                            .filter('_type == "contactBlock"')
                        ),
                      S.listItem()
                        .title('🖼️ Galeries d\'Images')
                        .child(
                          S.documentTypeList('galleryBlock')
                            .title('Instances de Galeries d\'Images')
                            .filter('_type == "galleryBlock"')
                        ),
                      S.listItem()
                        .title('👥 Blocs Équipe')
                        .child(
                          S.documentTypeList('teamBlock')
                            .title('Instances de Blocs Équipe')
                            .filter('_type == "teamBlock"')
                        ),
                      S.listItem()
                        .title('📊 Blocs Statistiques')
                        .child(
                          S.documentTypeList('statsBlock')
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
