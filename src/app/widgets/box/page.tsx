
import { get_file_under_data } from '@/lib/local_util'
import MarkdownContent from '@/widgets/md/md_content'
import { readFileSync } from 'fs'
import '@/app/md.css'

export default async function Page() {
  const path = get_file_under_data('/doc/4.widgets/5.box/index.md')
  const content = readFileSync(path).toString()
  return (
      <MarkdownContent content={content} />
  )
}
