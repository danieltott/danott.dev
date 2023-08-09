import { ImageResponse } from 'next/server';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getMetaAndOptions } from '@/lib/socialImages';

export const dynamicParams = false;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export const dynamic = 'force-static';
export const revalidate = 60 * 60 * 24 * 7; // 1 week

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
