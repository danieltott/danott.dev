'use client';

import Image from 'next/image';

export default function ClientImage({
  sizes = '(min-width: 1536px) 720px, (min-width: 800px) 636px, (min-width: 640px) calc(100vw - 7.5rem - .375em), calc(100vw - 3.5rem - .375em)',
  ...props
}: React.ComponentProps<typeof Image>) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image sizes={sizes} {...props} />;
}
