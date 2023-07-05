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

export const metadata: Metadata = {
  title: {
    template: '%s ~ Dan Ott',
    default: 'Full-Stack Design and Development ~ Dan Ott',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: ['/favicon-32x32.png', '/favicon-16x16.png'],
    apple: '/apple-touch-icon.png',
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
    <html
      lang="en"
      className={`h-full antialiased ${bodyFont.variable} ${freeLunch.variable}  font-serif`}
    >
      <head>
        <Script id="darkmodetoggling">
          {`
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
`}
        </Script>
        {process.env.NODE_ENV === 'production' && (
          <Script
            data-domain="dtott.com"
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </head>
      <body className="relative flex min-h-full flex-col bg-east-bay-50 dark:bg-east-bay-950">
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
