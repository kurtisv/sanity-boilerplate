import { cookies } from 'next/headers'

export async function isPreviewMode(): Promise<boolean> {
  const cookieStore = await cookies()
  return (
    cookieStore.has('__prerender_bypass') && 
    cookieStore.has('__next_preview_data')
  )
}

export function getPreviewToken(): string | undefined {
  return process.env.SANITY_API_READ_TOKEN
}
