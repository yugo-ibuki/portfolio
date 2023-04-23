import { Block, Title, Skill, Graduate, Stack } from '@components'
import type { NextPage } from 'next'
import Image from 'next/image'
import { AiFillGithub } from 'react-icons/ai'
import Link from 'next/link'
import { Certificate } from '@components/List/Certificate'

type TProfiles = {
  name: string
  description: string
}

const profiles: TProfiles[] = [
  { name: 'Name', description: 'YUGO IBUKI' },
  // { name: 'Age', description: '30' },
  { name: 'Language', description: 'JP / EN' },
  { name: 'Job Title', description: 'Frontend Developer' },
]

const Home: NextPage = () => {
  return (
    <main>
      <div className={'mt-[30px] flex items-center gap-x-10 sp:flex-col'}>
        <figure className={'h-[300px] flex'}>
          <Image
            src="/assets/me.jpeg"
            alt="Picture of the author"
            className={'ml-auto'}
            width={300}
            height={300}
          />
        </figure>
        <div className={'gap-x-5 w-[40%] sp:w-[60%] sp:mt-[20px]'}>
          <dl>
            {
              profiles.map(profile => {
                return (
                  <>
                    <dt className={'float-left sp:float-none mr-2 sp:mr-0 sp:mt-3 font-bold'}>{profile.name}:</dt>
                    <dd>{profile.description}</dd>
                  </>
                )
              })
            }
            <dd>
              <Link href="https://github.com/yugo-ibuki" className={'inline-block mt-2 sp:mt-3'} target={'_blank'}>
                <AiFillGithub size={20} />
              </Link>
            </dd>
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
        <Title>Certificate</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <Certificate />
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
