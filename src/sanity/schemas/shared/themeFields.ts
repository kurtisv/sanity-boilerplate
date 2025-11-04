import { defineField } from 'sanity'

// Système de couleurs prédéfinies
export const colorOptions = [
  // Couleurs de base
  { title: 'Blanc', value: '#ffffff' },
  { title: 'Noir', value: '#000000' },
  { title: 'Gris très clair', value: '#f8fafc' },
  { title: 'Gris clair', value: '#f1f5f9' },
  { title: 'Gris', value: '#64748b' },
  { title: 'Gris foncé', value: '#334155' },
  
  // Couleurs primaires
  { title: 'Bleu primaire', value: '#3b82f6' },
  { title: 'Bleu foncé', value: '#1e40af' },
  { title: 'Indigo', value: '#6366f1' },
  { title: 'Violet', value: '#8b5cf6' },
  
  // Couleurs secondaires
  { title: 'Vert', value: '#10b981' },
  { title: 'Vert foncé', value: '#059669' },
  { title: 'Emeraude', value: '#06d6a0' },
  { title: 'Teal', value: '#14b8a6' },
  
  // Couleurs d'accent
  { title: 'Orange', value: '#f97316' },
  { title: 'Rouge', value: '#ef4444' },
  { title: 'Rose', value: '#ec4899' },
  { title: 'Jaune', value: '#eab308' },
]

// Système de dégradés prédéfinis étendus
export const gradientOptions = [
  // Dégradés classiques
  { title: 'Bleu → Violet', value: { from: '#3b82f6', to: '#8b5cf6', direction: 'to-br' } },
  { title: 'Violet → Rose', value: { from: '#8b5cf6', to: '#ec4899', direction: 'to-br' } },
  { title: 'Vert → Bleu', value: { from: '#10b981', to: '#3b82f6', direction: 'to-br' } },
  { title: 'Orange → Rouge', value: { from: '#f97316', to: '#ef4444', direction: 'to-br' } },
  { title: 'Indigo → Violet', value: { from: '#6366f1', to: '#8b5cf6', direction: 'to-br' } },
  { title: 'Teal → Vert', value: { from: '#14b8a6', to: '#10b981', direction: 'to-br' } },
  
  // Dégradés modernes
  { title: 'Sunset (Orange → Rose)', value: { from: '#ff7e5f', to: '#feb47b', direction: 'to-r' } },
  { title: 'Ocean (Bleu → Turquoise)', value: { from: '#667eea', to: '#764ba2', direction: 'to-br' } },
  { title: 'Forest (Vert foncé → Vert clair)', value: { from: '#134e5e', to: '#71b280', direction: 'to-t' } },
  { title: 'Purple Rain (Violet → Bleu)', value: { from: '#667db6', to: '#0082c8', direction: 'to-bl' } },
  { title: 'Fire (Rouge → Jaune)', value: { from: '#f12711', to: '#f5af19', direction: 'to-r' } },
  { title: 'Ice (Bleu clair → Blanc)', value: { from: '#a8edea', to: '#fed6e3', direction: 'to-br' } },
  
  // Dégradés sombres
  { title: 'Dark Ocean (Bleu foncé → Noir)', value: { from: '#2c3e50', to: '#000428', direction: 'to-b' } },
  { title: 'Dark Purple (Violet foncé → Noir)', value: { from: '#8360c3', to: '#2ebf91', direction: 'to-br' } },
  { title: 'Midnight (Bleu nuit → Violet)', value: { from: '#232526', to: '#414345', direction: 'to-r' } },
  
  // Dégradés pastel
  { title: 'Pastel Pink (Rose → Pêche)', value: { from: '#ffecd2', to: '#fcb69f', direction: 'to-br' } },
  { title: 'Pastel Blue (Bleu → Lavande)', value: { from: '#a8caba', to: '#5d4e75', direction: 'to-r' } },
  { title: 'Pastel Green (Vert → Jaune)', value: { from: '#d299c2', to: '#fef9d7', direction: 'to-bl' } },
]

