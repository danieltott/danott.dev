'use client';

import Codepen from 'react-codepen-embed';

export default function CodepenWrap(
  props: React.ComponentProps<typeof Codepen>
) {
  return <Codepen {...props} />;
}
