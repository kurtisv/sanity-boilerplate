'use client'

import BlockRenderer from '@/components/BlockRenderer/BlockRenderer'
import type { Block } from '@/types/blocks'
import PageWrapper from '@/components/layout/PageWrapper'
import ClientPageWrapper from './ClientPageWrapper'
import type { PageStyleSettings } from '@/lib/theme-utils'
import { 
  EmptyState, 
  PageTitle, 
  PageMessage 
} from './PageComponents'

type Page = {
  _id: string
  title: string
  slug: { current: string }
  pageBuilder?: Block[]
  seoTitle?: string
  seoDescription?: string
  customCss?: string
  customJs?: string
} & PageStyleSettings

interface ClientPageContentProps {
  page: Page | null
}

export default function ClientPageContent({ page }: ClientPageContentProps) {
  if (!page) {
    return (
      <PageWrapper>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <EmptyState>
            <PageTitle>Page non trouvée</PageTitle>
            <PageMessage>
              Cette page n'existe pas ou n'a pas encore été créée dans Sanity Studio.
            </PageMessage>
          </EmptyState>
        </div>
      </PageWrapper>
    )
  }

  if (!page.pageBuilder || page.pageBuilder.length === 0) {
    return (
      <ClientPageWrapper page={page}>
        <PageWrapper pageStyles={page}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <EmptyState>
              <PageTitle>{page.title}</PageTitle>
              <PageMessage>
                Cette page existe mais ne contient pas encore de blocs.
                Ajoutez du contenu via Sanity Studio.
              </PageMessage>
            </EmptyState>
          </div>
        </PageWrapper>
      </ClientPageWrapper>
    )
  }

  return (
    <ClientPageWrapper page={page}>
      <PageWrapper pageStyles={page}>
        <BlockRenderer blocks={page.pageBuilder} />
      </PageWrapper>
    </ClientPageWrapper>
  )
}
