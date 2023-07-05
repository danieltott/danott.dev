import { type NextRequest, ImageResponse } from 'next/server';
import { getAllArticles } from '@/lib/getAllArticles';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getMetaAndOptions } from '../util';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((articles) => ({
    slug: articles.slug,
  }));
}

export default async function Preview({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { meta, options } = getMetaAndOptions(params.slug);

    return (
      <div
        style={{
          position: 'fixed',
          background: '#fff',
          inset: 0,
          zIndex: 999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: options.width,
            height: options.height,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <SocialCard meta={meta} preview />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
