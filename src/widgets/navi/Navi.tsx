'use client'

import './navi.css'
import { Contact, MenuDrawer } from './common'
import { ModeToggle } from '@/components/theme-provider'
import { memo } from 'react'
import { Media } from '@/components/media'

/// Header navigation
const Navi = memo(() => {
  const left = (
    <>
      <Media lessThan="md">
        <MenuDrawer></MenuDrawer>
      </Media>
      <h1 className="font-bold text-lg">💻 Way-Edges</h1>
    </>
  )

  const right = (
    <>
      <Media greaterThanOrEqual="md">
        <Contact></Contact>
      </Media>
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
