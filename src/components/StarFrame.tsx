'use client';

import { usePathname } from 'next/navigation';

export default function StarFrame() {
  const pathname = usePathname();
  return (
    <iframe
      aria-hidden="true"
      src="/stars"
      className="absolute inset-0 z-10 h-full w-full"
      data-pathname={pathname}
    />
  );
}
