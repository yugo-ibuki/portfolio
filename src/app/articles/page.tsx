'use client'

import type { NextPage } from 'next'
import { Block, Title } from '@components'
import { Articles } from '@components/List/Articles'
import { Card, CardContent } from '@/components/components/ui/card'

const ArticlesPage: NextPage = () => {
  return (
    <main className="space-y-10">
      <Block>
        <Title>WRITING PLATFORMS</Title>
        <div className="mt-6">
          <Articles />
        </div>
      </Block>
    </main>
  )
}

export default ArticlesPage
