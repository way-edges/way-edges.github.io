'use client'

import { memo, useEffect, useState } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTheme } from 'next-themes'
import Markdown from 'react-markdown'

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
