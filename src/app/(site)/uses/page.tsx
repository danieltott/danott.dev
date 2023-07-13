import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { SimpleLayout } from '@/components/SimpleLayout';
import { LinkHref } from '@/lib/types';
import { type Metadata } from 'next';
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
  description: `I like stuff. Here's some stuff I like.`,
};

export default function Uses() {
  return (
    <>
      <SimpleLayout
        title="Equipment and tools I use to do my thing"
        intro={
          <>
            I like <em>stuff</em>. Here&rsquo;s some stuff I like.
          </>
        }
      >
        <div className="space-y-20">
          <ToolsSection title="This site">
            <Tool title="Vercel" href="https://vercel.com/">
              <p>
                Vercel is the best way to host a Next.js site. I host this site
                on their free plan.
              </p>
            </Tool>
            <Tool title="Next.js" href="https://nextjs.org/">
              <p>
                It&rsquo;s really the best (and seems like the default) way to
                build a React site.
              </p>
              <p>
                Check out{` `}
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
                The work they do in{` `}
                <Link href="https://headlessui.com/">Headless UI</Link> and{` `}
                <Link href="https://tailwindui.com/">Tailwind UI</Link> is
                top-notch, as well.
              </p>
              <p>
                This site was based off of the
                <Link href="https://tailwindui.com/templates/spotlight">
                  Tailwind UI Spotlight template
                </Link>
                .
              </p>
            </Tool>
            <Tool title="Bezier JS" href="https://pomax.github.io/bezierjs/">
              <p>
                Bezier JS is used to generate nice curves for the Star Patterns.
              </p>
            </Tool>
            <Tool title="Konva" href="https://konvajs.org/docs/react/">
              <p>
                Generate and animate the stars via canvas.
              </p>
            </Tool>
            <Tool
              title={
                <>
                  <span className="font-freeLunch font-normal not-italic">
                    Free Lunch
                  </span>{' '}
                  by SimpleBits
                </>
              }
              href="https://simplebits.shop/"
            >
              <p>
                The title font is a special pre-relase version of a font called
                Free Lunch by Dan Cederholm of SimpleBits.
              </p>
            </Tool>
            <Tool title="Prettier" href="https://prettier.io/">
              Don&rsquo;t leave home without it!
            </Tool>
          </ToolsSection>
          <ToolsSection title="Hardware">
            <Tool title={<>MacBook Pro 13&rdquo;, M1, 2020</>}>
              <p>
                I&rsquo;ve been a Mac person since <em>way</em> before they were
                cool.
              </p>
            </Tool>
            <Tool
              title="Dell U3219Q 32-inch 4K monitor"
              href="https://www.dell.com/ae/business/p/dell-u3219q-monitor/pd"
            >
              <p>
                I hade always been a &ldquo;two monitors is better than one big
                one&rdquo; but...I was wrong. Having all of this real estate has
                been great - especially for streaming / meetings.
              </p>
            </Tool>

            <Tool
              title="CalDigit TS3+ Thunderbolt/USB C hub"
              href="https://www.caldigit.com/ts3-plus/"
            >
              <p>
                This thing is a <em>beast</em>. I have a 32&rdquo; 4K monitor,
                ethernet, camera, keyboard, Stream Deck, mic, and speakers
                plugged into it, all running into my macbook with{` `}
                <strong>one cord</strong>, <em>and</em> it&rsquo;s charging,
                too! 🤯🤯🤯{` `}
              </p>
            </Tool>

            <Tool
              title="Drop CTRL Mechanical Keyboard"
              href="https://drop.com/buy/drop-ctrl-mechanical-keyboard?defaultSelectionIds=977867,977870"
            >
              <p>Clicky-clacky-colorful goodness.</p>
            </Tool>
            <Tool
              title="Logitech MX Master 2s"
              href="https://www.logitech.com/en-us/products/mice/mx-master-3s.910-006558.html"
            >
              <p>
                I&rsquo;ve been using the MX Master series for a long time -
                very comfortable and functional. I can barely work anymore
                without the thumb scroll wheel.
              </p>
            </Tool>
          </ToolsSection>
          <ToolsSection title="Work Station">
            <Tool
              title="Fully Jarvis Standing Desk Frame"
              href="https://store.hermanmiller.com/standing-desks/jarvis-bamboo-standing-desk/2542428.html?lang=en_US"
            >
              <p>
                They don&rsquo;t sell just the frame anymore, but I{' '}
                <em>love</em> the form and function of the sit/stand desk.
              </p>
            </Tool>
            <Tool title="A Door">
              <p>It&rsquo;s a door.</p>
              <p>
                I attached a solid-wood door to my standing desk - it&rsquo;s
                huge and stable and awesome.
              </p>
            </Tool>
            <Tool
              title="Fully Jarvis Dual Monitor Arm"
              href="https://store.hermanmiller.com/office-furniture-desk-accessories-organization/jarvis-dual-monitor-arm/2548840.html?lang=en_US"
            >
              <p>
                This thing is amazing. It can hold pretty much anything and has
                great stability and flexibility.
              </p>
            </Tool>

            <Tool
              title="Phillips Hue Light Bulbs"
              href="https://www.philips-hue.com/en-us"
            >
              <p>
                Lighting has always been important to me in my environment, and
                once I started being on camera a lot more it got important in
                other ways. I have 6 Hue bulbs and a couple light bars, all
                hooked up to my Stream Deck for easy switching.
              </p>
            </Tool>
          </ToolsSection>
          <ToolsSection title="Streaming/Podcasting/Online Events">
            <Tool
              title="Elgato Facecam"
              href="https://www.elgato.com/us/en/p/facecam"
            >
              <p>The best no-hassle camera I&rsquo;ve ever used.</p>
            </Tool>
            <Tool
              title="Elgato Wave:3"
              href="https://www.elgato.com/us/en/p/wave-3-black"
            >
              <p>The best no-hassle mic I&rsquo;ve ever used.</p>
            </Tool>
            <Tool
              title="Elgato Key Light"
              href="https://www.elgato.com/us/en/p/wave-3-black"
            >
              <p>
                The best no-hassle...I think you get the picture. Elgato makes
                great products that are very easy to use and have great
                connected software.
              </p>
            </Tool>
            <Tool
              title="Elgato Stream Deck"
              href="https://www.elgato.com/us/en/p/stream-deck-mk2-black"
            >
              <p>
                I use it every day for lighting switches and switching from
                headphones to speakers.
              </p>
            </Tool>
            <Tool
              title="Yeti Blue Compass Mic Boom Arm"
              href="https://www.logitechg.com/en-us/products/streaming-gear/compass-boom-microphone-arm.989-000517.html"
            >
              <p>
                I bought this when I still was using the Yeti Blue mic, and it
                works great.
              </p>
            </Tool>

            <Tool
              title="Better Snap Tool"
              href="https://folivora.ai/bettersnaptool"
            >
              <p>
                I use this to create areas on my monitor for streaming/sharing.
                This allows me to have windows on my primary monitor that{` `}
                <em>aren&rsquo;t</em> being shared, and makes my life a lot
                easier.
              </p>
            </Tool>
          </ToolsSection>
          <ToolsSection title={<>Software for Workin&rsquo;</>}>
            <Tool title="VS Code" href="https://code.visualstudio.com/">
              <p>It&rsquo;s good.</p>
            </Tool>

            <Tool title="Arc Browser" href="https://arc.net/">
              <p>
                Arc has completely changed how I use the web for
                browsing/research/getting work done. It&rsquo;s really, really,
                really great.
              </p>
            </Tool>
            <Tool
              title="Firefox Developer Edition"
              href="https://www.mozilla.org/en-US/firefox/developer/"
            >
              <p>Old dependable.</p>
              <p>
                I&rsquo;ve used Firefox as my primary dev browser for a long,
                long time.
              </p>
            </Tool>
            <Tool title="Tower Git Client" href="https://www.git-tower.com/mac">
              <p>
                Using <code>git</code> on the command line is absurd. Free
                yourself and use a{' '}
                <abbr title="Graphical User Interface">GUI</abbr> client, you
                won&rsquo;t regret it. Tower is the best.
              </p>
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  );
}
