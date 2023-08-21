import '@/styles/tailwind.css';
import { Kreon } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import getUrl from '@/lib/getUrl';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Script from 'next/script';
import StarFrame from '@/components/StarFrame';

// Font files can be colocated inside of `app`
const freeLunch = localFont({
  src: './FreeLunch-Rough.woff2',
  display: 'swap',
  variable: '--font-free-lunch',
});

const bodyFont = Kreon({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const baseUrl = getUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    template: '%s ~ Dan Ott',
    default: 'Full-Stack Design and Development ~ Dan Ott',
  },
  manifest: '/site.webmanifest',

  description: `Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
  alternates: {
    canonical: 'https://danott.dev',
    types: {
      'application/rss+xml': `${baseUrl}/rss/feed.xml`,
      'application/feed+json': `${baseUrl}/rss/feed.json`,
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@danieltott',
    creator: '@danieltott',
  },
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${bodyFont.variable} ${freeLunch.variable} font-serif`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />
      </head>
      {process.env.NODE_ENV === 'production' && (
        <Script
          data-domain="danott.dev"
          data-api="/stats/api/event"
          src="/stats/js/script.js"
        />
      )}

      <body className="overflow:hidden relative flex min-h-full flex-col bg-east-bay-50 dark:bg-east-bay-950">
        <StarFrame />

        <div className="fixed inset-0 z-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-300/20" />
          </div>
        </div>
        <div className="fixed inset-0 z-20 flex justify-center opacity-70 sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-300/20" />
          </div>
        </div>
        <div className="relative z-30 flex flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
