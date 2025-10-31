'use client'

import { useEffect } from 'react'

type Page = {
  _id: string
  customCss?: string
  customJs?: string
}

type ClientPageWrapperProps = {
  page: Page
  children: React.ReactNode
}

export default function ClientPageWrapper({ page, children }: ClientPageWrapperProps) {
  // Injection du CSS personnalisé
  useEffect(() => {
    if (page?.customCss) {
      const style = document.createElement('style')
      style.innerHTML = page.customCss
      style.setAttribute('data-page-css', page._id)
      document.head.appendChild(style)

      return () => {
        const existingStyle = document.querySelector(`[data-page-css="${page._id}"]`)
        if (existingStyle) {
          existingStyle.remove()
        }
      }
    }
  }, [page])

  // Injection du JavaScript personnalisé
  useEffect(() => {
    if (page?.customJs) {
      const script = document.createElement('script')
      script.innerHTML = page.customJs
      script.setAttribute('data-page-js', page._id)
      document.body.appendChild(script)

      return () => {
        const existingScript = document.querySelector(`[data-page-js="${page._id}"]`)
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [page])

  return <>{children}</>
}
