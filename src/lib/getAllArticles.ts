import glob from 'fast-glob';
import * as path from 'path';
import type { ArticleMeta, ArticleListItem } from '@/lib/types';

async function importArticle(
  articleFilename: string
): Promise<ArticleListItem> {
  let { meta, summary }: { meta: ArticleMeta; summary: React.ReactNode } =
    await import(`../app/thoughts/${articleFilename}`);
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    summary,
  };
}

export async function getAllArticles(
  limit?: number
): Promise<ArticleListItem[]> {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/app/thoughts'),
  });

  let articles = await Promise.all(articleFilenames.map(importArticle));

  return articles
    .slice(0, limit || articles.length)
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime());
}
