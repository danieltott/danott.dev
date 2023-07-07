import { ImageResponse } from 'next/server';
import { notFound } from 'next/navigation';
import SocialCard from '@/components/SocialCard';
import { getOptions } from '@/lib/socialImages';
import { metadata } from './(site)/page';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export const dynamic = 'force-static';

export default async function GET() {
  try {
    const options = await getOptions();

    const element = <SocialCard meta={metadata} />;

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
