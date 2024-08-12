'use client'

import { memo, useEffect, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTheme } from 'next-themes'
import Markdown from 'react-markdown'
import { getCodeString } from 'rehype-rewrite'

import katex from 'katex'
import 'katex/dist/katex.css'
import './md.css'

interface MarkdownInfo {
  content: string
}

import { Skeleton } from '@/components/ui/skeleton'
const MarkdownContent = memo(({ content }: MarkdownInfo) => {
  const { theme } = useTheme()

  // this related to error with `MarkdownPreview`
  // server render and client render theme can always be different, which result in error
  const [mounted, on_mounted] = useState(false)

  useEffect(() => {
    on_mounted(true)
  }, [])

  if (mounted) {
    return (
      <MarkdownPreview
        source={content}
        // @ts-ignore
        // ignore theme variable type (it's sould only be dark or light)
        wrapperElement={{ 'data-color-mode': theme }}
        style={{ minHeight: '100%', padding: 30, background: 'none' }}
        components={{
          code: ({ children = [], className, ...props }) => {
            if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
              const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
                throwOnError: false,
              })
              return <code dangerouslySetInnerHTML={{ __html: html }} style={{ background: 'transparent' }} />
            }
            const code = props.node && props.node.children ? getCodeString(props.node.children) : children
            if (
              typeof code === 'string' &&
              typeof className === 'string' &&
              /^language-katex/.test(className.toLocaleLowerCase())
            ) {
              const html = katex.renderToString(code, {
                throwOnError: false,
              })
              return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />
            }
            return <code className={String(className)}>{children}</code>
          },
        }}
      />
    )
  } else {
    return (
      <>
        {/* make sure content text is pre-rendered no matter what the style is */}
        <div className="hidden">
          <Markdown>{content}</Markdown>
        </div>

        {/* skeleton */}
        <div className="flex flex-col space-y-3 p-5">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[75%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>
        </div>
      </>
    )
  }
})

MarkdownContent.displayName = 'MarkdownContent'

export default MarkdownContent
