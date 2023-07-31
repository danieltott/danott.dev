'use client';

import { Fragment, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Container } from '@/components/Container';
import avatarImage from '@/images/avatar.jpg';
import type { SvgElementProps, LinkHref } from '@/lib/types';
import { GitHubIcon } from './SocialIcons';

function CloseIcon(props: SvgElementProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: SvgElementProps) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon(props: SvgElementProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  );
}

function MoonIcon(props: SvgElementProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavItem({
  href,
  children,
}: {
  href: LinkHref;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  );
}

function MobileNavigation({isHomePage, ...props}: React.ComponentProps<typeof Popover> & { isHomePage: boolean  }) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-stone-800 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-east-bay-950/90 dark:text-stone-200 dark:ring-white/10 dark:hover:ring-white/20 md:text-base lg:text-lg">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-stone-500 group-hover:stroke-stone-700 dark:group-hover:stroke-stone-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-stone-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-stone-900/5 dark:bg-east-bay-950 dark:ring-stone-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-stone-500 dark:text-stone-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-stone-600 dark:text-stone-400 md:text-base lg:text-lg">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-stone-100 text-base text-stone-800 dark:divide-stone-100/5 dark:text-stone-300 md:text-lg lg:text-xl">
                {!isHomePage && <MobileNavItem href="/">Home</MobileNavItem>}
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/thoughts">Thoughts</MobileNavItem>
                <MobileNavItem href="/projects">Projects</MobileNavItem>
                <MobileNavItem href="/speaking">Speaking</MobileNavItem>
                <MobileNavItem href="/uses">Uses</MobileNavItem>
                <MobileNavItem href="https://github.com/danieltott/danott.dev">
                  <div className="flex items-center gap-2">
                    <GitHubIcon className="h-6 w-6 fill-current" />
                    <span>GitHub</span>
                  </div>
                </MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function NavItem({
  href,
  children,
}: {
  href: LinkHref;
  children: React.ReactNode;
}) {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 text-sm font-medium transition',
          isActive ? 'link-colors' : 'link-hover-colors'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/40 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0" />
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation({isHomePage, ...props}: React.ComponentProps<'nav'>& { isHomePage: boolean  }) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-stone-800 shadow-lg shadow-east-bay-800/5 ring-1 ring-east-bay-900/5 backdrop-blur dark:bg-east-bay-950/90 dark:text-stone-200 dark:ring-white/10 md:text-base lg:text-lg">
        {!isHomePage && <NavItem href="/">Home</NavItem>}
        <NavItem href="/about">About</NavItem>
        <NavItem href="/thoughts">Thoughts</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/speaking">Speaking</NavItem>
        <NavItem href="/uses">Uses</NavItem>
        <NavItem href="https://github.com/danieltott/danott.dev">
          <GitHubIcon className="h-6 w-6 fill-current" />
          <span className="sr-only">GitHub</span>
        </NavItem>
      </ul>
    </nav>
  );
}

function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none');
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle('dark');

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-east-bay-800/5 ring-1 ring-east-bay-900/5 backdrop-blur transition dark:bg-east-bay-950/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-stone-100 stroke-stone-500 transition group-hover:fill-stone-200 group-hover:stroke-stone-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-primary-50 [@media(prefers-color-scheme:dark)]:stroke-primary-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-primary-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-primary-600" />
      <MoonIcon className="hidden h-6 w-6 fill-stone-700 stroke-stone-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-stone-400 [@media_not_(prefers-color-scheme:dark)]:fill-primary-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-primary-500" />
    </button>
  );
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

function AvatarContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-stone-800/5 ring-1 ring-stone-900/5 backdrop-blur dark:bg-stone-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  );
}

function Avatar({
  large = false,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href' | 'aria-label'> & {
  large?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-stone-100 object-cover dark:bg-stone-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  );
}

export function Header() {
  const isHomePage = usePathname() === '/';

  const headerRef = useRef<HTMLDivElement>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const downDelay = 0;
    const upDelay = 64;

    function setProperty(property: string, value: string | number) {
      document.documentElement.style.setProperty(property, `${value}`);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      if (headerRef.current) {
        const { top, height } = headerRef.current.getBoundingClientRect();
        const scrollY = clamp(
          window.scrollY,
          0,
          document.body.scrollHeight - window.innerHeight
        );

        if (isInitial.current) {
          setProperty('--header-position', 'sticky');
        }

        setProperty('--content-offset', `${downDelay}px`);

        if (isInitial.current || scrollY < downDelay) {
          setProperty('--header-height', `${downDelay + height}px`);
          setProperty('--header-mb', `${-downDelay}px`);
        } else if (top + height < -upDelay) {
          const offset = Math.max(height, scrollY - upDelay);
          setProperty('--header-height', `${offset}px`);
          setProperty('--header-mb', `${height - offset}px`);
        } else if (top === 0) {
          setProperty('--header-height', `${scrollY + height}px`);
          setProperty('--header-mb', `${-scrollY}px`);
        }

        if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
          setProperty('--header-inner-position', 'fixed');
          removeProperty('--header-top');
          removeProperty('--avatar-top');
        } else {
          removeProperty('--header-inner-position');
          setProperty('--header-top', '0px');
          setProperty('--avatar-top', '0px');
        }
      }
    }

    function updateStyles() {
      updateHeaderStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);

    return () => {
      window.removeEventListener('scroll', updateStyles);
      window.removeEventListener('resize', updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={
            {
              position: 'var(--header-position)',
            } as unknown as React.CSSProperties
          }
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={
              {
                position: 'var(--header-inner-position)',
              } as unknown as React.CSSProperties
            }
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation isHomePage={isHomePage} className="pointer-events-auto text-sm md:hidden" />
                <DesktopNavigation isHomePage={isHomePage} className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
