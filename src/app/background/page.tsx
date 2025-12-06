'use client'

import type { NextPage } from 'next'
import { Step, SideWork } from '@components'
import { Volunteer } from '@components/List/Volunteer'

const Background: NextPage = () => {
  return (
    <div className="space-y-20 pb-24">
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            EXPERIENCE
          </h3>
        </div>
        <div className="mt-6">
          <Step />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            SIDE WORK
          </h3>
        </div>
        <div className="mt-6">
          <SideWork />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b pb-2 mb-4">
          <h3 className="text-2xl font-semibold tracking-tight">
            VOLUNTEER
          </h3>
        </div>
        <div className="mt-6">
          <Volunteer />
        </div>
      </div>
    </div>
  )
}

export default Background
