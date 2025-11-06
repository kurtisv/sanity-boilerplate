import { definePlugin } from 'sanity'
// TODO: Version minimale sans JSX afin d'éviter les erreurs TS lors de la compilation.
//       Une version complète avec UI Studio pourra être réintroduite en .tsx au besoin.

export const demoImporter = definePlugin({
  name: 'demo-importer'
})
