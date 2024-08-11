'use client'

import { usePathname } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface TocItem {
  title: string
  name: string
  children: TocItem[]
  path: string
  name_path: string
}

export interface TocData {
  root_items: TocItem[]
  current_item_path?: string
}

export function useIsItemCurrent(item: TocItem) {
  const ctx = useGlobalTocContext()
  return ctx.data.current_item_path === item.name_path
}

export interface TocContext {
  data: TocData
}

const GlobalTocContext: React.Context<TocContext> = createContext({ data: { root_items: [] } } as TocContext)

export const TocCurrentPosProvider = ({ children, meta }: { children: React.ReactNode; meta: TocItem[] }) => {
  let [meta_route_path_map, metas] = useMemo(() => {
    const map = new Map<string, TocItem>()
    function traverse(items: TocItem[]) {
      items.forEach((v) => {
        map.set(v.name_path, v)
        traverse(v.children)
      })
    }
    traverse(meta)
    return [map, meta]
  }, [meta])

  const path = usePathname().slice(1)

  const [data, setSharedState] = useState<TocData>({
    root_items: metas,
  })

  const set_pos = (item: TocItem) => {
    if (data.current_item_path === item.name_path) {
      return
    }
    data.current_item_path = item.name_path
    setSharedState({ ...data })
  }

  useEffect(() => {
    const item = meta_route_path_map.get(path)
    item && set_pos(item)
  }, [path])

  const value = useMemo(() => ({ data }), [data])

  return <GlobalTocContext.Provider value={value}>{children}</GlobalTocContext.Provider>
}

export function useGlobalTocContext() {
  return useContext(GlobalTocContext)
}
