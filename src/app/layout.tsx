import '@/styles/tailwind.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Kreon } from 'next/font/google';
import Stars from '@/components/Stars';
import Script from 'next/script';
import localFont from 'next/font/local';

// Font files can be colocated inside of `app`
const freeLunch = localFont({
  src: './FreeLunch-Regular.otf',
  display: 'swap',
  variable: '--font-free-lunch',
});

const bodyFont = Kreon({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// FreeLunch-Regular.otf

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'https://dtott.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    template: '%s ~ Dan Ott',
    default: 'Full-Stack Design and Development ~ Dan Ott',
  },
  manifest: '/site.webmanifest',

  description: `Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
  alternates: {
    canonical: 'https://dtott.com',
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
      className={`h-full antialiased ${bodyFont.variable} ${freeLunch.variable}  font-serif`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeScript }} />

        {process.env.NODE_ENV === 'production' && (
          <Script
            data-domain="dtott.com"
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </head>
      <body className="relative flex min-h-full flex-col bg-east-bay-50 dark:bg-east-bay-950">
        <svg>
          <defs>
            <symbol id="starSvg" viewBox="0 0 24 24">
              <path
                strokeWidth={1}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </symbol>
          </defs>
        </svg>

        <Stars />
        <Stars flip />

        <div className="fixed inset-0 z-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-300/20" />
          </div>
        </div>
        <div className="fixed inset-0 z-20 flex justify-center opacity-90 sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-stone-100 dark:bg-stone-900 dark:ring-stone-300/20" />
          </div>
        </div>
        <div className="relative z-30">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
