import { get_file_under_data } from '@/lib/local_util'
import type { TocItem } from '@/widgets/toc/TocState'
import { readJsonSync } from 'fs-extra'
import { cache } from 'react'

export const getMeta = cache((): TocItem[] => {
  const item = readJsonSync(get_file_under_data('meta.json'))
  return item
})
