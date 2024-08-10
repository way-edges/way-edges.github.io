import { readdirSync, ensureDirSync, Dirent, readFileSync, writeJsonSync } from 'fs-extra'
import path from 'path'

const BASE_DIR = __dirname + '/doc'
const META_PATH = __dirname + '/meta.json'
const BACKUP_DIR = __dirname + '../doc.bak'
const APP_DIR = __dirname + '/../src/app'

interface DocMeta {
  title: string
  name: string
  children: DocMeta[]
}

function deal(f: Dirent): DocMeta | void {
  let meta: DocMeta | void = undefined
  function get_meta(): DocMeta {
    if (!meta) {
      meta = {
        title: '',
        name: f.name,
        children: [],
      }
    }
    return meta!
  }

  if (f.isDirectory()) {
    const tasks: (() => void)[] = []
    let is_md_dir = false
    readdirSync(path.join(f.parentPath, f.name), { withFileTypes: true }).forEach((f) => {
      if (f.isFile() && f.name === 'index.md') {
        const index_md = deal(f)
        index_md && (get_meta().title = index_md.title)
        is_md_dir = true
      } else {
        tasks.push(() => {
          const child = deal(f)
          child && get_meta().children.push(child)
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

function main() {
  ensureDirSync(BASE_DIR)

  const roots: DocMeta[] = []

  // first dir
  readdirSync(BASE_DIR, { withFileTypes: true }).forEach((f) => {
    console.log(f.name)
    const child = deal(f)
    console.log(child)
    child && child.name !== 'index.md' && roots.push(child)
  })

  writeJsonSync(META_PATH, roots)
}

main()
