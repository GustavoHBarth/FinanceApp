import { BrowserRouter } from 'react-router-dom'
import { ApplicationProvider } from '@/context'
import { ThemeVariables } from '@/resources/styles/theme'
import GlobalResets from '@/resources/styles/globals'

export default function ApplicationProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <ThemeVariables />
        <GlobalResets />
        {children}
      </ApplicationProvider>
    </BrowserRouter>
  )
}


