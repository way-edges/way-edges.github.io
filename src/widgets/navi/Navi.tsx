'use client'

import { useMediaQuery } from 'react-responsive'
import './navi.css'
import { Contact, MenuDrawer } from './common'
import { ModeToggle } from '@/components/theme-provider'
import { type TocItem } from '../toc/TocState'

const MEDIA_MD = 768

/// Header navigation

export default function Navi({ toc }: { toc: TocItem[] }) {
  const is_over_md = useMediaQuery({ minWidth: MEDIA_MD }, undefined, (b) => {
    console.log('onchange', b)
  })

  const left = is_over_md ? <h1 className="font-bold text-lg">💻 Way-Edges</h1> : <MenuDrawer toc={toc}></MenuDrawer>

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
}
