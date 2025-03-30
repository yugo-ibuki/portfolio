'use client'

import type { NextPage } from 'next'
import { Block, Title, Step, SideWork } from '@components'
import { Volunteer } from '@components/List/Volunteer'

const Background: NextPage = () => {
  return (
    <main className="space-y-10">
      <Block>
        <Title>EXPERIENCE</Title>
        <div className="mt-6">
          <Step />
        </div>
      </Block>

      <Block>
        <Title>SIDE WORK</Title>
        <div className="mt-6">
          <SideWork />
        </div>
      </Block>

      <Block>
        <Title>VOLUNTEER</Title>
        <div className="mt-6">
          <Volunteer />
        </div>
      </Block>
    </main>
  )
}

export default Background
