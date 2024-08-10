import { memo, useEffect, useState } from 'react'
import Toc from '../toc/Toc'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'

/// left side drawer

export const MenuDrawer = memo(() => {
  const [is_mounted, mounted] = useState(false)

  useEffect(() => {
    mounted(true)
  }, [])

  const toc_contnet = (
    <div className="h-full w-[70vw] z-200">
      <Toc />
    </div>
  )

  if (is_mounted) {
    return (
      <Drawer direction="left">
        <DrawerTrigger className="mr-3" data-state="open" asChild>
          <Button variant="outline" size="icon">
            <HamburgerMenuIcon color="#666" width={20} height={20}></HamburgerMenuIcon>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="z-200">
          <DrawerTitle></DrawerTitle>
          {toc_contnet}
        </DrawerContent>
      </Drawer>
    )
  } else {
    return <div className="hidden">{toc_contnet}</div>
  }
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
