'use client'

import type { NextPage } from 'next'
import { Presentations } from '@components/List/Presentations'

const PresentationPage: NextPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          PRESENTATIONS
        </h3>
      </div>
      <div className="mt-6">
        <Presentations />
      </div>
    </div>
  )
}

export default PresentationPage
