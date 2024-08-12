'use client'

import { Media } from '@/components/media'
import SidePane from './sidepane/SidePane'
import './main.css'

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-page flex flex-row" style={{ flex: '1 0 auto' }}>
      <Media greaterThanOrEqual="md">
        <SidePane />
      </Media>

      <main id="main-content">{children}</main>
    </div>
  )
}
