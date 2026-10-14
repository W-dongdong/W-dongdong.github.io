/**
 * Multi-page series. This file is the single source of truth for the reading
 * order: the sidebar rail, the series home page's contents list and the
 * prev/next pager are all derived from it.
 *
 * Adding a page means creating the content file under
 * `src/content/writing/<series>/` and adding an entry here, in the order it
 * should be read. Keep each `title` in step with that file's frontmatter
 * title — the rail and the page heading should read the same.
 */

export interface SeriesPage {
  title: string;
  href: string;
  /** One line shown next to the page on the series home. */
  blurb?: string;
}

/** A labelled set of pages, e.g. "PID 控制基础" over its three chapters. */
export interface SeriesGroup {
  title: string;
  /** The group's own page, if it has one — the label links there. */
  href?: string;
  pages: SeriesPage[];
}

export type SeriesNode = SeriesPage | SeriesGroup;

export interface Series {
  title: string;
  blurb: string;
  /** The series' landing page — where a reader starts. */
  href: string;
  nodes: SeriesNode[];
}

const isGroup = (node: SeriesNode): node is SeriesGroup => 'pages' in node;
export { isGroup };

export const seriesList: Series[] = [
  {
    title: 'Easy PID',
    blurb: '用物理直觉理解 PID 控制',
    href: '/writing/easy-pid/',
    nodes: [
      {
        title: '前言',
        href: '/writing/easy-pid/',
        blurb: '这一系列想做什么，以及为什么用物理直觉而不是数学来讲。',
      },
      {
        title: 'PID 控制基础',
        pages: [
          {
            title: '比例控制（P）',
            href: '/writing/easy-pid/proportional/',
            blurb: '从洗澡调水温讲起：知道什么是闭环控制之后，让推力和误差成正比，就得到了 P 控制。',
          },
          {
            title: '积分控制（I）',
            href: '/writing/easy-pid/integral/',
            blurb: '把误差随时间累加起来，解决 P 控制过不去的静态误差。',
          },
          {
            title: '微分控制（D）',
            href: '/writing/easy-pid/derivative/',
            blurb: '给系统加上阻尼，压掉 PI 留下的超调，最后说怎么调这三个参数。',
          },
        ],
      },
      {
        title: '前馈 PID',
        href: '/writing/easy-pid/feedforward/',
        blurb: '在误差出现之前先出力。',
      },
      {
        title: '串级 PID',
        href: '/writing/easy-pid/cascade/',
        blurb: '一个环套一个环。',
      },
    ],
  },
];

/** Every page of a series in reading order, starting at the opening page. */
export function seriesPages(series: Series): SeriesPage[] {
  return series.nodes.flatMap((node) => (isGroup(node) ? node.pages : [node]));
}

/** The nodes a series' own page lists — it does not list itself. */
export function seriesContents(series: Series): SeriesNode[] {
  return series.nodes.filter(
    (node) => !(!isGroup(node) && normalise(node.href) === normalise(series.href)),
  );
}

/** Trailing slashes and `#fragments` should not affect a path comparison. */
function normalise(path: string): string {
  const bare = path.replace(/[?#].*$/, '').replace(/\/+$/, '');
  return bare === '' ? '/' : bare;
}

/** The series a page belongs to, if any. */
export function seriesForPath(pathname: string): Series | undefined {
  const path = normalise(pathname);
  return seriesList.find((s) => seriesPages(s).some((p) => normalise(p.href) === path));
}

export function isSeriesHome(series: Series, pathname: string): boolean {
  return normalise(series.href) === normalise(pathname);
}

/** The pages either side of `pathname`, for the pager at the foot of a page. */
export function seriesNeighbours(
  series: Series,
  pathname: string,
): { prev?: SeriesPage; next?: SeriesPage } {
  const pages = seriesPages(series);
  const path = normalise(pathname);
  const i = pages.findIndex((p) => normalise(p.href) === path);
  if (i === -1) return {};
  return { prev: pages[i - 1], next: pages[i + 1] };
}

/**
 * True for a series' chapter pages — those are reached through the rail and
 * the pager, so the writing index and the RSS feed list only the page each
 * series opens on.
 */
export function isChapterEntryId(id: string): boolean {
  const path = normalise(`/writing/${id}/`);
  return seriesList.some((s) =>
    seriesPages(s).some((p) => normalise(p.href) === path && normalise(p.href) !== normalise(s.href)),
  );
}
