/**
 * Documentation par défaut pour chaque bloc
 * 
 * Ces données peuvent être utilisées pour pré-remplir la documentation
 * ou comme référence pour créer la documentation dans Sanity Studio.
 */

export const defaultBlockDocumentation = {
  textBlock: {
    title: "Bloc de Texte Riche",
    description: "Composant polyvalent pour afficher du contenu textuel avec formatage avancé, images intégrées et options de mise en page.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Le bloc de texte riche est conçu pour :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Afficher du contenu éditorial (articles, descriptions, etc.)'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Permettre un formatage riche (gras, italique, liens, listes)'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Intégrer des images dans le flux de texte'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Offrir des options de mise en page flexibles'
          }
        ]
      }
    ],
    whenToUse: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Utilisez ce bloc quand vous avez besoin de :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Publier du contenu éditorial long (articles, guides)'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Créer des sections "À propos" ou descriptions détaillées'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Ajouter du contenu avec formatage dans une page'
          }
        ]
      }
    ],
    howToUse: [
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Étapes d\'utilisation :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: 'Dans le constructeur de page, cliquez sur "Ajouter un bloc"'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: 'Sélectionnez "📝 Bloc de texte"'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: 'Rédigez votre contenu dans l\'éditeur riche'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: 'Configurez l\'alignement, la largeur et les couleurs'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [
          {
            _type: 'span',
            text: 'Ajustez l\'espacement selon vos besoins'
          }
        ]
      }
    ]
  },

  heroBlock: {
    title: "Bloc Héro",
    description: "Section d'accroche principale avec titre percutant, sous-titre, image de fond et appels à l'action.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Le bloc héro sert à :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Créer une première impression forte sur vos visiteurs'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Présenter votre proposition de valeur principale'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Guider les utilisateurs vers les actions importantes'
          }
        ]
      }
    ],
    whenToUse: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Parfait pour :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Page d\'accueil (section principale)'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Pages de services ou produits'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Landing pages marketing'
          }
        ]
      }
    ]
  },

  featureGridBlock: {
    title: "Grille de Fonctionnalités",
    description: "Présentation organisée de fonctionnalités, services ou avantages sous forme de grille avec icônes et descriptions.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ce bloc permet de :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Présenter vos services de manière organisée'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Mettre en avant les avantages de votre produit'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Créer des sections "Pourquoi nous choisir"'
          }
        ]
      }
    ]
  },

  contactBlock: {
    title: "Bloc Contact",
    description: "Formulaire de contact intégré avec champs personnalisables et informations de contact.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Facilite la prise de contact en offrant :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Un formulaire simple et accessible'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'L\'affichage des coordonnées importantes'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Une interface utilisateur optimisée'
          }
        ]
      }
    ]
  },

  galleryBlock: {
    title: "Galerie d'Images",
    description: "Affichage élégant d'une collection d'images avec options de mise en page et navigation.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Idéal pour :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Présenter vos réalisations ou portfolio'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Afficher des photos d\'événements'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Créer des sections visuelles attractives'
          }
        ]
      }
    ]
  },

  teamBlock: {
    title: "Bloc Équipe",
    description: "Présentation des membres de l'équipe avec photos, noms, postes et descriptions.",
    purpose: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Permet de :'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Humaniser votre entreprise'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Présenter l\'expertise de votre équipe'
          }
        ]
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {
            _type: 'span',
            text: 'Créer de la confiance avec vos visiteurs'
          }
        ]
      }
    ]
  }
}

export default defaultBlockDocumentation
