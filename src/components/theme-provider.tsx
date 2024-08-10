'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { Button } from './ui/button'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useToggleTheme() {
  const { setTheme, theme } = useTheme()

  return () => {
    console.log('toggle')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
}

export const ModeToggle = React.memo(() => {
  const toggleTheme = useToggleTheme()
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <label className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">🌅</label>
      <label className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
        🌑
      </label>
    </Button>
  )
})
ModeToggle.displayName = 'ModeToggle'
