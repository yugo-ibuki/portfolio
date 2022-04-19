import { Block, Title, Skill, Graduate } from '@components'
import type { NextPage } from 'next'
import Image from 'next/image'

type TProfiles = {
  name: string
  description: string
}

const profiles: TProfiles[] = [
  { name: 'Name', description: 'YUGO IBUKI' },
  { name: 'Age', description: '30' },
  { name: 'Language', description: 'JP / EN' },
]

const Home: NextPage = () => {
  return (
    <main>
      <div className={'mt-[30px] flex items-center gap-x-10'}>
        <figure className={'h-[300px] flex'}>
          <Image
            src="/assets/me.jpeg"
            alt="Picture of the author"
            className={'ml-auto'}
            width={300}
            height={300}
          />
        </figure>
        <div className={'gap-x-5 w-[40%]'}>
          <dl>
            {
              profiles.map(profile => {
                return (
                  <>
                    <dt className={'float-left mr-2'}>{profile.name}:</dt>
                    <dd>{profile.description}</dd>
                  </>
                )
              })
            }
          </dl>
        </div>
      </div>

      <Block>
        <Title>GRADUATE</Title>
        <div className={'mt-[25px]'}>
          <Graduate />
        </div>
      </Block>

      <Block>
        <Title>SKILLS</Title>
        <div className={'mt-[25px]'}>
          <Skill />
        </div>
      </Block>
    </main>
  )
}

export default Home
