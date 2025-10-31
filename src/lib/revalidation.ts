/**
 * Utilitaires pour la revalidation manuelle
 * Utilisés pour déclencher la revalidation depuis l'interface admin ou des scripts
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function revalidatePage(slug: string) {
  try {
    const url = `${baseUrl}/api/revalidate`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: 'page',
        slug: { current: slug },
        _id: `page-${slug}`,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Page revalidated:', result)
    return result
  } catch (error) {
    console.error('Error revalidating page:', error)
    throw error
  }
}

export async function revalidateAllPages() {
  try {
    const url = `${baseUrl}/api/revalidate`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: 'headerSettings', // Déclenche la revalidation de toutes les pages
        _id: 'global-revalidation',
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('All pages revalidated:', result)
    return result
  } catch (error) {
    console.error('Error revalidating all pages:', error)
    throw error
  }
}

export async function revalidateSettings(type: 'headerSettings' | 'footerSettings') {
  try {
    const url = `${baseUrl}/api/revalidate`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _type: type,
        _id: type,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log(`${type} revalidated:`, result)
    return result
  } catch (error) {
    console.error(`Error revalidating ${type}:`, error)
    throw error
  }
}
