import Link from 'next/link';
import type { LinkHref } from '@/lib/types';
import { Container } from '@/components/Container';

function NavLink({
  href,
  children,
}: {
  href: LinkHref;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-primary-500 dark:hover:text-primary-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-stone-100 pb-16 pt-10 dark:border-stone-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-stone-800 dark:text-stone-200 md:text-base lg:text-lg">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/thoughts">Thoughts</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/speaking">Speaking</NavLink>
              </div>
              <p className="text-sm text-stone-400 dark:text-stone-500 md:text-base lg:text-lg">
                &copy; {new Date().getFullYear()} Daniel T Ott, LLC. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
