'use client'

import { memo, useRef, useState } from 'react'
import './toc.css'
import { TocItem, useTocCurrentPos } from './TocState'

const Toc = memo(() => {
  const { data } = useTocCurrentPos()
  const contents = data.root_items.map((c, i_content) => {
    return <Collapse key={i_content} content={c} index={i_content} />
  })
  return <div className="w-full p-2">{contents}</div>
})
Toc.displayName = 'Toc'

interface CollapseProps {
  index: number
  content: TocItem
}
const Collapse = memo(({ content, index }: CollapseProps) => {
  const { set_pos } = useTocCurrentPos()

  const ls = content.children.map((content, i) => <Collapse index={i} content={content} key={i}></Collapse>)

  const [is_open, set_open] = useState(false)
  const list_ref = useRef<HTMLUListElement>(null)

  const list_style = {
    height: '0px',
    overflow: 'hidden',
    transition: 'height 0.3s ease-in-out',
  }

  if (is_open) {
    list_style.height = `${list_ref.current!.scrollHeight}px`
  }

  return (
    <li key={index}>
      <div className={'flex hover-item ' + (content.is_choosen ? ' choosen' : '')}>
        <a className="content-center flex-1 text-lg" onClick={() => set_pos!(content)}>
          {content.title}
        </a>

        {ls.length > 0 ? (
          <div
            className="flex justify-center items-center rounded-sm w-[30px] collapse-sign"
            onClick={() => set_open(!is_open)}>
            <div className="w-[15px] h-[5px] bg-red-300" style={{ rotate: is_open ? '90deg' : '0deg' }}></div>
          </div>
        ) : undefined}
      </div>

      <ul className="pl-2 collapse-list " ref={list_ref} style={list_style}>
        {ls}
      </ul>
    </li>
  )
})
Collapse.displayName = 'Collapse'

export default Toc
