import Image from 'next/image';
import { Container } from '@/components/Container';
import { GitHubIcon, TwitterIcon } from '@/components/SocialIcons';
import portraitImage from '@/images/portrait.jpg';
import SocialLink from './SocialLink';
import MailLink from './MailLink';
import { type Metadata } from 'next';
import { Prose } from '@/components/Prose';

export const metadata: Metadata = {
  title: `About`,
  description: 'I’m Dan Ott. I do computer stuff.',
};

export default function About() {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="mx-auto max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-stone-100 object-cover dark:bg-stone-800"
                priority
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="font-title">
              I&rsquo;m Dan Ott. I do computer stuff.
            </h1>
            <Prose className="mt-6">
              <p className='text-above-stars'>
                I&rsquo;m Dan, an independent developer and designer based in
                Cleveland, Ohio. I&rsquo;ve been working with clients since 2005
                to plan, design, and implement their ideas. I also am an org
                maintainer at{' '}
                <a href="https://virtualcoffee.io">Virtual Coffee</a>.
              </p>
              <p className='text-above-stars'>
                I&rsquo;ve been an independent developer for over fifteen years,
                specializing in front-end architecture and development. I have
                experience building sites using standards-compliant HTML and
                CSS, React (both SPA and integrated into existing legacy sites),
                and have built over 25 client sites using Craft CMS. Since 2007,
                I&rsquo;ve worked almost exclusively with{' '}
                <a href="https://sprokets.com">Sprokets</a>, a collection of
                independent creative professionals.
              </p>
            </Prose>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/danieltott"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://github.com/danieltott"
                icon={GitHubIcon}
              >
                Follow on GitHub
              </SocialLink>

              <MailLink />
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
