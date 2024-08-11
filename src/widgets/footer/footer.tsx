'use client'

import { useEffect, useState } from 'react'

const a = `
"YOU ⭐ YOU WIN A BILLION$$$"
                       ———— Someone from YTB

`
  .trimStart()
  .trimEnd()
const b = `
"'Star⭐' true as the ten"
                       ———— Someone from tenakth
`
  .trimStart()
  .trimEnd()

const footer_words = [a, b]

export default function Footer() {
  let index = Math.floor(Math.random() * footer_words.length)
  const [opacity, set_op] = useState(0)
  useEffect(() => {
    set_op(1)
  }, [])
  return (
    <footer className="h-[100px] bg-[var(--nav-background)] flex justify-center items-center">
      <p
        className="text-center whitespace-break-spaces font-mono "
        style={{ opacity, transition: 'opacity 1s' }}
        suppressHydrationWarning>
        {footer_words[index]}
      </p>
    </footer>
  )
}
