import Link from 'next/link';
import Title from '@/components/Title';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center">
      <div className="text-center">
        <p className="link-colors text-base font-semibold">404</p>
        <Title className="mt-4">Page not found</Title>
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
  );
}
