'use client'

import type { NextPage } from 'next'
import { Presentations } from '@components/List/Presentations'
import { MotionSection } from '@/components/MotionSection'

const PresentationPage: NextPage = () => {
  return (
    <MotionSection className="space-y-6" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">PRESENTATIONS</h3>
      </div>
      <div className="mt-6">
        <Presentations />
      </div>
    </MotionSection>
  )
}

export default PresentationPage
