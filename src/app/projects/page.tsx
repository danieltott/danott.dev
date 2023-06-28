import Image from 'next/image';
import { Metadata } from 'next';
import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import logoReact from './logos/react.png';
import logoRalston from './logos/ralston.png';
import logoCodeland from './logos/codeland.png';
import logoObserver from './logos/lakewoodobserver.png';
import { LinkIcon } from '@heroicons/react/20/solid';
import logoVirtualCoffee from './logos/virtual-coffee.png';

const projects = [
  {
    name: 'Virtual Coffee',
    description: 'An intimate tech community for all, optimized for you.',
    link: { href: 'https://virtualcoffee.io', label: 'virtualcoffee.io' },
    logo: logoVirtualCoffee,
  },
  {
    name: 'React',
    description:
      'In May of 2023, I became an official contributor to the React codebase! It’s not a big change, but it was still very exciting for me.',
    link: {
      href: 'https://github.com/facebook/react/pull/26738',
      label: 'github.com/facebook/react',
    },
    logo: logoReact,
  },
  {
    name: 'Ralston Instruments',
    description:
      'Since 2007, I’ve been the lead front-end and JavaScript developer for the Ralston Instruments suite of sites. Highlights include the main marketing website, a full CMS build based on CraftCMS, a mobile web app, a React component library built for web and React Native, contributions to a React Native app, and the front-end for their customer log-in area.',
    link: { href: 'https://www.ralstoninst.com', label: 'ralstoninst.com' },
    logo: logoRalston,
  },
  {
    name: 'Codeland Conference',
    description:
      'In 2021 and 2022, I helped the Codeland Conference team update their site to use live data from Airtable, as well as built the day-of portal for attendees to watch the stream, check out the conference schedule, and chat with other attendees.',
    link: { href: 'https://codelandconf.com/', label: 'codelandconf.com' },
    logo: logoCodeland,
  },
  {
    name: 'Lakewood Observer',
    description:
      'From 2005 to 2014, I built and maintained the system behind the Lakewood Observer, a hyperlocal news site for the city of Lakewood, Ohio. The site was built on a custom PHP and MySQL framework.',
    link: {
      href: 'https://lakewoodobserver.com',
      label: 'lakewoodobserver.com',
    },
    logo: logoObserver,
  },
];

export const metadata: Metadata = {
  title: `Projects`,
  description: 'Different things I&rsquo;ve worked on over the years',
};

const years = new Date().getFullYear() - 2005;

export default function Projects() {
  return (
    <>
      <SimpleLayout
        title="Different things I&rsquo;ve worked on over the years"
        intro={`I’ve worked on so many projects in the last ${years} years that it’d be impossible to list them all even if I could remember them. Instead, listed here are a few of the projects I’m particularly proud of.`}
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-cerise-500 dark:text-zinc-200">
                <LinkIcon className="h-5 w-5 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
