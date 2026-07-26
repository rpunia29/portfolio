import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { PROJECTS } from '@/constants/projects';
import type { Project } from '@/types/project';
import { IconChevronDown } from '@tabler/icons-react';

export default function Projects() {
  return (
    <section id="projects" className="section font-mono" aria-labelledby="projects-section-heading">
      <h2 id="projects-section-heading" className="section-heading">
        Projects
      </h2>

      <Accordion type="single" collapsible className="w-full">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </Accordion>
    </section>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="text-muted-foreground hover:text-foreground pointer-events-auto text-sm transition-colors hover:underline hover:underline-offset-4"
    >
      [{label}]
    </a>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <AccordionItem value={project.id} className="group/item border-border">
      <div className="hover:bg-muted/60 relative flex items-center justify-between gap-3 px-2 transition-colors">
        {/* Full-row click target: the wrapper is out of the flex flow, the button fills the row */}
        <div className="absolute inset-0">
          <AccordionTrigger
            aria-label={`Toggle details for ${project.name}`}
            className="absolute inset-0 h-full w-full cursor-pointer rounded-none py-0 [&>svg]:hidden"
          />
        </div>

        <h3 className="text-foreground pointer-events-none relative z-10 min-w-0 truncate py-3 text-base font-bold">
          <span className="text-muted-foreground mr-3 inline-block opacity-50 transition-all group-hover/item:translate-x-1 group-hover/item:opacity-100">
            &gt;
          </span>
          {project.name}
          {project.tagline && (
            <span className="text-muted-foreground ml-2 hidden font-normal sm:inline">
                · {project.tagline}
            </span>
          )}
        </h3>

        {/* Links sit above the trigger and stay individually clickable */}
        <div className="pointer-events-none relative z-10 flex shrink-0 items-center gap-3">
          {project.links?.live && <ProjectLink href={project.links.live} label="live" />}
          {project.links?.code && <ProjectLink href={project.links.code} label="code" />}
          {project.links?.demo && <ProjectLink href={project.links.demo} label="demo" />}
          <IconChevronDown
            aria-hidden
            className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-300 ease-out group-data-[state=open]/item:rotate-180"
          />
        </div>
      </div>

      <AccordionContent className="px-2 pb-6">
        <div className="bg-muted/20 border-foreground/15 space-y-4 border-l-2 px-4 py-4">
          <p className="text-muted-foreground text-sm text-pretty md:text-base">{project.blurb}</p>

          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
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
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
