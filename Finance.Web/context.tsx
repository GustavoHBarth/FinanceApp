import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type OutbarContent = React.ReactNode | null

export type ApplicationContextType = {
  device: string
  setDevice: (d: string) => void

  outbar: {
    isOpen: boolean
    width: number
    title: string
    content: OutbarContent
    open: (args?: { title?: string; content?: OutbarContent; width?: number }) => void
    close: () => void
    setWidth: (w: number) => void
  }

  sidebar: {
    isVisible: boolean
    setIsVisible: (v: boolean) => void
    isEditorMode: boolean
    setEditorMode: (v: boolean) => void
  }
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<string>('desktop')

  const [outbarOpen, setOutbarOpen] = useState(false)
  const [outbarWidth, setOutbarWidth] = useState(420)
  const [outbarTitle, setOutbarTitle] = useState('Detalhes')
  const [outbarContent, setOutbarContent] = useState<OutbarContent>(null)

  const openOutbar = useCallback((args?: { title?: string; content?: OutbarContent; width?: number }) => {
    if (args?.title) setOutbarTitle(args.title)
    if (args?.content !== undefined) setOutbarContent(args.content)
    if (typeof args?.width === 'number') setOutbarWidth(args.width)
    setOutbarOpen(true)
  }, [])

  const closeOutbar = useCallback(() => {
    setOutbarOpen(false)
  }, [])

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false)
  const [editorMode, setEditorMode] = useState<boolean>(false)

  const value = useMemo<ApplicationContextType>(() => ({
    device,
    setDevice,

    outbar: {
      isOpen: outbarOpen,
      width: outbarWidth,
      title: outbarTitle,
      content: outbarContent,
      open: openOutbar,
      close: closeOutbar,
      setWidth: setOutbarWidth,
    },

    sidebar: {
      isVisible: sidebarVisible,
      setIsVisible: setSidebarVisible,
      isEditorMode: editorMode,
      setEditorMode: setEditorMode,
    }
  }), [
    device,
    outbarOpen, outbarWidth, outbarTitle, outbarContent, openOutbar, closeOutbar,
    sidebarVisible, editorMode
  ])

  return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>
}

export function useApplication() {
  const ctx = useContext(ApplicationContext)
  if (!ctx) throw new Error('useApplication deve ser usado dentro de ApplicationProvider')
  return ctx
}


