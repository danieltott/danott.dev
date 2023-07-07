import type { ImageResponseOptions } from 'next/server';
import type { ArticleMeta } from '@/lib/types';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Metadata } from 'next';

export function getThoughtsMeta(slug: string) {
  const {
    meta,
  }: {
    meta: ArticleMeta;
  } = require(`../content/${slug.split('thoughts/')[1]}.mdx`);

  return meta;
}

export function getPageMeta(slug: string | undefined) {
  if (!slug) {
    const {
      metadata,
    }: {
      metadata: Metadata;
    } = require(`../app/(site)/page.tsx`);

    return metadata;
  }

  const {
    metadata,
  }: {
    metadata: Metadata;
  } = require(`../app/(site)/${slug}/page.tsx`);

  return metadata;
}

const freeLunchPr = readFile(
  join(process.cwd(), 'src', 'app', 'FreeLunch-Regular.otf')
);
const kreonPr = readFile(join(process.cwd(), 'src', 'app', 'Kreon-Medium.ttf'));

export async function getOptions(): Promise<ImageResponseOptions> {
  const [freeLunch, kreon] = await Promise.all([freeLunchPr, kreonPr]);

  return {
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
  };
}

export async function getMetaAndOptions(slug: string | undefined) {
  let meta: ArticleMeta | Metadata;

  if (slug?.startsWith('thoughts/')) {
    meta = getThoughtsMeta(slug);
  } else {
    meta = getPageMeta(slug);
  }

  const options = await getOptions();

  const ret: {
    meta: ArticleMeta | Metadata;
    options: ImageResponseOptions;
  } = {
    meta,
    options,
  };

  return ret;
}