// Système d'icônes prédéfinies (Lucide React)
export const iconOptions = [
  // Icônes générales
  { title: 'Aucune', value: '' },
  { title: '⭐ Étoile', value: 'star' },
  { title: '❤️ Cœur', value: 'heart' },
  { title: '🎯 Cible', value: 'target' },
  { title: '🚀 Fusée', value: 'rocket' },
  { title: '⚡ Éclair', value: 'zap' },
  { title: '🔥 Feu', value: 'flame' },
  { title: '💎 Diamant', value: 'diamond' },
  { title: '🏆 Trophée', value: 'trophy' },
  { title: '🎨 Palette', value: 'palette' },
  
  // Icônes business
  { title: '💼 Mallette', value: 'briefcase' },
  { title: '📊 Graphique', value: 'bar-chart' },
  { title: '📈 Tendance', value: 'trending-up' },
  { title: '💰 Argent', value: 'dollar-sign' },
  { title: '🏢 Bâtiment', value: 'building' },
  { title: '🤝 Poignée de main', value: 'handshake' },
  { title: '📋 Presse-papiers', value: 'clipboard' },
  { title: '⚙️ Engrenage', value: 'settings' },
  { title: '🔧 Outil', value: 'wrench' },
  { title: '🛡️ Bouclier', value: 'shield' },
  
  // Icônes communication
  { title: '📞 Téléphone', value: 'phone' },
  { title: '📧 Email', value: 'mail' },
  { title: '💬 Message', value: 'message-circle' },
  { title: '📢 Mégaphone', value: 'megaphone' },
  { title: '📺 Moniteur', value: 'monitor' },
  { title: '📱 Mobile', value: 'smartphone' },
  { title: '🌐 Globe', value: 'globe' },
  { title: '📡 Antenne', value: 'radio' },
  { title: '🔗 Lien', value: 'link' },
  { title: '📤 Envoyer', value: 'send' },
  
  // Icônes navigation
  { title: '🏠 Maison', value: 'home' },
  { title: '👤 Utilisateur', value: 'user' },
  { title: '👥 Équipe', value: 'users' },
  { title: '📍 Localisation', value: 'map-pin' },
  { title: '🧭 Boussole', value: 'compass' },
  { title: '🔍 Recherche', value: 'search' },
  { title: '⬆️ Haut', value: 'arrow-up' },
  { title: '⬇️ Bas', value: 'arrow-down' },
  { title: '➡️ Droite', value: 'arrow-right' },
  { title: '⬅️ Gauche', value: 'arrow-left' },
  
  // Icônes contenu
  { title: '📝 Écrire', value: 'edit' },
  { title: '📖 Livre', value: 'book' },
  { title: '📄 Document', value: 'file-text' },
  { title: '🖼️ Image', value: 'image' },
  { title: '🎥 Vidéo', value: 'video' },
  { title: '🎵 Musique', value: 'music' },
  { title: '📦 Package', value: 'package' },
  { title: '🏷️ Tag', value: 'tag' },
  { title: '📅 Calendrier', value: 'calendar' },
  { title: '⏰ Horloge', value: 'clock' },
  
  // Icônes techniques
  { title: '💻 Ordinateur', value: 'laptop' },
  { title: '🖥️ Desktop', value: 'desktop' },
  { title: '⌨️ Clavier', value: 'keyboard' },
  { title: '🖱️ Souris', value: 'mouse' },
  { title: '🔌 Prise', value: 'plug' },
  { title: '🔋 Batterie', value: 'battery' },
  { title: '☁️ Cloud', value: 'cloud' },
  { title: '💾 Sauvegarde', value: 'hard-drive' },
  { title: '🔒 Cadenas', value: 'lock' },
  { title: '🔓 Déverrouillé', value: 'unlock' },
]

