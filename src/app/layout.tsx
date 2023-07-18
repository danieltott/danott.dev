import '@/styles/tailwind.css';
import { Kreon } from 'next/font/google';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import getUrl from '@/lib/getUrl';

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
      {children}
    </html>
  );
}
