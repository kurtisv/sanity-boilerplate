import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/sanity/lib/client'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const clientWithToken = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
})

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url
  )

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable Preview Mode by setting the cookies
  const response = NextResponse.redirect(new URL(redirectTo, request.url))

  response.cookies.set('__prerender_bypass', '1', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  response.cookies.set('__next_preview_data', '1', {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