// Champs de fond standardisés
export const backgroundSettingsField = defineField({
  name: 'backgroundSettings',
  title: 'Paramètres de fond',
  type: 'object',
  description: 'Configuration du fond du bloc',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'backgroundType',
      title: 'Type de fond',
      type: 'string',
      options: {
        list: [
          { title: 'Couleur unie', value: 'solid' },
          { title: 'Dégradé', value: 'gradient' },
          { title: 'Image', value: 'image' },
          { title: 'Transparent', value: 'transparent' },
        ],
        layout: 'radio',
      },
      initialValue: 'solid',
    },
    {
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: '#ffffff',
      hidden: ({ parent }: any) => parent?.backgroundType !== 'solid',
    },
    {
      name: 'gradientSettings',
      title: 'Paramètres du dégradé',
      type: 'object',
      fields: [
        {
          name: 'preset',
          title: 'Dégradé prédéfini',
          type: 'string',
          options: {
            list: gradientOptions.map((gradient, index) => ({
              title: gradient.title,
              value: `preset-${index}`,
            })),
          },
        },
        {
          name: 'custom',
          title: 'Dégradé personnalisé',
          type: 'object',
          fields: [
            {
              name: 'from',
              title: 'Couleur de départ',
              type: 'string',
              options: { list: colorOptions },
              initialValue: '#3b82f6',
            },
            {
              name: 'to',
              title: 'Couleur d\'arrivée',
              type: 'string',
              options: { list: colorOptions },
              initialValue: '#8b5cf6',
            },
            {
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Vers le bas', value: 'to-b' },
                  { title: 'Vers le haut', value: 'to-t' },
                  { title: 'Vers la droite', value: 'to-r' },
                  { title: 'Vers la gauche', value: 'to-l' },
                  { title: 'Diagonal bas-droite', value: 'to-br' },
                  { title: 'Diagonal bas-gauche', value: 'to-bl' },
                  { title: 'Diagonal haut-droite', value: 'to-tr' },
                  { title: 'Diagonal haut-gauche', value: 'to-tl' },
                ],
              },
              initialValue: 'to-br',
            },
          ],
          hidden: ({ parent }: any) => parent?.preset,
        },
      ],
      hidden: ({ parent }: any) => parent?.backgroundType !== 'gradient',
    },
    {
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        },
        {
          name: 'overlay',
          title: 'Superposition',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Activer la superposition',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'color',
              title: 'Couleur de superposition',
              type: 'string',
              options: { list: colorOptions },
              initialValue: '#000000',
              hidden: ({ parent }: any) => !parent?.enabled,
            },
            {
              name: 'opacity',
              title: 'Opacité (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 50,
              hidden: ({ parent }: any) => !parent?.enabled,
            },
          ],
        },
      ],
      hidden: ({ parent }: any) => parent?.backgroundType !== 'image',
    },
  ],
})

// Champs de style standardisés
export const stylingField = defineField({
  name: 'styling',
  title: 'Styles et apparence',
  type: 'object',
  description: 'Configuration des styles du bloc',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'textColor',
      title: 'Couleur du texte',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: '#374151',
    },
    {
      name: 'headingColor',
      title: 'Couleur des titres',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: '#1f2937',
    },
    {
      name: 'accentColor',
      title: 'Couleur d\'accent',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: '#3b82f6',
    },
    {
      name: 'alignment',
      title: 'Alignement du contenu',
      type: 'string',
      options: {
        list: [
          { title: 'Gauche', value: 'left' },
          { title: 'Centre', value: 'center' },
          { title: 'Droite', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
    {
      name: 'spacing',
      title: 'Espacement',
      type: 'string',
      options: {
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Normal', value: 'normal' },
          { title: 'Confortable', value: 'comfortable' },
          { title: 'Large', value: 'large' },
          { title: 'Extra large', value: 'xl' },
        ],
        layout: 'radio',
      },
      initialValue: 'comfortable',
    },
    {
      name: 'cardStyle',
      title: 'Style des cartes',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal', value: 'minimal' },
          { title: 'Bordure', value: 'bordered' },
          { title: 'Ombre légère', value: 'shadow' },
          { title: 'Élevé', value: 'elevated' },
          { title: 'Coloré', value: 'colored' },
          { title: 'Effet verre', value: 'glass' },
        ],
      },
      initialValue: 'elevated',
    },
    {
      name: 'borderRadius',
      title: 'Arrondi des bordures',
      type: 'string',
      options: {
        list: [
          { title: 'Aucun', value: 'none' },
          { title: 'Petit', value: 'sm' },
          { title: 'Moyen', value: 'md' },
          { title: 'Grand', value: 'lg' },
          { title: 'Extra grand', value: 'xl' },
          { title: 'Rond', value: 'full' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'animation',
      title: 'Animation',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Activer les animations',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'type',
          title: 'Type d\'animation',
          type: 'string',
          options: {
            list: [
              { title: 'Fondu', value: 'fade' },
              { title: 'Glissement vers le haut', value: 'slideUp' },
              { title: 'Glissement vers la gauche', value: 'slideLeft' },
              { title: 'Zoom', value: 'zoom' },
              { title: 'Rotation', value: 'rotate' },
            ],
          },
          initialValue: 'fade',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'duration',
          title: 'Durée (ms)',
          type: 'number',
          validation: (Rule) => Rule.min(100).max(2000),
          initialValue: 600,
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'delay',
          title: 'Délai (ms)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1000),
          initialValue: 0,
          hidden: ({ parent }: any) => !parent?.enabled,
        },
      ],
    },
  ],
})

