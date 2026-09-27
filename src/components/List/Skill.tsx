import type { FC } from 'react'
import { skillGroupLabels, skills } from '@/content/skills'
import type { SkillEntry, SkillGroups } from '@/content/skills'

export const Skill: FC = () => (
  <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
    {(Object.keys(skills) as (keyof SkillGroups)[]).map((title) => (
      <section key={title} className="min-w-0 border-t border-foreground/15 pt-5">
        <h3 className="mb-3 text-lg font-semibold tracking-[-0.02em]">{skillGroupLabels[title]}</h3>
        <div className="divide-y divide-foreground/10">
          {skills[title].map((skill: SkillEntry) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
    ))}
  </div>
)

const SkillItem: FC<{ skill: SkillEntry }> = ({ skill }) => (
  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 py-3">
    <span className="min-w-0 font-medium">{skill.name}</span>
    <span className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">
      {skill.terms} years
    </span>
  </div>
)
