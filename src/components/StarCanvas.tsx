'use client';
import { useEffect, useState } from 'react';

export default function StarCanvas() {
  const [Component, setComponent] = useState<null | JSX.Element>(null);

  useEffect(() => {
    async function load() {
      const StarKonva = (await import('./StarKonva')).default;
      setComponent(<StarKonva />);
    }
    load();
  }, []);

  return Component ? Component : null;
}
