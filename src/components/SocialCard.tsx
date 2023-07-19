import { formatDate } from '@/lib/formatDate';
import type { ArticleMeta } from '@/lib/types';
import { type Metadata } from 'next';
import { fillColors, random, randomRotate, getRandom } from './star-util';

const svgContents = (
  <path
    strokeWidth={1}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
  />
);

const Star = ({ l, t }: { l: number; t: number }) => {
  const size = getRandom(16, 100, 0);

  return (
    <svg
      viewBox="0 0 24 24"
      fill={random(fillColors)}
      style={{
        position: 'absolute',
        top: random([getRandom(0, t, 0)]),
        left: getRandom(0, l, 0),
        height: size,
        width: size,
        transform: `rotate(${randomRotate(false)})`,
      }}
    >
      {svgContents}
    </svg>
  );
};

export default function SocialCard({
  meta,
  preview,
}: {
  meta: ArticleMeta | Metadata;
  preview?: boolean;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        backgroundColor: 'rgb(215 225 236)',
        padding: '60px',
        color: '#57534e',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 60,
        }}
      >
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 570,
          left: 0,
          width: 1200,
          height: 60,
        }}
      >
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
        <Star l={1200} t={60} />
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 60,
          height: 630,
        }}
      >
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: 1140,
          width: 60,
          height: 630,
        }}
      >
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
        <Star l={60} t={630} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          backgroundColor: '#0F171F',
          opacity: 0.8,
          borderRadius: '10px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          padding: '30px 30px 15px',
          position: 'relative',
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontFamily: preview ? undefined : 'FreeLunch',
            backgroundImage:
              'linear-gradient(to right, rgb(118, 153, 190), rgb(162, 175, 97), rgb(252, 97, 18) 70%)',
            backgroundClip: 'text',
            color: 'rgba(0, 0, 0, 0)',
            fontFeatureSettings: '"calt", "dlig", "liga"',
            fontSize: `${meta.title}`.length > 50 ? '75px' : '100px',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            paddingRight: 90,
            lineClamp: '3 "…"',
            display: 'block',
            margin: 0,
          }}
          className={preview ? 'font-freeLunch' : undefined}
        >
          {`${meta.title}`}
        </p>

        <p
          style={{
            color: 'rgb(214, 211, 209)',
            fontSize: '28px',
            lineHeight: 1.6,
            lineClamp: '3 "…"',
            display: 'block',
            fontFamily: preview ? undefined : 'Kreon',
            margin: 0,
          }}
          className={preview ? 'font-serif' : undefined}
        >
          {meta.description}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'rgb(214, 211, 209)',
            fontSize: '16px',
            lineHeight: 1,
            fontFamily: preview ? undefined : 'Kreon',
          }}
          className={preview ? 'font-serif' : undefined}
        >
          <div>Dan Ott</div>
          <div>danott.dev</div>
          {'date' in meta && meta.date && <div>{formatDate(meta.date)}</div>}
        </div>
      </div>
    </div>
  );
}
