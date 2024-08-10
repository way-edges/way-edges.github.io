'use client'

import { memo, useEffect } from 'react'
import './toc.css'
import { type TocItem, useGlobalTocContext } from './TocState'
import { Collapse } from './common'

const Toc = memo(({ toc }: { toc: TocItem[] }) => {
  const { data, set_data, set_pos } = useGlobalTocContext()

  useEffect(() => {
    set_data!({ root_items: toc })
  }, [])

  const contents = toc.map((c, i_content) => {
    return <Collapse key={i_content} content={c} index={i_content} set_pos={set_pos!} />
  })

  return <div className="w-full p-2">{contents}</div>
})
Toc.displayName = 'Toc'

export default Toc
