import { memo, useEffect, useRef, useState } from 'react'
import { OpenState, useTocOpenState, type TocItem } from './TocState'
import Link from 'next/link'

export interface CollapseProps {
  index: number
  content: TocItem
}
export const Collapse = ({ content, index }: CollapseProps) => {
  const ls = content.children.map((content, i) => <Collapse index={i} content={content} key={i}></Collapse>)

  const open_state = useTocOpenState(content)
  const is_choosen = open_state === OpenState.THIS

  const [is_open, set_open] = useState(open_state === OpenState.OPEN)

  useEffect(() => {
    set_open(open_state === OpenState.OPEN)
  }, [])

  const list_ref = useRef<HTMLUListElement>(null)

  const [list_style, set_list_style] = useState({
    list: {
      height: '0px',
      overflow: 'hidden',
      transition: 'height 0.3s ease-in-out',
    },
    switch: {
      rotate: '0deg',
    },
  })

  useEffect(() => {
    if (is_open) {
      set_list_style({
        list: {
          ...list_style.list,
          height: `${list_ref.current!.scrollHeight}px`,
        },
        switch: {
          rotate: '90deg',
        },
      })
    } else {
      set_list_style({
        list: {
          ...list_style.list,
          height: '0px',
        },
        switch: {
          rotate: '0deg',
        },
      })
    }
  }, [is_open])

  // if (is_open && list_ref.current) {
  // }

  return (
    <li key={index}>
      <div className={'flex hover-item ' + (is_choosen ? ' choosen' : '')}>
        <Link className="w-full content-center flex-1 text-lg" href={`/${content.name_path}`}>
          {content.title}
        </Link>

        {ls.length > 0 ? (
          <div
            className="flex justify-center items-center rounded-sm w-[30px] collapse-sign"
            onClick={() => set_open(!is_open)}>
            <div className="w-[15px] h-[5px] bg-[var(--link-hover)]" style={list_style.switch}></div>
          </div>
        ) : undefined}
      </div>

      <ul className="pl-2 collapse-list " ref={list_ref} style={list_style.list}>
        {ls}
      </ul>
    </li>
  )
}
Collapse.displayName = 'Collapse'
