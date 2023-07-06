import { Feed } from 'feed';

import { getAllArticles } from '@/lib/getAllArticles';

export async function getFeed(type: 'rss' | 'json') {
  let articles = await getAllArticles();
  let siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    'https://dtott.com';
  let author = {
    name: 'Dan Ott',
  };

  let feed = new Feed({
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

  for (let article of articles) {
    let url = `${siteUrl}/thoughts/${article.slug}`;
    let html = article.summary;

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
