import { StarSvg } from '@/components/Star';

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const articles = await getAllArticles();

//   return articles.map((articles) => ({
//     slug: articles.slug,
//   }));
// }

export default async function GET() {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        padding: '60px',
        color: '#57534e',
        backgroundColor: 'rgb(215 225 236)',
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
        {Array.from({ length: 300 }).map((_, i) => (
          <StarSvg key={i} randomScaleMin={0.2} randomize />
        ))}
      </div>
    </div>
  );
}
