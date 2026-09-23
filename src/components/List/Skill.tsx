import type { FC } from 'react'
import { firstUppercase } from '@lib/firstUppercase'
import { skills } from '@/content/skills'
import type { SkillEntry, SkillGroups } from '@/content/skills'

export const Skill: FC = () => (
  <div>
    <p
      id="skill-level-description"
      className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground"
    >
      <span className="font-medium text-foreground">Proficiency (%)</span> is a self-assessed
      estimate, not a test score.
    </p>
    <div
      className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3"
      aria-describedby="skill-level-description"
    >
      {(Object.keys(skills) as (keyof SkillGroups)[]).map((title) => (
        <section key={title} className="min-w-0 border-t border-foreground/15 pt-5">
          <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em]">{firstUppercase(title)}</h3>
          <div className="divide-y divide-foreground/10">
            {skills[title].map((skill: SkillEntry) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
)

const SkillItem: FC<{ skill: SkillEntry }> = ({ skill }) => (
  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-3">
    <span className="min-w-0 font-medium">{skill.name}</span>
    <div className="flex items-baseline gap-3 whitespace-nowrap text-xs tabular-nums text-muted-foreground">
      <span>{skill.terms} years</span>
      <span className="min-w-[3ch] text-right">
        {typeof skill.level === 'number' ? (
          <>
            <span className="sr-only">Self-assessed proficiency: {skill.level} percent</span>
            <span aria-hidden="true">{skill.level}%</span>
          </>
        ) : (
          '-'
        )}
      </span>
    </div>
  </div>
)
