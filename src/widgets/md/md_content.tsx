'use client'
import { memo } from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTheme } from 'next-themes'

interface MarkdownInfo {
  content: string
}

const MarkdownContent = memo(({ content }: MarkdownInfo) => {
  const { theme } = useTheme()
  return (
    <MarkdownPreview
      source={content}
      // @ts-ignore
      // ignore theme variable type (it's sould only be dark or light)
      wrapperElement={{ 'data-color-mode': theme }}
      style={{ minHeight: '100%', padding: 30, background: 'none' }}
    />
  )
})

MarkdownContent.displayName = 'MarkdownContent'

export default MarkdownContent
