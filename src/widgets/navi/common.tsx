import { memo } from 'react'
import Toc from '../toc/Toc'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

export const MainTitle = memo(() => {
  return <h1 className="font-bold text-lg">💻 Way-Edges</h1>
})
MainTitle.displayName = 'MainTitle'

/// left side drawer

export const MenuDrawer = memo(() => {
  return (
    <Drawer direction="left">
      <DrawerTrigger className="mr-3" data-state="open" asChild>
        <Button className="ts-inh" variant="outline" size="icon">
          <HamburgerMenuIcon color="#666" width={20} height={20}></HamburgerMenuIcon>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="z-200">
        <DrawerTitle className="p-3 pb-1 pt-4 flex">
          <div className="flex-1">
            <MainTitle />
          </div>
          <Contact />
        </DrawerTitle>
        <div className="h-full w-[70vw] z-200">
          <Toc />
        </div>
      </DrawerContent>
    </Drawer>
  )
})
MenuDrawer.displayName = 'MenuDrawer'

/// Contact me

export const Contact = memo(() => {
  return (
    <div className="flex flex-col items-center align-center content-center justify-center mr-3">
      <a href="https://github.com/ogios/way-edges">
        <GitHubLogoIcon className="w-[20px] h-[20px] hover:w-[25px] hover:h-[25px] hover:text-[color:var(--link-hover)] hover:translate-x-[2.5px]" />
      </a>
    </div>
  )
})
Contact.displayName = 'Contact'
