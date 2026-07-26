import { EXPERIENCE } from '@/constants/experience';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-heading">
        Experience
      </h2>

      <div className="flex flex-col gap-8">
        {EXPERIENCE.map((exp, i) => {
          return (
            <div
              key={i}
              className="group grid grid-cols-[auto_1fr] gap-x-1.5 gap-y-1 font-mono sm:gap-x-2 sm:text-base"
            >
              <div className="text-muted-foreground font-bold">&gt;</div>

              <div className="grid grid-cols-[1fr_auto] items-baseline">
                <h3 className="text-foreground font-bold">
                  {exp.title} <span className="text-muted-foreground font-normal">@</span>{' '}
                  {exp.company}
                </h3>

                {exp.duration && (
                  <time className="text-muted-foreground text-xs tabular-nums">{exp.duration}</time>
                )}
              </div>

              <p className="text-muted-foreground col-start-2 text-sm leading-relaxed text-pretty">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
