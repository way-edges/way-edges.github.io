'use client'

import { memo } from 'react'
import './toc.css'
import { useGlobalTocContext } from './TocState'
import { Collapse } from './common'

const Toc = memo(() => {
  const { data } = useGlobalTocContext()

  const contents = data.root_items.map((c, i_content) => {
    return <Collapse key={i_content} content={c} index={i_content} />
  })

  return <div className="w-full p-2 list-none">{contents}</div>
})
Toc.displayName = 'Toc'

export default Toc
