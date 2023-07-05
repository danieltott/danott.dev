import type { ImageResponseOptions } from 'next/server';
import type { ArticleMeta } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getThoughtsMeta(slug: string) {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../../content/${slug.split('thoughts/')[1]}.mdx`);

  return meta;
}

export function getPageMeta(slug: string) {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../${slug}/page.tsx`);

  return meta;
}

export function getMetaAndOptions(slug: string) {
  let meta: ArticleMeta;

  // src/app/social/[...slug]/util.ts
  // src/content/a-sass-mixin-for-long-shadows-2013-07-03.mdx

  if (slug.startsWith('thoughts/')) {
    meta = getThoughtsMeta(slug);
  } else {
    meta = getPageMeta(slug);
  }

  const freeLunch = readFileSync(
    join(process.cwd(), 'src', 'app', 'FreeLunch-Regular.otf')
  );
  const kreon = readFileSync(
    join(process.cwd(), 'src', 'app', 'Kreon-Medium.ttf')
  );

  const ret: {
    meta: ArticleMeta;
    options: ImageResponseOptions;
  } = {
    meta,
    options: {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'FreeLunch',
          data: freeLunch,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Kreon',
          data: kreon,
          weight: 400,
          style: 'normal',
        },
      ],
      // debug: true,

      // // Options that will be passed to the HTTP response
      // status?: number = 200
      // statusText?: string
      // headers?: Record<string, string>
    },
  };

  return ret;
}
