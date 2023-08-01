import Link from 'next/link';
import type { LinkHref } from '@/lib/types';
import { Container } from '@/components/Container';
import { GitHubIcon } from './SocialIcons';

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
      className="link-colors link-hover-colors text-above-stars"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-east-bay-50/50 pb-16 pt-10 dark:border-east-bay-700/30">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-medium text-stone-800 dark:text-stone-200 md:text-base lg:text-lg">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/thoughts">Thoughts</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/speaking">Speaking</NavLink>
                <NavLink href="/uses">Uses</NavLink>
                <NavLink href="https://github.com/danieltott/danott.dev">
                  <GitHubIcon className="h-6 w-6 fill-current" />
                  <span className="sr-only">GitHub</span>
                </NavLink>
              </div>
              <p className="text-sm text-east-bay-700 dark:text-east-bay-400 md:text-base lg:text-lg">
                <span className="text-above-stars">
                  &copy; {new Date().getFullYear()} Daniel T Ott, LLC. All
                  rights reserved.
                </span>
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
