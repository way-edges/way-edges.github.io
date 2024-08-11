'use client'

import { createContext, useContext, useState } from 'react'

export interface TocItem {
  title: string
  name: string
  is_choosen: boolean
  children: TocItem[]
  path: string
  name_path: string
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

const GlobalTocContext: React.Context<TocContext> = createContext({ data: { root_items: [] } } as TocContext)

export const TocCurrentPosProvider = ({ children, meta }: { children: React.ReactNode; meta: TocItem[] }) => {
  console.log(meta)
  const [data, setSharedState] = useState<TocData>({
    root_items: meta,
  })

  function set_pos(item: TocItem) {
    if (data.current_item) {
      data.current_item.is_choosen = false
    }
    item.is_choosen = true
    data.current_item = item
    setSharedState({ ...data })
  }

  function set_data(data: TocData) {
    setSharedState(data)
    // if (!CONTENT_INITED) {
    //   CONTENT_INITED = true
    // }
  }

  // const value = useMemo(() => ({ sharedState, setSharedState }), [sharedState])

  return <GlobalTocContext.Provider value={{ data, set_pos, set_data }}>{children}</GlobalTocContext.Provider>
}

export function useGlobalTocContext() {
  return useContext(GlobalTocContext)
}
