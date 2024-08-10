'use client'

import { useWindowSize } from '@/components/window-size-provider'
import SidePane from './sidepane/SidePane'

export default function MainContent({ children }: { children: React.ReactNode }) {
  const is_over_lg = useWindowSize()
  return (
    <div className="flex flex-row " style={{ flex: '1 0 auto' }}>
      {is_over_lg && <SidePane />}
      {children}
    </div>
  )
}
