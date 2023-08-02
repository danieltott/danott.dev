import Link from 'next/link';
import clsx from 'clsx';
import type { SvgElementProps } from '@/lib/types';

export default function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: React.ComponentProps<typeof Link> & {
  icon: React.ComponentType<SvgElementProps>;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="link-hover-colors group flex text-sm font-medium text-stone-800  transition dark:text-stone-200"
      >
        <Icon className="h-6 w-6 flex-none fill-stone-500 transition group-hover:fill-current" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}