// Champs de typographie
export const typographyField = defineField({
  name: 'typography',
  title: 'Typographie',
  type: 'object',
  description: 'Configuration de la typographie',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'fontFamily',
      title: 'Police de caractères',
      type: 'string',
      options: {
        list: [
          { title: 'Système (défaut)', value: 'system' },
          { title: 'Inter', value: 'inter' },
          { title: 'Roboto', value: 'roboto' },
          { title: 'Open Sans', value: 'opensans' },
          { title: 'Lato', value: 'lato' },
          { title: 'Montserrat', value: 'montserrat' },
          { title: 'Poppins', value: 'poppins' },
          { title: 'Playfair Display', value: 'playfair' },
          { title: 'Merriweather', value: 'merriweather' },
        ],
      },
      initialValue: 'system',
    },
    {
      name: 'headingSize',
      title: 'Taille des titres',
      type: 'string',
      options: {
        list: [
          { title: 'Petit', value: 'sm' },
          { title: 'Moyen', value: 'md' },
          { title: 'Grand', value: 'lg' },
          { title: 'Extra grand', value: 'xl' },
          { title: 'Énorme', value: '2xl' },
        ],
      },
      initialValue: 'lg',
    },
    {
      name: 'textSize',
      title: 'Taille du texte',
      type: 'string',
      options: {
        list: [
          { title: 'Petit', value: 'sm' },
          { title: 'Moyen', value: 'md' },
          { title: 'Grand', value: 'lg' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'lineHeight',
      title: 'Hauteur de ligne',
      type: 'string',
      options: {
        list: [
          { title: 'Serré', value: 'tight' },
          { title: 'Normal', value: 'normal' },
          { title: 'Relâché', value: 'relaxed' },
        ],
      },
      initialValue: 'normal',
    },
    {
      name: 'fontWeight',
      title: 'Poids de la police',
      type: 'string',
      options: {
        list: [
          { title: 'Léger', value: 'light' },
          { title: 'Normal', value: 'normal' },
          { title: 'Moyen', value: 'medium' },
          { title: 'Semi-gras', value: 'semibold' },
          { title: 'Gras', value: 'bold' },
        ],
      },
      initialValue: 'normal',
    },
  ],
})

// Champ d'icône standardisé
export const iconField = defineField({
  name: 'icon',
  title: 'Icône',
  type: 'object',
  description: 'Configuration de l\'icône du bloc',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'iconType',
      title: 'Type d\'icône',
      type: 'string',
      options: {
        list: iconOptions,
        layout: 'dropdown',
      },
      initialValue: '',
    },
    {
      name: 'iconColor',
      title: 'Couleur de l\'icône',
      type: 'string',
      options: {
        list: colorOptions,
      },
      initialValue: '#3b82f6',
      hidden: ({ parent }: any) => !parent?.iconType,
    },
    {
      name: 'iconSize',
      title: 'Taille de l\'icône',
      type: 'string',
      options: {
        list: [
          { title: 'Petite (16px)', value: 'sm' },
          { title: 'Moyenne (24px)', value: 'md' },
          { title: 'Grande (32px)', value: 'lg' },
          { title: 'Extra grande (48px)', value: 'xl' },
          { title: 'Énorme (64px)', value: '2xl' },
        ],
      },
      initialValue: 'md',
      hidden: ({ parent }: any) => !parent?.iconType,
    },
    {
      name: 'iconPosition',
      title: 'Position de l\'icône',
      type: 'string',
      options: {
        list: [
          { title: 'Au-dessus du texte', value: 'top' },
          { title: 'À gauche du texte', value: 'left' },
          { title: 'À droite du texte', value: 'right' },
          { title: 'En arrière-plan', value: 'background' },
        ],
      },
      initialValue: 'top',
      hidden: ({ parent }: any) => !parent?.iconType,
    },
    {
      name: 'iconStyle',
      title: 'Style de l\'icône',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Avec fond coloré', value: 'filled' },
          { title: 'Avec bordure', value: 'outlined' },
          { title: 'Avec ombre', value: 'shadow' },
          { title: 'Avec cercle', value: 'circle' },
          { title: 'Avec carré arrondi', value: 'rounded' },
        ],
      },
      initialValue: 'normal',
      hidden: ({ parent }: any) => !parent?.iconType,
    },
  ],
})

