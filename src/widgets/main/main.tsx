'use client'

import { Media } from '@/components/media'

import SidePane from './sidepane/SidePane'

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row " style={{ flex: '1 0 auto' }}>
      <Media greaterThanOrEqual="md">
        <SidePane />
      </Media>
      {children}
    </div>
  )
}
