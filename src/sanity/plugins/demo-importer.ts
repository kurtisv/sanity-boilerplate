import { definePlugin } from 'sanity'
import { DocumentIcon, RocketIcon } from '@sanity/icons'

// Configuration du plugin
export const demoImporter = definePlugin({
  name: 'demo-importer',
  title: 'Demo Importer',
  
  studio: {
    components: {
      // Ajouter un bouton dans la barre d'outils
      toolMenu: [
        {
          name: 'demo-importer',
          title: 'Importer la démo',
          icon: RocketIcon,
          component: DemoImporterTool
        }
      ]
    }
  }
})

// Composant du bouton d'import
function DemoImporterTool() {
  const handleImportDemo = async () => {
    try {
      // Appel à l'API d'import
      const response = await fetch('/api/import-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        alert('Démo importée avec succès !')
        // Rafraîchir la page ou rediriger
        window.location.href = '/studio/desk/page'
      } else {
        throw new Error('Erreur lors de l\'import')
      }
    } catch (error) {
      alert(`Erreur: ${error.message}`)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Import de la démo</h3>
      <p>Cliquez pour importer automatiquement la page de démonstration avec tous les blocs configurés.</p>
      <button 
        onClick={handleImportDemo}
        style={{
          background: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🚀 Importer la démo
      </button>
    </div>
  )
}

// Types pour TypeScript
export interface DemoImporterConfig {
  autoImport?: boolean
  demoPageSlug?: string
  customBlocks?: any[]
}
