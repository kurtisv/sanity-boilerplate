'use client'

import styled from 'styled-components'

export const PageContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - 200px);
`

export const PageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

export const BlocksContainer = styled.div`
  width: 100%;
`

export const EmptyState = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

export const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1.5rem;
`

export const PageMessage = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  line-height: 1.75;
`
