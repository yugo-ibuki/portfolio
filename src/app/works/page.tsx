'use client'

import type { NextPage } from 'next'
import { Title, Block, Work } from '@components'

const Works: NextPage = () => {
  return (
    <main className="space-y-10">
      <Block>
        <Title>WHAT I HAVE BUILT</Title>
        <div className="mt-6">
          <Work />
        </div>
      </Block>
    </main>
  )
}

export default Works
