import { Feed } from 'feed';
import getUrl from '@/lib/getUrl';
import { getAllArticles } from '@/lib/getAllArticles';

export async function getFeed(type: 'rss' | 'json') {
  const articles = await getAllArticles();
  const siteUrl = getUrl();
  const author = {
    name: 'Dan Ott',
  };

  const feed = new Feed({
    title: author.name,
    description:
      'All of my long-form thoughts on front-end, full-stack, design, development, and more, collected in chronological order since 2007.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/thoughts/feed.xml`,
      json: `${siteUrl}/thoughts/feed.json`,
    },
  });

  for (const article of articles) {
    const url = `${siteUrl}/thoughts/${article.slug}`;
    const html = article.summary;

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    });
  }

  if (type === 'rss') {
    return new Response(feed.rss2(), {
      headers: {
        'content-type': 'application/rss+xml; charset=utf-8',
      },
    });
  } else if (type === 'json') {
    return new Response(feed.json1(), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });
  }
}
