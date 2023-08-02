import ArticleList, { getArticles, PER_PAGE } from '@/components/ArticleList';
import { getAllArticles } from '@/lib/getAllArticles';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thoughts on Javascript, React, CSS, and more`,
  description:
    'All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007.',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const pages = Math.ceil(articles.length / PER_PAGE);

  return Array.from({ length: pages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function ArticlesIndex({
  params,
}: {
  params: { page: string };
}) {
  const articles = await getArticles(params.page);

  return <ArticleList articles={articles} />;
}
