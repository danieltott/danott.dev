import '@/styles/tailwind.css';
// import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// const inter = Inter({ subsets: ['latin'] });

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

export const metadata: Metadata = {
  title: {
    template: '%s ~ Dan Ott',
    default: 'Full-Stack Design and Development ~ Dan Ott',
  },
  description: `Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
  alternates: {
    canonical: 'https://dtott.com',
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`,
      'application/feed+json': `${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </>
      </body>
    </html>
  );
}
