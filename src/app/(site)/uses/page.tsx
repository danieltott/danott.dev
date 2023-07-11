import Head from 'next/head';

import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { LinkHref } from '@/lib/types';
import { Metadata } from 'next';
import Link from 'next/link';

function ToolsSection({
  children,
  ...props
}: React.ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  href?: LinkHref;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export const metadata: Metadata = {
  title: 'Uses',
  description: `Software and services I use to build and host this site`,
};

export default function Uses() {
  return (
    <>
      <SimpleLayout
        title="Software and services I use to build and host danott.dev"
        intro="I used lots of stuff to build this site - here are some shoutouts!"
      >
        <div className="space-y-20">
          <ToolsSection title="Hosting">
            <Tool title="Vercel" href="https://vercel.com/">
              <p>
                Vercel is the best way to host a Next.js site. I host this site
                on their free plan.
              </p>
            </Tool>
          </ToolsSection>
          <ToolsSection title="Packages">
            <Tool title="Next.js" href="https://nextjs.org/">
              <p>
                It&rsquo;s really the best (and seems like the default) way to
                build a React site.{' '}
              </p>
              <p>
                Check out{' '}
                <Link href="/thoughts/nextjs-app-router-talk">
                  my video about the Next.js App Router
                </Link>
                .
              </p>
            </Tool>
            <Tool title="TailwindCSS" href="https://tailwindcss.com">
              <p>
                I&rsquo;ve really come to love Tailwind over the past few years.
                After developing CSS for so long, using Tailwind has been a
                breath of fresh air.
              </p>
              <p>
                The work they do in{' '}
                <Link href="https://headlessui.com/">Headless UI</Link> and{' '}
                <Link href="https://tailwindui.com/">Tailwind UI</Link> is
                top-notch, as well.
              </p>
              <p>
                This site was based off of the
                https://tailwindui.com/templates/spotlight
              </p>
            </Tool>
            <Tool title="Bezier JS" href="https://pomax.github.io/bezierjs/">
              <p>
                Bezier JS is used to generate nice curves for the Star Patterns.
              </p>
            </Tool>
            <Tool title="Prettier" href="https://prettier.io/">
              Don&rsquo;t leave home without it!
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  );
}
