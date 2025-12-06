'use client'

import type { NextPage } from 'next'
import { Articles } from '@components/List/Articles'

const ArticlesPage: NextPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          WRITING PLATFORMS
        </h3>
      </div>
      <div className="mt-6">
        <Articles />
      </div>
    </div>
  )
}

export default ArticlesPage
