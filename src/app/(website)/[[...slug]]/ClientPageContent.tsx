'use client'

import BlockRenderer from '@/components/BlockRenderer'
import type { Block } from '@/components/BlockRenderer'
import { 
  PageContainer, 
  PageContent, 
  BlocksContainer, 
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
}

interface ClientPageContentProps {
  page: Page | null
}

export default function ClientPageContent({ page }: ClientPageContentProps) {
  if (!page) {
    return (
      <PageContainer>
        <PageContent>
          <EmptyState>
            <PageTitle>Page non trouvée</PageTitle>
            <PageMessage>
              Cette page n'existe pas ou n'a pas encore été créée dans Sanity Studio.
            </PageMessage>
          </EmptyState>
        </PageContent>
      </PageContainer>
    )
  }

  if (!page.pageBuilder || page.pageBuilder.length === 0) {
    return (
      <PageContainer>
        <PageContent>
          <EmptyState>
            <PageTitle>{page.title}</PageTitle>
            <PageMessage>
              Cette page existe mais ne contient pas encore de blocs.
              Ajoutez du contenu via Sanity Studio.
            </PageMessage>
          </EmptyState>
        </PageContent>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageContent>
        <BlocksContainer>
          <BlockRenderer blocks={page.pageBuilder} />
        </BlocksContainer>
      </PageContent>
    </PageContainer>
  )
}
