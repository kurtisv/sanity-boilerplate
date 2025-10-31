import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url))

  // Clear preview cookies
  response.cookies.delete('__prerender_bypass')
  response.cookies.delete('__next_preview_data')

  return response
}
