import { type SVGProps } from 'react';
import type Link from 'next/link';
import type { Metadata } from 'next';

export type SvgElementProps = SVGProps<SVGSVGElement>;
export type LinkProps = React.ComponentProps<typeof Link>;
export type LinkHref = LinkProps['href'];

export type ArticleMeta = {
  title: string;
  description: string;
  date: string;
  dateUpdated: string;
};

export type ArticleListItem = ArticleMeta & {
  slug: string;
  summary: string;
  tags?: string[];
};
