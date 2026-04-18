import { Articles } from '@components/List/Articles'
import { MotionSection } from '@/components/MotionSection'

const ArticlesPage = () => {
  return (
    <MotionSection className="space-y-6" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">WRITING PLATFORMS</h3>
      </div>
      <div className="mt-6">
        <Articles />
      </div>
    </MotionSection>
  )
}

export default ArticlesPage
