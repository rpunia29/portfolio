import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { CONTACT_DETAILS } from '@/constants/contactDetails';
import { PROJECTS } from '@/constants/projects';
import { IconArrowUpRight, IconContrast, IconCopy, IconHash } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Tools & Stack' },
];

const EMAIL = 'rpunia229@gmail.com';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // '?' opens the menu, but not while typing in an input
      const isTyping =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement;

      if (e.key === '?' && !isTyping) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Menu"
      description="Search for a section, project or action"
      className="border-border rounded-none font-mono"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {SECTIONS.map((section) => (
            <CommandItem
              key={section.id}
              onSelect={() =>
                run(() =>
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' }),
                )
              }
            >
              <IconHash />
              {section.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => document.getElementById('theme-toggle')?.click())}>
            <IconContrast />
            Toggle theme
            <CommandShortcut>T</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => run(() => void navigator.clipboard.writeText(EMAIL))}>
            <IconCopy />
            Copy email address
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Connect">
          {CONTACT_DETAILS.map((contact) => (
            <CommandItem
              key={contact.link}
              onSelect={() =>
                run(() =>
                  window.open(
                    contact.link,
                    contact.link.startsWith('mailto:') ? '_self' : '_blank',
                    'noopener,noreferrer',
                  ),
                )
              }
            >
              <contact.icon />
              {contact.text}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {PROJECTS.filter((p) => p.links?.live || p.links?.code).map((project) => {
            const href = project.links?.live ?? project.links?.code;
            return (
              <CommandItem
                key={project.id}
                onSelect={() => run(() => window.open(href, '_blank', 'noopener,noreferrer'))}
              >
                <IconArrowUpRight />
                {project.name}
                {project.tagline && (
                  <span className="text-muted-foreground truncate text-xs">
                    · {project.tagline}
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
