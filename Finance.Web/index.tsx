import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from '@/resources/components/ErrorBoundary'
import ApplicationProviders from '@/providers'
import ApplicationRoutes from '@/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ApplicationProviders>
        <ApplicationRoutes />
      </ApplicationProviders>
    </ErrorBoundary>
  </StrictMode>
)


