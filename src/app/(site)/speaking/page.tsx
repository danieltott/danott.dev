import { type Metadata } from 'next';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import type { LinkHref } from '@/lib/types';

function SpeakingSection({
  children,
  title,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Section title={title}>
      <div className="space-y-16">{children}</div>
    </Section>
  );
}
type AppearanceProps = {
  title: string;
  description: React.ReactNode;
  event: React.ReactNode;
  cta: React.ReactNode;
  href: LinkHref;
  date: string | Date;
};
function Appearance({
  title,
  description,
  event,
  cta,
  href,
  date: rawDate,
}: AppearanceProps) {
  const date = new Date(rawDate);

  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>
        <span>{event}</span>
        <span>&mdash;</span>
        <time dateTime={date.toISOString()}>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </time>
      </Card.Eyebrow>
      <Card.Description>
        <p>{description}</p>
      </Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  );
}

const talks = [
  {
    href: 'https://www.youtube.com/watch?v=ywaMkjvTWiY',
    title: 'NextJS App Router Intro and Tour: Part 2',
    description:
      'Next.js recently released their new App Router, which introduces an entirely new paradigm for creating Next.js apps. In Part 2, we take a look at data fetching in the App Router, and ways Next.js can help optimize your app with little work on your end.',
    event: 'Virtual Coffee Lunch & Learn',
    date: '2023-06-16',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=faE-G7_bQqU',
    title: 'NextJS App Router Intro and Tour: Part 1',
    description:
      'Next.js recently released their new App Router, which introduces an entirely new paradigm for creating Next.js apps. In Part 1, we cover some JS history, and then dive in to the new App Router. We also spent some time on React Server Components.',
    event: 'Virtual Coffee Lunch & Learn',
    date: '2023-06-02',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=Oxyk4Ql539o',
    title: 'Look for the Holes: Surviving Survivor Bias',
    description:
      'Survival bias (or survivorship bias) is the logical error of concentrating on entities that passed a selection process while overlooking those that did not.',
    event: 'Virtual Coffee Lightning Talks 2023',
    date: '2023-03-27',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=_fqFv1joZ3A',
    title: 'Virtual Coffee Podcast 50th Episode Special - Live at KCDC 2022',
    description:
      'For the 50th episode of the podcast, Dan and Bekah are live at KCDC 2022 answering listener questions and practicing their accents.',
    event: 'Virtual Coffee Podcast',
    date: '2022-08-08',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=WuIhnUjIFbM&t=4s',
    title: 'Open Source Project Walkthrough',
    description: `Let's tour an Open Source Project on GitHub! We'll walk through pretty much every piece of an open source repository, and go behind the scenes and see what it's like as a maintainer as well.`,
    event: 'Virtual Coffee Lunch & Learn',
    date: '2021-09-03',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=IG697qDkvYY',
    title: 'Moving the Virtual Coffee site to Remix',
    description: `Forem team members Nick Taylor and Christina Gorton were joined by Dan Ott on thePracticalDev Twitch stream to work on an open front end issue.`,
    event: 'Nick Taylor Livestream',
    date: '2022-06-09',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=fN67Gx4ubU4',
    title: 'Graceful Solutions to Tricky Layouts w/ CSS Grid',
    description: `In this Lightning Talk, I'm going to concentrate on a small chunk of the CSS Grid spec, and show some examples of how CSS Grid can solve some common-but-annoying layouts with just a few lines of CSS, and if we have time, maybe look at some cool tricks along the way.`,
    event: 'Virtual Coffee Lunch & Learn',
    date: '2021-02-26',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=iVMPwTETH3Q&t=158s',
    title: 'Pair Programming',
    description: `Forem team members Nick Taylor and Christina Gorton were joined by Dan Ott on thePracticalDev Twitch stream to work on an open front end issue.`,
    event: 'The Practical Dev',
    date: '2021-02-03',
    cta: 'Watch video',
  },
  {
    href: 'https://www.youtube.com/watch?v=q6OoGUkvxxU',
    title: 'Next.js Live Coding/Learning',
    description:
      'Live-coding while converting https://CLEreact.dev from Gatsby to Next.js live in front of everyone 😬.',
    event: <a href="https://CLEreact.dev">Cleveland React</a>,
    date: '2021-03-05',
    cta: 'Watch video',
  },
];

type Pod = {
  id: number;
  title: string;
  audio_url: string;
  artwork_url: string;
  description: string;
  summary: string;
  artist: string;
  tags: string;
  published_at: string;
  duration: number;
  hq: boolean;
  magic_mastering: boolean;
  guid: string;
  inactive_at: string | null;
  custom_url: string;
  episode_number: number;
  season_number: number;
  explicit: boolean;
  private: boolean;
  total_plays: number;
};

async function getPods(): Promise<AppearanceProps[]> {
  try {
    const response = await fetch(
      `https://www.buzzsprout.com/api/1558601/episodes.json?api_token=${process.env.BUZZSPROUT_API_KEY}`,
      { next: { revalidate: 86400 } }
    );
    const data: Pod[] = await response.json();
    return data.slice(0, 5).map((pod) => ({
      href: pod.custom_url,
      title: pod.title,
      description: pod.summary,
      event: 'Virtual Coffee Podcast',
      date: pod.published_at,
      cta: 'Listen',
    }));
  } catch (error) {
    return [];
  }
}

export const metadata: Metadata = {
  title: `Speaking`,
  description: 'Selected video and audio appearances',
};

export default async function Speaking() {
  const podcasts = await getPods();

  return (
    <>
      <SimpleLayout
        title="Video &amp; Audio Appearances"
       intro="I always have a great time appearing on podcasts and giving talks, whether live or online. Here are some of my favorites."
      >
        <div className="space-y-20">
          <SpeakingSection title="Talks">
            {talks.map((talk) => (
              <Appearance
                key={talk.title}
                href={talk.href}
                title={talk.title}
                description={talk.description}
                event={talk.event}
                cta={talk.cta}
                date={talk.date}
              />
            ))}
          </SpeakingSection>
          <SpeakingSection title="Podcasts">
            {podcasts.map((talk) => (
              <Appearance
                key={talk.title}
                href={talk.href}
                title={talk.title}
                description={talk.description}
                event={talk.event}
                cta={talk.cta}
                date={talk.date}
              />
            ))}
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  );
}
