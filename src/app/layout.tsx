import './globals.css'
import './root.css'
import type { Metadata } from 'next'
import { getMeta } from './cache'
import RootHead from '@/components/root_head'
import { Body } from '@/components/body'
import 'typeface-cantarell'

export const metadata: Metadata = {
  title: 'Way-Edges Doc',
  description: 'Documentation for Way-Edges',
  applicationName: 'Way-Edges',
  authors: { url: 'https://github.com/ogios', name: 'OGIOS' },
  generator: 'Next.js',
  keywords: ['wayland', 'unix', 'gtk', 'way-edges', 'custom widgets', 'doc'],
  creator: 'OGIOS',
  category: 'Wayland Client',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const res = getMeta()
  return (
    <html lang="en" suppressHydrationWarning>
      <RootHead />
      <Body res={res}>{children}</Body>
    </html>
  )
}