// Fonctions utilitaires pour obtenir les champs selon le contexte
export function getThemeFields() {
  return [backgroundSettingsField, stylingField, typographyField]
}

export function getBasicStyleFields() {
  return [stylingField, typographyField]
}

export function getTypographyFields() {
  return [typographyField]
}

export function getThemeFieldsWithIcon() {
  return [iconField, backgroundSettingsField, stylingField, typographyField]
}

export function getBasicStyleFieldsWithIcon() {
  return [iconField, stylingField, typographyField]
}

export function getIconField() {
  return [iconField]
}

// Champs spécifiques pour les pages
export function getPageStyleFields() {
  return [
    defineField({
      name: 'pageBackgroundSettings',
      title: 'Arrière-plan de la page',
      type: 'object',
      description: 'Configuration de l\'arrière-plan global de la page',
      group: 'style',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'backgroundType',
          title: 'Type d\'arrière-plan',
          type: 'string',
          options: {
            list: [
              { title: 'Couleur unie', value: 'solid' },
              { title: 'Dégradé', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Transparent', value: 'transparent' },
            ],
            layout: 'radio',
          },
          initialValue: 'solid',
        },
        {
          name: 'backgroundColor',
          title: 'Couleur d\'arrière-plan',
          type: 'string',
          options: {
            list: colorOptions,
          },
          initialValue: '#ffffff',
          hidden: ({ parent }: any) => parent?.backgroundType !== 'solid',
        },
        {
          name: 'gradientSettings',
          title: 'Paramètres de dégradé',
          type: 'object',
          fields: [
            {
              name: 'gradientType',
              title: 'Type de dégradé',
              type: 'string',
              options: {
                list: [
                  { title: 'Dégradé prédéfini', value: 'preset' },
                  { title: 'Dégradé personnalisé', value: 'custom' },
                ],
                layout: 'radio',
              },
              initialValue: 'preset',
            },
            {
              name: 'preset',
              title: 'Dégradé prédéfini',
              type: 'string',
              options: {
                list: gradientOptions.map(option => ({
                  title: option.title,
                  value: JSON.stringify(option.value)
                })),
                layout: 'dropdown',
              },
              hidden: ({ parent }: any) => parent?.gradientType !== 'preset',
            },
            {
              name: 'custom',
              title: 'Dégradé personnalisé',
              type: 'object',
              fields: [
                {
                  name: 'from',
                  title: 'Couleur de début',
                  type: 'string',
                  options: {
                    list: colorOptions,
                  },
                },
                {
                  name: 'to',
                  title: 'Couleur de fin',
                  type: 'string',
                  options: {
                    list: colorOptions,
                  },
                },
                {
                  name: 'via',
                  title: 'Couleur intermédiaire (optionnel)',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Aucune', value: '' },
                      ...colorOptions,
                    ],
                  },
                  description: 'Ajoute une couleur au milieu du dégradé',
                },
                {
                  name: 'direction',
                  title: 'Direction',
                  type: 'string',
                  options: {
                    list: [
                      { title: '↓ Vers le bas', value: 'to-b' },
                      { title: '↑ Vers le haut', value: 'to-t' },
                      { title: '→ Vers la droite', value: 'to-r' },
                      { title: '← Vers la gauche', value: 'to-l' },
                      { title: '↘ Diagonal (bas-droite)', value: 'to-br' },
                      { title: '↙ Diagonal (bas-gauche)', value: 'to-bl' },
                      { title: '↗ Diagonal (haut-droite)', value: 'to-tr' },
                      { title: '↖ Diagonal (haut-gauche)', value: 'to-tl' },
                      { title: '🔄 Radial (centre)', value: 'radial' },
                    ],
                  },
                  initialValue: 'to-br',
                },
                {
                  name: 'intensity',
                  title: 'Intensité du dégradé',
                  type: 'number',
                  validation: (Rule: any) => Rule.min(0).max(100),
                  initialValue: 100,
                  description: 'Contrôle l\'opacité du dégradé (0-100%)',
                },
              ],
              hidden: ({ parent }: any) => parent?.gradientType !== 'custom',
            },
          ],
          hidden: ({ parent }: any) => parent?.backgroundType !== 'gradient',
        },
        {
          name: 'backgroundImage',
          title: 'Image d\'arrière-plan',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
            },
            {
              name: 'overlay',
              title: 'Superposition',
              type: 'object',
              fields: [
                {
                  name: 'enabled',
                  title: 'Activer la superposition',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'color',
                  title: 'Couleur de superposition',
                  type: 'string',
                  options: { list: colorOptions },
                  initialValue: '#000000',
                  hidden: ({ parent }: any) => !parent?.enabled,
                },
                {
                  name: 'opacity',
                  title: 'Opacité (%)',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(100),
                  initialValue: 50,
                  hidden: ({ parent }: any) => !parent?.enabled,
                },
              ],
            },
          ],
          hidden: ({ parent }: any) => parent?.backgroundType !== 'image',
        },
      ],
    }),
    defineField({
      name: 'pageLayout',
      title: 'Mise en page',
      type: 'object',
      description: 'Configuration de la mise en page globale',
      group: 'style',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'maxWidth',
          title: 'Largeur maximale',
          type: 'string',
          options: {
            list: [
              { title: 'Pleine largeur', value: 'full' },
              { title: 'Extra large (1280px)', value: 'xl' },
              { title: 'Large (1024px)', value: 'lg' },
              { title: 'Moyen (768px)', value: 'md' },
              { title: 'Petit (640px)', value: 'sm' },
            ],
          },
          initialValue: 'xl',
        },
        {
          name: 'padding',
          title: 'Espacement global',
          type: 'string',
          options: {
            list: [
              { title: 'Aucun', value: 'none' },
              { title: 'Petit', value: 'sm' },
              { title: 'Moyen', value: 'md' },
              { title: 'Grand', value: 'lg' },
              { title: 'Extra grand', value: 'xl' },
            ],
          },
          initialValue: 'md',
        },
        {
          name: 'gap',
          title: 'Espacement entre blocs',
          type: 'string',
          options: {
            list: [
              { title: 'Aucun', value: 'none' },
              { title: 'Petit (1rem)', value: 'sm' },
              { title: 'Moyen (2rem)', value: 'md' },
              { title: 'Grand (3rem)', value: 'lg' },
              { title: 'Extra grand (4rem)', value: 'xl' },
            ],
          },
          initialValue: 'md',
        },
      ],
    }),
    defineField({
      name: 'pageTypography',
      title: 'Typographie globale',
      type: 'object',
      description: 'Styles de typographie pour toute la page',
      group: 'style',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'fontFamily',
          title: 'Police principale',
          type: 'string',
          options: {
            list: [
              { title: 'Système', value: 'system' },
              { title: 'Inter', value: 'inter' },
              { title: 'Roboto', value: 'roboto' },
              { title: 'Open Sans', value: 'opensans' },
              { title: 'Lato', value: 'lato' },
              { title: 'Montserrat', value: 'montserrat' },
              { title: 'Poppins', value: 'poppins' },
              { title: 'Playfair Display', value: 'playfair' },
              { title: 'Merriweather', value: 'merriweather' },
            ],
          },
          initialValue: 'system',
        },
        {
          name: 'baseTextSize',
          title: 'Taille de texte de base',
          type: 'string',
          options: {
            list: [
              { title: 'Petit (14px)', value: 'sm' },
              { title: 'Moyen (16px)', value: 'md' },
              { title: 'Grand (18px)', value: 'lg' },
            ],
          },
          initialValue: 'md',
        },
        {
          name: 'lineHeight',
          title: 'Hauteur de ligne',
          type: 'string',
          options: {
            list: [
              { title: 'Serrée (1.25)', value: 'tight' },
              { title: 'Normale (1.5)', value: 'normal' },
              { title: 'Relâchée (1.75)', value: 'relaxed' },
            ],
          },
          initialValue: 'normal',
        },
      ],
    }),
    defineField({
      name: 'pageColors',
      title: 'Couleurs globales',
      type: 'object',
      description: 'Palette de couleurs pour la page',
      group: 'style',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'textColor',
          title: 'Couleur de texte principale',
          type: 'string',
          options: { list: colorOptions },
          initialValue: '#374151',
        },
        {
          name: 'headingColor',
          title: 'Couleur des titres',
          type: 'string',
          options: { list: colorOptions },
          initialValue: '#1f2937',
        },
        {
          name: 'accentColor',
          title: 'Couleur d\'accent',
          type: 'string',
          options: { list: colorOptions },
          initialValue: '#3b82f6',
        },
        {
          name: 'linkColor',
          title: 'Couleur des liens',
          type: 'string',
          options: { list: colorOptions },
          initialValue: '#3b82f6',
        },
      ],
    }),
  ]
}
