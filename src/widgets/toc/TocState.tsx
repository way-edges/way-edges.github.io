'use client'

import { createContext, useContext, useState } from 'react'

export interface TocItem {
  title: string
  is_choosen: boolean
  children: TocItem[]
}

export interface TocData {
  root_items: TocItem[]
  current_item?: TocItem
}

export interface TocContext {
  data: TocData
  set_pos?: (item: TocItem) => void
  set_data?: (data: TocData) => void
}

const DEFAULT_CONTENT: TocItem[] = [
  {
    title: 'Fail to load content',
    is_choosen: false,
    children: [],
  },
]

const GlobalTocContext: React.Context<TocContext> = createContext({ data: { root_items: [] } } as TocContext)

export const TocCurrentPosProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setSharedState] = useState<TocData>({
    root_items: DEFAULT_CONTENT,
  })

  function setPos(item: TocItem) {
    if (data.current_item) {
      data.current_item.is_choosen = false
    }
    item.is_choosen = true
    data.current_item = item
    setSharedState({ ...data })
  }

  // const value = useMemo(() => ({ sharedState, setSharedState }), [sharedState])

  return (
    <GlobalTocContext.Provider value={{ data, set_pos: setPos, set_data: setSharedState }}>
      {children}
    </GlobalTocContext.Provider>
  )
}

export function useGlobalTocContext() {
  return useContext(GlobalTocContext)
}
