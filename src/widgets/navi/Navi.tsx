'use client'

import { useMediaQuery } from 'react-responsive'
import './navi.css'
import { memo } from 'react'

const MEDIA_MD = 768

/// Header navigation

export default function Navi() {
  const is_over_md = useMediaQuery({ minWidth: MEDIA_MD }, undefined, (b) => {
    console.log('onchange', b)
  })

  const left = is_over_md ? <h1 className="font-bold text-lg">💻 Way-Edges</h1> : <MenuDrawer></MenuDrawer>

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

/// left side drawer

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

const MenuDrawer = memo(() => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon color="#666" width={20} height={20}></HamburgerMenuIcon>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-200">
        <DrawerTitle></DrawerTitle>
        <div className="h-full w-[70vw] z-200">
          <Toc />
        </div>
      </DrawerContent>
    </Drawer>
  )
})
MenuDrawer.displayName = 'MenuDrawer'

/// Contact me

const Contact = memo(() => {
  return (
    <div className="flex flex-col items-center align-center content-center justify-center mr-3">
      <a href="https://github.com/ogios/way-edges">
        <GitHubLogoIcon className="w-[20px] h-[20px] hover:w-[25px] hover:h-[25px] hover:text-[color:var(--link-hover)] hover:translate-x-[2.5px]" />
      </a>
    </div>
  )
})
Contact.displayName = 'Contact'

/// Theme toggle

import { useToggleTheme } from '@/components/theme-provider'
import Toc from '../toc/Toc'
const ModeToggle = memo(() => {
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
