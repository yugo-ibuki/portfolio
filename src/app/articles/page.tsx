import { Articles, Publications } from '@components/List'
import { MotionSection } from '@/components/MotionSection'

const ArticlesPage = () => {
  return (
    <MotionSection className="space-y-10" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">WRITING & PUBLICATIONS</h3>
      </div>

      <section className="space-y-4">
        <h4 className="text-lg font-semibold tracking-tight">Platforms</h4>
        <Articles />
      </section>

      <section className="space-y-4">
        <h4 className="text-lg font-semibold tracking-tight">Publications</h4>
        <Publications />
      </section>
    </MotionSection>
  )
}

export default ArticlesPage
