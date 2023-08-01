'use client';

export default function StarFrame() {
  return (
    <iframe
      aria-hidden="true"
      src="/stars"
      className="absolute inset-0 z-10 h-full w-full"
      loading="lazy"
    />
  );
}
