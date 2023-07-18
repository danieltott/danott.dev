'use client';

import { useEffect, useState } from 'react';

export default function StarFrame() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <iframe
      aria-hidden="true"
      src="/stars"
      className="absolute inset-0 z-10 h-full w-full"
    />
  ) : null;
}
