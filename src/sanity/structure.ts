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
                .title('📦 Instances de Blocs')
                .id('blockInstances')
                .child(
                  S.list()
                    .title('Types de blocs créés')
                    .items([
                      // === BLOCS DE BASE ===
                      S.listItem()
                        .title('📝 Text Blocks')
                        .child(
                          S.documentTypeList('textBlock')
                            .title('Instances de Blocs Texte')
                            .filter('_type == "textBlock"')
                        ),
                      S.listItem()
                        .title('🦸 Hero Blocks')
                        .child(
                          S.documentTypeList('heroBlock')
                            .title('Instances de Blocs Héro')
                            .filter('_type == "heroBlock"')
                        ),
                      S.listItem()
                        .title('🎯 Header Blocks')
                        .child(
                          S.documentTypeList('headerBlock')
                            .title('Instances de Blocs Header')
                            .filter('_type == "headerBlock"')
                        ),
                      S.listItem()
                        .title('🦶 Footer Blocks')
                        .child(
                          S.documentTypeList('footerBlock')
                            .title('Instances de Blocs Footer')
                            .filter('_type == "footerBlock"')
                        ),
                      
                      S.divider(),
                      
                      // === BLOCS DE CONTENU ===
                      S.listItem()
                        .title('⭐ Feature Grids')
                        .child(
                          S.documentTypeList('featureGridBlock')
                            .title('Instances de Grilles de Fonctionnalités')
                            .filter('_type == "featureGridBlock"')
                        ),
                      S.listItem()
                        .title('📞 Contact Blocks')
                        .child(
                          S.documentTypeList('contactBlock')
                            .title('Instances de Blocs Contact')
                            .filter('_type == "contactBlock"')
                        ),
                      S.listItem()
                        .title('🖼️ Gallery Blocks')
                        .child(
                          S.documentTypeList('galleryBlock')
                            .title('Instances de Galeries')
                            .filter('_type == "galleryBlock"')
                        ),
                      S.listItem()
                        .title('👥 Team Blocks')
                        .child(
                          S.documentTypeList('teamBlock')
                            .title('Instances de Blocs Équipe')
                            .filter('_type == "teamBlock"')
                        ),
                      S.listItem()
                        .title('📊 Stats Blocks')
                        .child(
                          S.documentTypeList('statsBlock')
                            .title('Instances de Blocs Statistiques')
                            .filter('_type == "statsBlock"')
                        ),
                      
                      S.divider(),
                      
                      // === NOUVEAUX BLOCS - BLOG & CONTENU ===
                      S.listItem()
                        .title('📰 Blog Blocks')
                        .child(
                          S.documentTypeList('blogBlock')
                            .title('Instances de Blocs Blog')
                            .filter('_type == "blogBlock"')
                        ),
                      S.listItem()
                        .title('📹 Video Blocks')
                        .child(
                          S.documentTypeList('videoBlock')
                            .title('Instances de Blocs Vidéo')
                            .filter('_type == "videoBlock"')
                        ),
                      S.listItem()
                        .title('🎵 Accordion Blocks')
                        .child(
                          S.documentTypeList('accordionBlock')
                            .title('Instances de Blocs Accordéon')
                            .filter('_type == "accordionBlock"')
                        ),
                      S.listItem()
                        .title('📑 Tabs Blocks')
                        .child(
                          S.documentTypeList('tabsBlock')
                            .title('Instances de Blocs Onglets')
                            .filter('_type == "tabsBlock"')
                        ),
                      
                      S.divider(),
                      
                      // === NOUVEAUX BLOCS - MARKETING ===
                      S.listItem()
                        .title('💰 Pricing Blocks')
                        .child(
                          S.documentTypeList('pricingBlock')
                            .title('Instances de Blocs Tarifs')
                            .filter('_type == "pricingBlock"')
                        ),
                      S.listItem()
                        .title('💬 Testimonials Blocks')
                        .child(
                          S.documentTypeList('testimonialsBlock')
                            .title('Instances de Blocs Témoignages')
                            .filter('_type == "testimonialsBlock"')
                        ),
                      S.listItem()
                        .title('🎯 CTA Blocks')
                        .child(
                          S.documentTypeList('ctaBlock')
                            .title('Instances de Blocs CTA')
                            .filter('_type == "ctaBlock"')
                        ),
                      S.listItem()
                        .title('📧 Newsletter Blocks')
                        .child(
                          S.documentTypeList('newsletterBlock')
                            .title('Instances de Blocs Newsletter')
                            .filter('_type == "newsletterBlock"')
                        ),
                      
                      S.divider(),
                      
                      // === NOUVEAUX BLOCS - SUPPORT & AUTRES ===
                      S.listItem()
                        .title('❓ FAQ Blocks')
                        .child(
                          S.documentTypeList('faqBlock')
                            .title('Instances de Blocs FAQ')
                            .filter('_type == "faqBlock"')
                        ),
                      S.listItem()
                        .title('🏢 Logo Cloud Blocks')
                        .child(
                          S.documentTypeList('logoCloudBlock')
                            .title('Instances de Blocs Logos')
                            .filter('_type == "logoCloudBlock"')
                        ),
                    ])
                ),
            ])
        ),
      
      S.divider(),
      
      // === BLOG ===
      S.listItem()
        .title('📰 Blog')
        .id('blog')
        .child(
          S.list()
            .title('Gestion du Blog')
            .items([
              S.listItem()
                .title('📝 Articles')
                .child(
                  S.documentTypeList('blogPost')
                    .title('Articles de Blog')
                    .filter('_type == "blogPost"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                ),
              S.listItem()
                .title('👤 Auteurs')
                .child(
                  S.documentTypeList('author')
                    .title('Auteurs')
                    .filter('_type == "author"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                ),
              S.listItem()
                .title('📁 Catégories')
                .child(
                  S.documentTypeList('category')
                    .title('Catégories')
                    .filter('_type == "category"')
                    .defaultOrdering([{field: 'displayOrder', direction: 'asc'}])
                ),
            ])
        ),
      
      // Autres documents (si ajoutés plus tard)
      ...S.documentTypeListItems().filter(
        (item) => ![
          // Documents principaux
          'page', 'blogPost', 'author', 'category',
          // Settings
          'headerSettings', 'footerSettings',
          // Documentation
          'blockDocumentation',
          // Blocs de base
          'textBlock', 'heroBlock', 'headerBlock', 'footerBlock',
          // Blocs de contenu
          'featureGridBlock', 'contactBlock', 'galleryBlock', 'teamBlock', 'statsBlock',
          // Nouveaux blocs - Blog & Contenu
          'blogBlock', 'videoBlock', 'accordionBlock', 'tabsBlock',
          // Nouveaux blocs - Marketing
          'pricingBlock', 'testimonialsBlock', 'ctaBlock', 'newsletterBlock',
          // Nouveaux blocs - Support & Autres
          'faqBlock', 'logoCloudBlock'
        ].includes(item.getId() ?? '')
      ),
    ])
