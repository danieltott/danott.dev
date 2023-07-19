import Link from 'next/link';
import clsx from 'clsx';
import type { LinkHref, LinkProps } from '@/lib/types';
import { Prose } from './Prose';
import Star from './Star';
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid';

interface AsProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

export function Card<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
}: AsProps<T> & { className?: string }) {
  const Component = as || 'div';

  return (
    <Component
      className={clsx(
        className,
        'text-above-stars group relative flex flex-col items-start'
      )}
    >
      {children}
    </Component>
  );
}

Card.Link = function CardLink({ children, ...props }: LinkProps) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-stone-50/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-stone-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle<T extends React.ElementType = 'h2'>({
  as,
  href,
  children,
}: AsProps<T> & { href?: LinkHref }) {
  const Component = as || 'h2';
  return (
    <Component className="font-heading text-lg md:text-xl lg:text-2xl">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Prose className="relative z-10 mt-2 prose-p:leading-normal" small>
      {children}
    </Prose>
  );
};

Card.Cta = function CardCta({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: LinkHref;
}) {
  const props = {
    className: clsx(
      'relative z-10 mt-4 flex items-center text-sm md:text-base lg:text-lg',
      href ? 'text-link' : 'link-colors font-medium'
    ),

    children: (
      <>
        {children}
        <ArrowSmallRightIcon className="ml-1 h-4 w-4 stroke-current" />
      </>
    ),
  };

  if (href) {
    return <Link href={href} {...props} />;
  }
  return <div aria-hidden="true" {...props} />;
};

Card.Eyebrow = function CardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: AsProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProps<T>> & {
    decorate?: boolean;
  }) {
  const Component = as || 'p';

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center gap-1 text-xs font-medium text-east-bay-700 dark:text-east-bay-300 md:text-sm'
      )}
      {...props}
    >
      {decorate && <Star randomFill />}
      {children}
    </Component>
  );
};
