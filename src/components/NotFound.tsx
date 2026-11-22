import { AppLink } from '@/components/AppLink'
import type { FC } from 'react'

const Custom404: FC = () => {
  return (
    <div className="flex h-[700px] w-full flex-col items-center justify-center gap-3">
      <h2>Page not found</h2>
      <AppLink href="/" className="text-sm underline underline-offset-4 hover:text-primary">
        Back to home
      </AppLink>
    </div>
  )
}

export default Custom404
