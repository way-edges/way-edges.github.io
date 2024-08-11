'use client'

import Navi from '@/widgets/navi/Navi'
import { MediaContextProvider } from './media'
import React from 'react'
import MainContent from '@/widgets/main/main'
import Footer from '@/widgets/footer/footer'
import { ThemeProvider } from './theme-provider'

function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" storageKey="vite-ui-theme">
      <MediaContextProvider>
        <Navi />
        <MainContent>{children}</MainContent>
        <Footer />
      </MediaContextProvider>
    </ThemeProvider>
  )
}

export default Root
