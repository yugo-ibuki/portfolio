import type { NextPage } from 'next'
import Image from 'next/image'
import { Title } from '@components/Title'
import { Block } from '@components/Block'

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
      <div className={'mt-[30px] flex items-center'}>
        <figure className={'w-[60%] h-[300px] flex justify-center'}>
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
        <Title>BACKGROUND</Title>
      </Block>
    </main>
  )
}

export default Home
