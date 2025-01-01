import { Block, Title, Skill, Graduate } from '@components'
import type { NextPage } from 'next'
import Image from 'next/image'
import { AiFillGithub } from 'react-icons/ai'
import Link from 'next/link'
import { Certificate } from '@components/List/Certificate'
import { GitContribution } from '@components/GitContribution'

type TProfiles = {
  name: string
  description: string
}

const profiles: TProfiles[] = [
  { name: 'Name', description: 'YUGO IBUKI' },
  // { name: 'Age', description: '30' },
  { name: 'Language', description: 'JP / EN' },
  { name: 'Job Title', description: 'Frontend Developer / Backend Developer' },
]

const Page: NextPage = () => {
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
          <div>
            {profiles.map((profile) => (
              <div key={profile.name}>
                <div className={'float-left sp:float-none mr-2 sp:mr-0 sp:mt-3 font-bold'}>
                  {profile.name}:
                </div>
                <div>{profile.description}</div>
              </div>
            ))}
            <div>
              <div className="flex gap-2">
                <Link
                  href="https://github.com/yugo-ibuki"
                  className={'inline-block mt-2 sp:mt-3'}
                  target={'_blank'}
                >
                  <AiFillGithub size={25} />
                </Link>
                {/*<Link*/}
                {/*  href="https://www.linkedin.com/in/yugo-ibuki-7353b7138/"*/}
                {/*  className={'inline-block mt-2 sp:mt-3'}*/}
                {/*  target={'_blank'}*/}
                {/*>*/}
                {/*  <AiFillLinkedin size={25} />*/}
                {/*</Link>*/}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Block>
        <Title>COMMENT</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <p>
            Hello, this is Yugo.
            <br />
            I'm a web developer, living in Japan, who desires to work overseas.
            <br />
            My skills are below here, please take a little look at it.
            <br />
          </p>
        </div>
      </Block>

      <Block>
        <GitContribution />
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
        <Title>CERTIFICATE</Title>
        <div className={'mt-[25px] w-[90%] mx-auto'}>
          <Certificate />
        </div>
      </Block>
    </main>
  )
}

export default Page
