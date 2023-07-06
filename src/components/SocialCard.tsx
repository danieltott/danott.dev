import { StarSvg } from '@/components/Star';
import { formatDate } from '@/lib/formatDate';
import { ArticleMeta } from '@/lib/types';
import { Metadata } from 'next';

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
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <StarSvg key={i} randomScaleMin={0.2} randomize />
        ))}
      </div> */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          backgroundColor: '#0F171F',
          opacity: 0.9,
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
        <div
          style={{
            fontFamily: preview ? undefined : 'FreeLunch',
            backgroundImage:
              'linear-gradient(to right, rgb(118, 153, 190), rgb(162, 175, 97), rgb(252, 97, 18) 70%)',
            backgroundClip: 'text',
            color: 'rgba(0, 0, 0, 0)',
            fontFeatureSettings: '"calt", "dlig", "liga"',
            fontSize: '100px',
            letterSpacing: '-1.5px',
            lineHeight: 1,
            paddingRight: 90,
          }}
          className={preview ? 'font-freeLunch' : undefined}
        >
          {`${meta.title}`}
        </div>

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
          <div>dtott.com</div>
          {'date' in meta && meta.date && <div>{formatDate(meta.date)}</div>}
        </div>
      </div>
    </div>
  );
}
