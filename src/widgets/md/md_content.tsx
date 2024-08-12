'use client'

import { memo, useEffect, useRef, useState } from 'react'
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

  const headersRef = useRef<HTMLHeadingElement[]>([])

  useEffect(() => {
    on_mounted(true)
  }, [])

  if (mounted) {
    return (
      <div className="flex w-full">
        <MarkdownPreview
          source={content}
          // @ts-ignore
          // ignore theme variable type (it's sould only be dark or light)
          wrapperElement={{ 'data-color-mode': theme }}
          style={{ minHeight: '100%', padding: 30, background: 'none' }}
          onScroll={(v) => {
            console.log(v)
          }}
          components={{
            h1: ({ node, ...props }) => {
              return (
                <h1
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },
            h2: ({ node, ...props }) => {
              return (
                <h2
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },
            h3: ({ node, ...props }) => {
              return (
                <h3
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },
            h4: ({ node, ...props }) => {
              return (
                <h4
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },
            h5: ({ node, ...props }) => {
              return (
                <h5
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },
            h6: ({ node, ...props }) => {
              return (
                <h6
                  ref={(el) => {
                    headersRef.current.push(el!)
                  }}
                  {...props}
                />
              )
            },

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

        <MarkToc
          content={content}
          onClickTocItem={(index) => {
            console.log(headersRef.current.length)
            headersRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
        />
      </div>
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

function MarkToc({ content, onClickTocItem }: { content: string; onClickTocItem: (index: number) => void }) {
  const { theme } = useTheme()

  // @ts-ignore
  const reg = /(?<flag>#{1,6})\s+(?<content>.+)/g

  interface TocNode {
    array_index: number
    content: string
    level: number
    children: TocNode[]
    parent?: TocNode
  }

  function gen_toc_item(n: TocNode) {
    return (
      <div
        key={n.array_index}
        className="cursor-pointer  hover-item "
        style={{ margin: 0, paddingRight: 0, paddingLeft: '5px' }}>
        <div onClick={() => onClickTocItem(n.array_index)}>
          <MarkdownPreview
            source={n.content}
            // @ts-ignore
            wrapperElement={{ 'data-color-mode': theme }}
            style={{ background: 'none' }}
            components={{
              p: ({ node, ...props }) => {
                return <p className="flex" style={{ wordBreak: 'break-word' }} {...props}></p>
              },
            }}
          />
        </div>
      </div>
    )
  }

  const toc_tree_root: TocNode = {
    array_index: -1,
    content: '',
    level: 0,
    children: [],
  }

  let current_node = toc_tree_root

  function insert_node(node: TocNode) {
    current_node.children.push(node)
    current_node = node
  }

  // @ts-ignore
  Array.from(content.matchAll(reg)).forEach(({ groups: { flag, content } }, index) => {
    const level = flag.length
    console.log(level)
    while (current_node.level >= level) {
      current_node = current_node.parent!
    }
    insert_node({
      array_index: index,
      children: [],
      content,
      level,
      parent: current_node,
    })
  })

  function Traverse({ n }: { n: TocNode }) {
    const children = n.children.map((cn, index) => {
      return (
        <div key={index}>
          <Traverse n={cn} />
        </div>
      )
    })
    return (
      <div>
        {gen_toc_item(n)}
        {children.length > 0 && <ul className="pl-3 collapse-list">{children}</ul>}
      </div>
    )
  }
  const toc_tree = toc_tree_root.children.map((node, index) => {
    return (
      <div key={index}>
        <Traverse n={node} />
      </div>
    )
  })

  return <ul className="border-l-2 p-1 w-[200px] min-w-[200px]">{toc_tree}</ul>
}
