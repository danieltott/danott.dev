import { Card } from '@/components/Card';
import { SimplePage } from '@/components/SimplePage';
import { formatDate } from '@/lib/formatDate';
import { getAllArticles } from '@/lib/getAllArticles';
import { ArticleListItem } from '@/lib/types';
import { Metadata } from 'next';

function Article({ article }: { article: ArticleListItem }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/thoughts/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export const metadata: Metadata = {
  title: `Thoughts on Javascript, React, CSS, and more`,
  description:
    'All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007.',
};

export default async function ArticlesIndex() {
  const articles = await getAllArticles();
  return (
    <>
      <SimplePage
        title="Writing on full-stack design and development."
        intro="All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimplePage>
    </>
  );
}
