import { StarSvg } from '@/components/Star';
import { type NextRequest, ImageResponse } from 'next/server';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const articles = await getAllArticles();

//   return articles.map((articles) => ({
//     slug: articles.slug,
//   }));
// }

const thing = (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      padding: '60px',
      color: '#57534e',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
      }}
    >
      {Array.from({ length: 400 }).map((_, i) => (
        <StarSvg key={i} randomScaleMin={0.2} randomize />
      ))}
    </div>
  </div>
);

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string[] };
  }
) {
  try {
    return new ImageResponse(thing, {
      width: 1600,
      height: 1600,
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
