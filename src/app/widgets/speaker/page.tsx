
import { get_file_under_data } from '@/lib/local_util'
import MarkdownContent from '@/widgets/md/md_content'
import { readFileSync } from 'fs'
import '@/app/md.css'

export default async function Page() {
  const path = get_file_under_data('/doc/4.widgets/2.speaker.md')
  const content = readFileSync(path).toString()
  return (
    <main id="markdown-content">
      <MarkdownContent content={content} />
    </main>
  )
}