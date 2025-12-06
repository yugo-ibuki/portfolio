'use client'

import type { NextPage } from 'next'
import { Work } from '@components'

const Works: NextPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          WHAT I HAVE BUILT
        </h3>
      </div>
      <div className="mt-6">
        <Work />
      </div>
    </div>
  )
}

export default Works
