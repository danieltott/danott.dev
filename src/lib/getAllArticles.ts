import glob from 'fast-glob';
import * as path from 'path';
import type { ArticleMeta, ArticleListItem } from '@/lib/types';

async function importArticle(
  articleFilename: string
): Promise<ArticleListItem> {
  const {
    meta,
    summary,
    tags,
  }: { meta: ArticleMeta; summary: string; tags?: string[] } = await import(
    `../content/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    summary,
    tags,
  };
}

export async function getAllArticles(
  limit?: number
): Promise<ArticleListItem[]> {
  const articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/content'),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit || articles.length);
}
