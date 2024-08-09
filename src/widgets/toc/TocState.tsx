'use client'

import { createContext, useContext, useState } from 'react'

export interface TocItem {
  title: string
  is_choosen: boolean
  children: TocItem[]
}

interface TocData {
  root_items: TocItem[]
  current_item?: TocItem
}

interface TocContext {
  data: TocData
  set_pos?: (item: TocItem) => void
}

const EXAMPLE_CONTENTS: TocItem[] = [
  {
    title: 'Configuration',
    is_choosen: false,
    children: [
      {
        title: 'lazy.nvim',
        is_choosen: false,
        children: [],
      },
    ],
  },
]

const TocCurrentPosContext: React.Context<TocContext> = createContext(null)

export const TocCurrentPosProvider = ({ children }) => {
  const [data, setSharedState] = useState<TocData>({
    root_items: EXAMPLE_CONTENTS,
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

  return <TocCurrentPosContext.Provider value={{ data, set_pos: setPos }}>{children}</TocCurrentPosContext.Provider>
}

export function useTocCurrentPos() {
  return useContext(TocCurrentPosContext)
}
