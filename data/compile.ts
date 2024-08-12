import { readdirSync, ensureDirSync, Dirent, readFileSync, writeJsonSync } from 'fs-extra'
import path from 'path'

const BASE_DIR = __dirname + '/doc'
const META_PATH = __dirname + '/meta.json'
const BACKUP_DIR = __dirname + '/doc.bak'
const APP_DIR = __dirname + '/../src/app'
const INDEX_MD = 'index.md'

interface DocMeta {
  title: string
  name: string
  children: DocMeta[]
  path: string
  name_path: string
}

function deal(f: Dirent): DocMeta | void {
  let meta: DocMeta | void = undefined
  function get_meta(): DocMeta {
    if (!meta) {
      meta = {
        title: '',
        name: '',
        children: [],
        path: path.join(f.parentPath, f.name).replace(__dirname, ''),
        name_path: '',
      }
      if (f.name === INDEX_MD) {
        meta.name = meta.name_path = ''
      } else {
        const [_, n] = splitIndex(f.name)!
        meta.name = meta.name_path = n
      }
    }
    return meta!
  }

  if (f.isDirectory()) {
    const tasks: (() => void)[] = []
    let is_md_dir = false
    readdirSync(path.join(f.parentPath, f.name), { withFileTypes: true }).forEach((cf) => {
      // index md represent current dir
      if (cf.isFile() && cf.name === INDEX_MD) {
        const index_md = deal(cf)
        if (index_md) {
          const meta = get_meta()
          index_md && (meta.title = index_md.title)
          meta.path = path.join(meta.path, INDEX_MD)
        }

        is_md_dir = true
      } else {
        // regular file or dir
        const res = splitIndex(cf.name)
        if (!res) {
          return
        }

        const [index, _] = res
        tasks.push(() => {
          const child = deal(cf)
          if (child) {
            const meta = get_meta()
            child.name_path = path.join(meta.name_path, child.name_path)
            get_meta().children[index] = child
          }
        })
      }
    })
    is_md_dir && tasks.forEach((t) => t())
  } else {
    if (path.extname(f.name) === '.md') {
      const title = extractFirstH1(readFileSync(path.join(f.parentPath, f.name)).toString())
      if (!title) {
        console.warn(`file: ${f.name} does not have h1 title, using file name instead`)
        get_meta().title = meta!.name
      } else {
        get_meta().title = title
      }
    }
  }

  return meta
}
function extractFirstH1(markdown: string): string | null {
  // 使用正则表达式匹配第一个 h1 标题
  const match = markdown.match(/^# (.+)$/m)
  return match ? match[1] : null
}
function splitIndex(name: string): [number, string] | null {
  const dots = name.split('.')
  if (dots.length < 2) {
    return null
  }
  const index = parseInt(dots[0])
  if (index < 0 || isNaN(index)) {
    return null
  }

  return [index, dots[1]]
}

import { statSync, existsSync, copySync, removeSync } from 'fs-extra'

function backup_clean_app_page() {
  if (existsSync(BACKUP_DIR) && statSync(BACKUP_DIR).isDirectory()) {
    throw new Error('backup dir already exists, please deel with it frist')
  } else {
    // backup
    copySync(APP_DIR, BACKUP_DIR)

    // remove
    readdirSync(APP_DIR, { withFileTypes: true }).forEach((f) => {
      if (f.isDirectory()) {
        removeSync(path.join(f.parentPath, f.name))
      }
    })
  }
}

const PAGE_TEMPLATE = `
import { get_file_under_data } from '@/lib/local_util'
import MarkdownContent from '@/widgets/md/md_content'
import { readFileSync } from 'fs'
import '@/app/md.css'

export default async function Page() {
  const path = get_file_under_data('namepath')
  const content = readFileSync(path).toString()
  return (
      <MarkdownContent content={content} />
  )
}
`
function gen_page(file_path: string) {
  return PAGE_TEMPLATE.replace('namepath', file_path)
}

import { writeFileSync, ensureFileSync } from 'fs-extra'

function create_page(v: DocMeta) {
  const file_p = path.join(APP_DIR, v.name_path, 'page.tsx')
  ensureFileSync(file_p)
  const page = gen_page(v.path)
  writeFileSync(file_p, page)
}

function main() {
  ensureDirSync(BASE_DIR)

  const roots: DocMeta[] = []

  // first dir
  readdirSync(BASE_DIR, { withFileTypes: true }).forEach((f) => {
    const res = splitIndex(f.name)
    if (!res) {
      return
    }
    console.log(res)
    const [index, _] = res
    const child = deal(f)
    child && (roots[index] = child)
  })

  console.log(roots, { depth: null })

  writeJsonSync(META_PATH, roots)

  backup_clean_app_page()

  function traverse_roots(roots: DocMeta[]) {
    roots.forEach((r) => {
      create_page(r)
      traverse_roots(r.children)
    })
  }
  traverse_roots(roots)
}

main()
