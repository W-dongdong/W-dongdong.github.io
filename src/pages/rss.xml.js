import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'WU Yandong — 学习笔记',
    description: '机器人 / 嵌入式 / 控制系统的学习笔记',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? '',
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
    })),
  });
}
