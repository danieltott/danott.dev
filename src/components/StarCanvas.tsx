'use client';
import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('./StarKonva'), {
  ssr: false,
});

export default function StarCanvas() {
  return <Canvas />;
}
