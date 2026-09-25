# WU Yandong — 个人网站

WU Yandong 的个人网站：简历、项目与学习笔记（机器人 / 嵌入式 / 控制系统）。

## 技术栈

- [Astro](https://astro.build) 5（静态站点生成）
- [Tailwind CSS](https://tailwindcss.com) 4
- [KaTeX](https://katex.org)（数学公式渲染，remark-math + rehype-katex）
- GitHub Pages（GitHub Actions 自动部署）

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器（默认 http://localhost:4321）
npm run build    # 构建到 dist/
npm run preview  # 预览已构建的站点
```

## 新增博客 / 项目

- 博客：在 `src/content/blog/` 下新建 `.md` 文件，按现有文件的 frontmatter 模板填写即可。博客可设置 `lang: en` 或 `lang: zh`。
- 项目：在 `src/content/projects/` 下新建 `.md` 文件，同样按现有 frontmatter 模板填写。

字段说明（博客）：`title`（必填）、`pubDate`（必填）、`description`、`tags`、`lang`（en|zh）、`draft`（草稿，为 `true` 时不发布）。项目需填写 `title`、`date` 等字段，详见 `src/content.config.ts`。

## 上线部署

1. 在 GitHub 网页端新建一个名为 `W-dongdong.github.io` 的空仓库。
   - **注意**：首次 push 前先在网页端创建空仓库，不要勾选「Initialize this repository with a README」。
2. 本地推送到 main 分支：

   ```bash
   git push -u origin main
   ```

3. 打开仓库 **Settings → Pages**，将 **Source** 选为 **GitHub Actions**。

之后每次 push 到 main 分支都会自动构建并部署（见 `.github/workflows/deploy.yml`）。
