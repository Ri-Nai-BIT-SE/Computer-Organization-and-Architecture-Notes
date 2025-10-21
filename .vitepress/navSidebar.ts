import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme } from 'vitepress'

export type SidebarItem = DefaultTheme.SidebarItem
export type NavItem = DefaultTheme.NavItem
export type Sidebar = DefaultTheme.Sidebar

const DOC_EXT = ['.md']
const EXCLUDED_DIRS = new Set([
  '.git',
  '.github',
  '.vitepress',
  'node_modules',
  'images',
  'docker_support',
  'public',
  'docs',
  'images',
  'docker_support',
])

function isDirectory(p: string) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory()
}

function isMarkdown(p: string) {
  return fs.existsSync(p) && fs.statSync(p).isFile() && DOC_EXT.includes(path.extname(p))
}

function titleFromName(name: string) {
  // strip extension & use as-is (Chinese names kept)
  return name.replace(/\.md$/i, '')
}

function sortByPinyinOrName(a: string, b: string) {
  return a.localeCompare(b, 'zh-Hans-CN-u-co-pinyin')
}

export function generateNavAndSidebar(rootDir: string) {
  const entries = fs.readdirSync(rootDir)
  const sections = entries
    .filter((e) => isDirectory(path.join(rootDir, e)))
    .filter((e) => !EXCLUDED_DIRS.has(e) && !e.startsWith('.'))
  sections.sort(sortByPinyinOrName)

  const nav: NavItem[] = []
  const sidebar: Sidebar = {}

  // This is the item type we generate from files. It has a required text and link.
  // It is compatible with both NavItem and SidebarItem.
  type LinkItem = { text: string; link: string }

  for (const dir of sections) {
    const abs = path.join(rootDir, dir)
    const entries = fs.readdirSync(abs)
    const items: LinkItem[] = []

    // 收集 Markdown 文件和子文件夹
    for (const entry of entries) {
      const entryPath = path.join(abs, entry)
      const lowerEntry = entry.toLowerCase()

      // 跳过 index.md 和 readme.md
      if (lowerEntry === 'index.md' || lowerEntry === 'readme.md') {
        continue
      }

      if (isDirectory(entryPath)) {
        // 子文件夹：检查是否包含 index.md
        if (fs.existsSync(path.join(entryPath, 'index.md'))) {
          items.push({
            text: entry,
            link: `/${encodeURI(dir)}/${encodeURI(entry)}/`,
          })
        }
      } else if (isMarkdown(entryPath)) {
        // Markdown 文件
        items.push({
          text: titleFromName(entry),
          link: `/${encodeURI(dir)}/${encodeURI(entry)}`,
        })
      }
    }

    items.sort((a, b) => sortByPinyinOrName(a.text, b.text))

    if (items.length > 0 || fs.existsSync(path.join(abs, 'index.md')) || fs.existsSync(path.join(abs, 'README.md'))) {
      const readme = ['README.md', 'readme.md', 'index.md'].find((n) =>
        fs.existsSync(path.join(abs, n)),
      )
      const readmeURI = readme ? `/${encodeURI(dir)}/${encodeURI(readme)}` : undefined

      let sectionLink: string
      let sectionItems: LinkItem[]

      if (readmeURI) {
        sectionLink = readmeURI
        sectionItems = items
      } else if (items.length > 0) {
        sectionLink = items[0].link!
        sectionItems = items.slice(1)
      } else {
        sectionLink = `/${encodeURI(dir)}/`
        sectionItems = []
      }

      sidebar[`/${dir}/`] = [
        {
          text: dir,
          link: sectionLink,
          items: sectionItems,
        },
      ]

      nav.push({
        text: dir,
        link: sectionLink,
      })
    } else {
      nav.push({ text: dir, link: `/${encodeURI(dir)}/` })
    }
  }

  return { nav, sidebar }
}
