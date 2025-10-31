'use client'

import styled from 'styled-components'

export const PageContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - 200px);
`

export const PageContent = styled.div`
  max-width: var(--max-width-container);
  margin: 0 auto;
  padding: var(--spacing-16) var(--spacing-6);
  
  @media (max-width: 768px) {
    padding: var(--spacing-12) var(--spacing-4);
  }
`

export const BlocksContainer = styled.div`
  width: 100%;
`

export const EmptyState = styled.div`
  max-width: var(--max-width-4xl);
  margin: 0 auto;
  text-align: center;
`

export const PageTitle = styled.h1`
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-6);
`

export const PageMessage = styled.p`
  font-size: var(--font-size-xl);
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
`
