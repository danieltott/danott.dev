import type { ImageResponseOptions } from 'next/server';
import type { ArticleMeta } from '@/lib/types';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getMetaAndOptions(slug: string) {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../../../../content/${slug}.mdx`);

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
