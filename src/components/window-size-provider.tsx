'use client'

import { createContext, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

type WindowSizeProviderProps = {
  children: React.ReactNode
}

const WindowSizeContext = createContext<boolean>(false)

const MEDIA_MD = 992

export function WindowSizeProvider({ children }: WindowSizeProviderProps) {
  const is_over_md = useMediaQuery({ minWidth: MEDIA_MD }, undefined)

  return <WindowSizeContext.Provider value={is_over_md}>{children}</WindowSizeContext.Provider>
}

export const useWindowSize = () => {
  const context = useContext(WindowSizeContext)
  return context
}
