import type { FC } from 'react'
import { skills } from './data/skills'
import type { TSkill, TSkills } from './data/skills'
import { Text } from '@chakra-ui/react'
import { firstUppercase } from '@lib/firstUppercase'

export const Skill: FC = () => (
  <ul className={'flex flex-col gap-y-[20px]'}>
    {(Object.keys(skills) as (keyof TSkills)[]).map((title) => {
      return (
        <li key={title} className={'flex flex-col gap-y-2'}>
          <h4 className={'text-xl'}>
            <span className={'border-b border-b-[5px]'}>{firstUppercase(title)}</span>
          </h4>
          <ul className={'flex flex-col gap-y-2'}>
            {skills[title].map((skill: TSkill) => (
              <List key={skill.name} skill={skill} />
            ))}
          </ul>
        </li>
      )
    })}
  </ul>
)

const List = ({ skill }: { skill: TSkill }) => (
  <li key={skill.name}>
    <div className={'c-sp-list gap-x-5'}>
      <div className={'w-[120px]'}>
        <Text>{skill.name}</Text>
      </div>
      <div className={'w-[90px]'}>{skill.terms} years</div>
      <div>
        <div className={'border w-[300px] h-[17px] relative'}>
          <span className={'absolute text-white top-[-5px]'}>confidence</span>
          <div
            className={'bg-slate-400 h-[17px]'}
            style={{ width: typeof skill.level === 'number' ? `${skill.level}%` : '0px' }}
          />
        </div>
      </div>
    </div>
  </li>
)
