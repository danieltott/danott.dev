import { type SVGProps } from 'react';
import type Link from 'next/link';

export type SvgElementProps = SVGProps<SVGSVGElement>;
export type LinkHref = React.ComponentProps<typeof Link>['href'];
