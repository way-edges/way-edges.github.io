import { readdirSync, ensureDirSync, Dirent, readFileSync, writeJsonSync } from 'fs-extra'
import path from 'path'

const BASE_DIR = __dirname + '/doc'
const META_PATH = __dirname + '/meta.json'

interface DocMeta {
  name: string
  title: string
  children: DocMeta[]
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

  // console.log()
  // console.log()
  // console.log()
  // console.log()
  // console.log()
  // console.log(roots)
}

function deal(f: Dirent): DocMeta | void {
  let meta: DocMeta | void = undefined
  function get_meta(): DocMeta {
    if (!meta) {
      meta = {
        name: f.name,
        title: '',
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

main()
