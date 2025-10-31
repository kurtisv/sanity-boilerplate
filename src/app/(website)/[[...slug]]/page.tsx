'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import BlockRenderer from '@/components/BlockRenderer'
import styled from 'styled-components'

const PageContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - 200px);
`

const PageContent = styled.div`
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: var(--spacing-16) var(--spacing-6);
  
  @media (max-width: 768px) {
    padding: var(--spacing-12) var(--spacing-4);
  }
`

const BlocksContainer = styled.div`
  width: 100%;
`

const EmptyState = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
  text-align: center;
`

const PageTitle = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
`

const PageMessage = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
`

type Block = {
  _type: string
  _key: string
  [key: string]: any
}

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  customCss?: string
  customJs?: string
}

export default function DynamicPage() {
  const params = useParams()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      const slugArray = params.slug as string[] | undefined
      const slug = slugArray?.join('/') || 'home'
      
      const pageData = await client.fetch(pageBySlugQuery, { slug })
      setPage(pageData)
      setLoading(false)
    }

    fetchPage()
  }, [params])

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

  if (loading) {
    return (
      <PageContainer>
        <PageContent>
          <EmptyState>
            <PageMessage>Chargement...</PageMessage>
          </EmptyState>
        </PageContent>
      </PageContainer>
    )
  }

  if (!page) {
    return (
      <PageContainer>
        <PageContent>
          <EmptyState>
            <PageTitle>Page introuvable</PageTitle>
            <PageMessage>Cette page n'existe pas.</PageMessage>
          </EmptyState>
        </PageContent>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      {page.pageBuilder && page.pageBuilder.length > 0 ? (
        <BlocksContainer>
          <BlockRenderer blocks={page.pageBuilder} />
        </BlocksContainer>
      ) : (
        <PageContent>
          <EmptyState>
            <PageTitle>{page.title}</PageTitle>
            <PageMessage>
              Cette page est vide. Ajoutez des composants dans le constructeur de page.
            </PageMessage>
          </EmptyState>
        </PageContent>
      )}
    </PageContainer>
  )
}
