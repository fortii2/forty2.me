# Zed Li — Minimal Personal Website

A static personal portfolio and blog with no browser dependencies. Articles are written in Markdown and compiled to posts.js using Node.js before publishing. The generated site needs no server-side runtime.

## Run locally

You can double-click `index.html` to preview, or use a local server (recommended):

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize

1. Open **config.js**. Replace the empty `email`, `github`, `linkedin`, `instagram`, `threads`, `xiaohongshu`, and `douban` values with your public links. Blank values are safely shown as unconfigured, not as broken links.
2. Put your real PDF into the **resume/** folder, e.g. `resume/Zed_Li_Resume.pdf`, then set `resume: 'resume/Zed_Li_Resume.pdf'` in **config.js**.
3. To use a photo instead of the ZL monogram, place it at `assets/portrait.jpg` and set `photo: 'assets/portrait.jpg'`.
4. Add or edit Markdown files in **content/posts/**, then run `node scripts/build-posts.mjs`. See the writing workflow below. **posts.js** is generated; manual edits will be overwritten.
5. Modify the copy for About, Experience, and Projects in **script.js** (look for `dictionary`, `experienceSection`, and `about`).

## Write articles

每篇文章放在 `content/posts/` 下的一个 `.md` 文件里。可参考下面的格式；每篇只需提供中文或英文，无需翻译。

```md
---
slug: my-first-post
date: 2026-11-02
category: 生活
draft: false
lang: zh
title: 我的第一篇文章
excerpt: 这里写一段简短的摘要。
---

这里直接写正文，不需要转义换行和引号。

## 小标题

支持 **加粗**、*斜体*、列表、链接、引用和代码块。
```

顶部 `---` 之间是固定格式的元数据，每个字段占一行，均需填写：

| 字段 | 说明 |
| --- | --- |
| `slug` | 唯一的网址标识，只用小写英文字母、数字和连字符；发布后尽量保持不变 |
| `date` | 原始发表日期，格式为 `YYYY-MM-DD`；生成时按日期从新到旧排列 |
| `category` | 分类名称，按原文显示 |
| `draft` | `true` 或 `false`；当前仅显示草稿标签，**不会隐藏文章** |
| `lang` | 原文语言，`zh` 或 `en`；切换网站语言时文章保持原文 |
| `title` | 文章标题；正文无需重复写一级标题 |
| `excerpt` | 单行摘要，显示在列表及正文标题下方 |

元数据支持单行纯文本、双引号字符串（按 JSON 转义规则）或单引号字符串（内部单引号写成两个）。不支持嵌套 YAML、数组、多行值或行尾注释。正文可以正常分段。

新增、修改或删除文章后，在项目目录运行（需安装支持 `.mjs` 的现代 Node.js，例如 Node.js 22 或更新版本，无需安装 npm 依赖）：

```bash
node scripts/build-posts.mjs
```

脚本会扫描 `content/posts/` 直属的所有 `.md` 文件，检查日期、必填字段及重复 slug，重新生成 `posts.js`。如果发现错误，会报告文件名，保留上一次成功生成的文件。

预览和发布使用生成后的 `posts.js`；浏览器不会直接读取 Markdown。把 Markdown、生成脚本和更新后的 `posts.js` 一起提交，确保部署内容与原稿一致。

## Publish

### Cloudflare Pages / Netlify

Upload the entire folder through the host's static-site deployment workflow, or commit the files to a GitHub repo and connect it. Run `node scripts/build-posts.mjs` before uploading. If the host builds from Git, use that as the build command with Node.js available. The publish directory is the project root.

### GitHub Pages

Run `node scripts/build-posts.mjs`, commit the updated `posts.js` with the source files, and enable GitHub Pages from the repository's root folder. Branch-based Pages publishing does not run the generator automatically. This site uses hash-based navigation (`#/blog`) so direct links do not require special server rewrite rules.

## Notes

- Language and theme preferences persist locally in your browser. Chinese and English versions are included.
- The navigation and articles work without third-party JavaScript libraries.
- Article Markdown rendering deliberately supports a small subset (headings, bold, italic, links, lists, blockquotes, and code blocks). It escapes raw HTML to help prevent accidental script injection.
- There is no data collection, analytics or contact form. Contact is by configurable external links / email.
- Page description is maintained in `index.html`. Article URLs use hash navigation; article-specific social previews are not provided.
- Please review all biographical copy before publishing and remove information you do not want public.
