'use client'

import { useEffect, useState, type FC } from 'react'
import { firstUppercase } from '@lib/firstUppercase'
import { Progress } from '@/components/components/ui/progress'
import { getProgressDuration } from '@/lib/motion'
import { skills } from '@/content/skills'
import type { SkillEntry, SkillGroups } from '@/content/skills'

export const Skill: FC = () => (
  <div className="space-y-10">
    {(Object.keys(skills) as (keyof SkillGroups)[]).map((title) => (
      <div key={title}>
        <h3 className="text-xl mb-6">
          <span className="border-b-2 border-primary pb-1">{firstUppercase(title)}</span>
        </h3>
        <div className="space-y-6">
          {skills[title].map((skill: SkillEntry) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const SkillItem: FC<{ skill: SkillEntry }> = ({ skill }) => {
  const targetLevel = typeof skill.level === 'number' ? skill.level : 0
  const [displayLevel, setDisplayLevel] = useState(0)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setDisplayLevel(targetLevel)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [targetLevel])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-medium min-w-[120px]">{skill.name}</span>
          <span className="text-sm text-muted-foreground min-w-[80px]">{skill.terms} years</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {typeof skill.level === 'number' ? `${skill.level}%` : '-'}
        </span>
      </div>
      <Progress
        value={displayLevel}
        className="h-2"
        indicatorStyle={{ transitionDuration: `${getProgressDuration(targetLevel)}ms` }}
      />
    </div>
  )
}
