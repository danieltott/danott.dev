import ArticleList, { getArticles } from '@/components/ArticleList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Thoughts on Javascript, React, CSS, and more`,
  description:
    'All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007.',
};

export default async function ArticlesIndex() {
  const articles = await getArticles();

  return <ArticleList articles={articles} />;
}
