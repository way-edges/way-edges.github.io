'use client'

import './navi.css'
import { Contact, MenuDrawer } from './common'
import { ModeToggle } from '@/components/theme-provider'
import { useWindowSize } from '@/components/window-size-provider'
import { memo } from 'react'

/// Header navigation
const Navi = memo(() => {
  const is_over_md = useWindowSize()

  const left = (
    <>
      {is_over_md || <MenuDrawer></MenuDrawer>}
      {<h1 className="font-bold text-lg">💻 Way-Edges</h1>}
    </>
  )

  const right = (
    <>
      {is_over_md && <Contact></Contact>}
      <ModeToggle></ModeToggle>
    </>
  )

  return (
    <nav id="navi" className="">
      <div className="w-full flex space-between">
        <div className="left flex items-center">{left}</div>
        <div className="right flex items-center justify-center">{right}</div>
      </div>
    </nav>
  )
})
Navi.displayName = 'Navi'

export default Navi
