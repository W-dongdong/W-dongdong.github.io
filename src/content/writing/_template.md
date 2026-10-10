---
title: "Template — copy this file to start a piece"
description: "One or two sentences. Shows on the list card, in the article header, and in search results."
date: 2026-10-10
tags: ["Example"]
draft: true
---

`draft: true` keeps this file off the site completely: it is not in the
`/writing` list, not in `/rss.xml`, and does not get a page of its own.

It exists for two reasons. It documents the frontmatter by example, and it keeps
the collection non-empty — with no `.md` files at all, Astro logs a build
warning that reads like a config error.

To publish a piece: copy this file, rename it to the URL you want
(`so3-attitude.md` becomes `/writing/so3-attitude/`), and set `draft: false`.

Notes
-----
* Markdown throughout. Math works: `$inline$` and `$$display$$` render via KaTeX.
* A `## Heading` picks up the site's section styling automatically.
* Link to your own pages normally, e.g.
  `[my PX4 controller](/projects/so3-quadrotor-control/)`.
* The site is set in IBM Plex Sans / Plex Mono, loaded as Latin subsets only.
  Chinese text falls back to a system font, so it will not match the rest of the
  page. Adding a CJK webfont is possible but they run to several megabytes.
