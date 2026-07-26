import { Badge } from '@/components/ui/badge';
import { TECH_STACK, type TechItem } from '@/constants/techStack';
import { cn } from '@/lib/utils';

const chipClass =
  'border-border bg-muted/20 text-muted-foreground hover:text-foreground hover:border-foreground/30 gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium transition-colors cursor-default';

function TechIcon({ item }: { item: TechItem }) {
  if (!item.icon) return null;

  const iconClass =
    'size-3 opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0';

  return (
    <>
      <img
        src={item.icon}
        alt=""
        loading="lazy"
        className={cn(
          iconClass,
          item.iconDark ? 'dark:hidden' : item.invertInDark && 'dark:invert',
        )}
      />
      {item.iconDark && (
        <img
          src={item.iconDark}
          alt=""
          loading="lazy"
          className={cn(iconClass, 'hidden dark:block')}
        />
      )}
    </>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="section" aria-labelledby="tech-stack-heading">
      <h2 id="tech-stack-heading" className="section-heading">
        Tools & Stack
      </h2>

      <div className="flex flex-col gap-6 font-mono text-sm">
        {TECH_STACK.map((group) => (
          <div key={group.category} className="flex flex-col gap-3 md:flex-row md:gap-6">
            <h3 className="text-muted-foreground shrink-0 font-bold tracking-wider uppercase md:w-48">
              {group.category}
            </h3>

            <ul className="flex w-full flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Badge variant="outline" className={cn('group', chipClass)}>
                    <TechIcon item={item} />
                    {item.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
