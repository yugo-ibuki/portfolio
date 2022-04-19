import type { NextPage } from 'next'
import { Title, Block, Work } from '@components'

const Works: NextPage = () => {
  return (
    <div>
      <Block>
        <Title>WORK EXPERIENCE</Title>
        <div className={'mt-[25px]'}>
          <Work />
        </div>
      </Block>
    </div>
  )
}

export default Works