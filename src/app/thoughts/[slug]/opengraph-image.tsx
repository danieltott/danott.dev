import { ImageResponse } from 'next/server';
import { getAllArticles } from '@/lib/getAllArticles';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getMetaAndOptions } from '@/lib/socialImages';

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((articles) => ({
    slug: articles.slug,
  }));
}

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function GET({ params }: { params: { slug: string } }) {
  try {
    const { meta, options } = await getMetaAndOptions(
      `thoughts/${params.slug}`
    );

    console.log({ murl: import.meta.url });

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
