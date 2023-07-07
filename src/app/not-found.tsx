import Link from 'next/link';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import StarFrame from '@/components/StarFrame';
import { Container } from '@/components/Container';

// FreeLunch-Regular.otf

export default function NotFound() {
  return (
    <>
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
          <Container className="mt-16 sm:mt-32">
            <main className="grid min-h-full place-items-center">
              <div className="text-center">
                <p className="link-colors text-base font-semibold">404</p>
                <h1 className="font-title mt-4">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Sorry, couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/"
                    className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Go back home
                  </Link>
                </div>
              </div>
            </main>
          </Container>
          <Footer />
        </div>
      </body>
    </>
  );
}
