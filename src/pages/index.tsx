import { Block, Title, Skill, Graduate, Stack } from '@components'
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
        <Title>COMMENT</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <p>
            Hello, this is Yugo.<br />
            I'm a web developer, living in Japan, who desires to work overseas.<br />
            My skills are below here, please take a little look at it.<br />
          </p>
        </div>
      </Block>

      <Block>
        <Title>SKILLS</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <Skill />
        </div>
      </Block>

      <Block>
        <Title>GRADUATE</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <Graduate />
        </div>
      </Block>

      <Block>
        <Title>THIS SITE STACK</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <Stack />
        </div>
      </Block>
    </main>
  )
}

export default Home
