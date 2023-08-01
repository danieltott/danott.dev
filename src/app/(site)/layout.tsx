import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const StarFrame = dynamic(() => import('@/components/StarFrame'), {
  ssr: false,
  loading: () => null,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          data-domain="danott.dev"
          src="https://plausible.io/js/plausible.js"
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
    </>
  );
}
