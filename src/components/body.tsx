'use client'

import { TocCurrentPosProvider, TocItem } from '@/widgets/toc/TocState'
import { Inter } from 'next/font/google'
import Root from './root'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const Body = ({ children, res }: { children: React.ReactNode; res: TocItem[] }) => {
  const [transition, unset_transition] = useState('none')
  useEffect(() => {
    unset_transition('inherit')
  }, [])
  return (
    <body style={{ transition }}>
      <div id="root">
        <TocCurrentPosProvider meta={res}>
          <Root>{children}</Root>
        </TocCurrentPosProvider>
      </div>
    </body>
  )
}
