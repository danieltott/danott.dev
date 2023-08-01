'use client';

import { useEffect, useRef, useState } from 'react';

export default function StarFrameMounter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? <StarFrame /> : null;
}

function StarFrame() {
  const [windowSize, setWindowSize] = useState({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const size = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const oldSize = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });

  useEffect(() => {
    let timeout: number;

    const interval = window.setInterval(() => {
      const height = window.document.body.offsetHeight;
      const width = window.document.body.offsetWidth;

      if (height && width) {
        if (size.current.width !== width || size.current.height !== height) {
          window.clearTimeout(timeout);
          size.current = { width, height };

          timeout = window.setTimeout(() => {
            console.log('resizing!');
            if (
              size.current.width !== oldSize.current.width ||
              size.current.height !== oldSize.current.height
            ) {
              oldSize.current = size.current;

              setWindowSize(size.current);
            }
          }, 300);
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      aria-hidden="true"
      src={`/stars.svg?w=${windowSize.width}&h=${windowSize.height}`}
      className="absolute inset-0 z-10 h-full w-full"
      loading="lazy"
      alt=""
    />
  );
}
