import ThemeToggle from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Kbd } from '@/components/ui/kbd';
import { CONTACT_DETAILS } from '@/constants/contactDetails';
import { ClientOnly } from 'vite-react-ssg/single-page';

const HERO_STACK = [
  'AI Agents',
  'TypeScript',
  'Go',
  'Python',
  'React',
  'React Native',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Web Scraping',
  'Docker',
  'Cloudflare',
  'AWS',
];

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground font-medium underline decoration-dotted underline-offset-4 transition-colors hover:decoration-solid"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="home" className="flex flex-col gap-6 font-mono" aria-labelledby="hero-heading">
      <div className="flex items-center gap-2">
        <h1 id="hero-heading" className="text-primary text-2xl font-bold tracking-tight">
          &gt; Rahul Punia
        </h1>
        <ClientOnly>
          {() => (
            <ThemeToggle className="border-border hover:bg-muted/80 ml-auto flex cursor-pointer items-center border bg-transparent px-1.5 py-1 transition-colors" />
          )}
        </ClientOnly>
      </div>

      <div className="space-y-4 text-sm md:text-base">
        <p className="text-muted-foreground max-w-full leading-relaxed">
          Full-stack developer and B.Tech student at{' '}
          <span className="text-foreground font-medium">IIT Kharagpur</span>. These days I build AI
          agents on Cloudflare Workers: one that pulls property records for due diligence, another
          that turns meeting audio into tracked tasks. I also built{' '}
          <InlineLink href="https://trano.rpunia.com">Trano</InlineLink> (live tracking for every
          train in India) and{' '}
          <InlineLink href="https://github.com/rpunia29/extractous-go">
            Extractous-Go
          </InlineLink>
          , a document extraction library for Go.
        </p>

        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">Stack</p>
          <ul className="flex flex-wrap gap-1.5">
            {HERO_STACK.map((tech) => (
              <li key={tech}>
                <Badge
                  variant="outline"
                  className="border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-sm px-2 py-0.5 text-xs font-medium transition-colors"
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
          {CONTACT_DETAILS.map((contact) => (
            <li key={contact.link}>
              <a
                href={contact.link}
                className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-2 transition-colors"
                aria-label={contact.text}
                title={contact.text}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center gap-1.5">
                  [<contact.icon className="size-4" /> {contact.text}]
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground/50 mt-2 hidden items-center gap-1.5 text-xs md:flex">
          // Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open commands
        </p>
      </div>
    </section>
  );
}
