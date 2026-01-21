import { type Metadata } from 'next';

import { SimpleLayout } from '@/components/SimpleLayout';

export const metadata: Metadata = {
  title: `LastBrick Beta`,
  description: 'Different things I’ve worked on over the years',
};

export default function Projects() {
  return (
    <>
      <SimpleLayout
        title="LastBrick Beta"
        intro={`I've been working on this app for a bit. Also - apparently the LastBrick name is taken in the app store so I'll have to come up with something different.`}
      >
        <p>
          This is just a simple holding page for the LastBrick beta. Please
          contact me directly if you'd like to try it out!
        </p>
      </SimpleLayout>
    </>
  );
}
