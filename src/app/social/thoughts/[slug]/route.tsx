import { type NextRequest, ImageResponse } from 'next/server';
import { getAllArticles } from '@/lib/getAllArticles';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getMetaAndOptions } from './util';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((articles) => ({
    slug: articles.slug,
  }));
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  try {
    const { meta, options } = getMetaAndOptions(params.slug);

    const element = <SocialCard meta={meta} />;

    return new ImageResponse(element, {
      ...options,
      // debug: true,

      // // Options that will be passed to the HTTP response
      // status?: number = 200
      // statusText?: string
      // headers?: Record<string, string>
    });
  } catch (error) {
    console.log(error);
    notFound();
  }
}
