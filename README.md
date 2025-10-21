# 计算机组成与体系结构笔记

基于 VitePress 构建的课程笔记网站。

## 使用说明

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm docs:dev
```

访问 http://localhost:5173/Computer-Organization-and-Architecture-Notes/

### 构建

```bash
pnpm docs:build
```

### 预览构建结果

```bash
pnpm docs:preview
```

## 自动化功能

### 自动生成目录索引

项目会自动为 `docs/` 目录下的每个章节文件夹生成 `README.md` 索引文件。

运行命令：

```bash
pnpm generate-indexes
```

该脚本会：
- 扫描 `docs/` 目录下的所有文件夹
- 为每个文件夹生成包含所有 Markdown 文件链接的 `README.md`
- 仅覆盖带有 `AUTO-GENERATED` 标记的文件，保护手动编辑的索引

### 自动生成导航和侧边栏

VitePress 配置会自动根据 `docs/` 目录结构生成导航栏和侧边栏：

- 每个文件夹会在导航栏中显示为一个菜单项
- 文件夹内的文件会自动添加到侧边栏
- 支持中文文件名，按拼音排序
- 如果文件夹包含 `README.md` 或 `index.md`，会作为该章节的首页

## 项目结构

```
.
├── docs/               # 文档源文件
│   ├── index.md       # 首页
│   ├── 第二章/         # 章节文件夹
│   │   ├── README.md  # 自动生成的索引
│   │   ├── 1.md
│   │   └── 2.md
│   └── ...
├── .vitepress/        # VitePress 配置
│   ├── config.mts     # 主配置文件
│   └── navSidebar.ts  # 导航和侧边栏生成逻辑
└── scripts/           # 脚本工具
    └── generate-indexes.mjs  # 索引生成脚本
```

## 添加新内容

1. 在 `docs/` 目录下创建新的文件夹（如 `第三章/`）
2. 在文件夹中添加 Markdown 文件
3. 运行 `pnpm generate-indexes` 生成索引
4. 导航和侧边栏会自动更新

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Mermaid](https://mermaid.js.org/) - 图表支持
- [MathJax](https://www.mathjax.org/) - 数学公式支持
