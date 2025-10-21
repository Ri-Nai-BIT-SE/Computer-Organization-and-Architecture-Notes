import { defineConfig } from 'vitepress'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import { generateNavAndSidebar } from './navSidebar'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsDir = path.join(__dirname, '../docs')
const { nav, sidebar } = generateNavAndSidebar(docsDir)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "计算机组成与体系结构笔记",
  description: "计算机组成与体系结构课程笔记",
  srcDir: './docs',
  base: '/Computer-Organization-and-Architecture-Notes/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/Ri-Nai-BIT-SE/Computer-Organization-and-Architecture-Notes/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    nav: [
      { text: '首页', link: '/' },
      ...nav,
    ],
    outline: [1, 5],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Ri-Nai-BIT-SE/Computer-Organization-and-Architecture-Notes' }
    ],
  },
  markdown: {
    math: true,
    config(md: any) {
      md.use(MermaidMarkdown);
    },
  },
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
})
