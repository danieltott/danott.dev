import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Kreon } from 'next/font/google';
import Script from 'next/script';
import localFont from 'next/font/local';
import StarFrame from '@/components/StarFrame';

// Font files can be colocated inside of `app`
const freeLunch = localFont({
  src: '../FreeLunch-Regular.otf',
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
  'https://danott.dev';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          data-domain="dtott.com"
          src="https://plausible.io/js/plausible.js"
        />
      )}

      <body className="relative flex min-h-full flex-col bg-east-bay-50 dark:bg-east-bay-950">
        <StarFrame />

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
        <div className="relative z-30 flex flex-1 flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </>
  );
}
