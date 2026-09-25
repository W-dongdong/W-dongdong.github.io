# WU Yandong — Personal Website

WU Yandong's personal website: résumé and projects (robotics / embedded systems / control systems).

## Tech Stack

- [Astro](https://astro.build) 5 (static site generation)
- [Tailwind CSS](https://tailwindcss.com) 4
- [KaTeX](https://katex.org) (math rendering, remark-math + rehype-katex)
- GitHub Pages (automatic deployment via GitHub Actions)

## Local Development

```bash
npm install      # install dependencies
npm run dev      # start the dev server (default http://localhost:4321)
npm run build    # build to dist/
npm run preview  # preview the built site
```

## Adding a Project

- Create a new `.md` file under `src/content/projects/` and fill in the frontmatter following the existing files.

Field reference (projects): `title` (required), `date` (required), `summary`, `tags`, `repo`, `demo`, `featured`, and `status`. See `src/content.config.ts` for details.

## Deployment

1. Create an empty repository named `W-dongdong.github.io` on the GitHub website.
   - **Note**: create the empty repository on the web before your first push, and do not check "Initialize this repository with a README".
2. Push locally to the main branch:

   ```bash
   git push -u origin main
   ```

3. Open the repository **Settings → Pages** and set **Source** to **GitHub Actions**.

After that, every push to the main branch will build and deploy automatically (see `.github/workflows/deploy.yml`).
