import type { FC } from 'react'
import { MotionSection } from '@/components/MotionSection'

const EMAIL_ADDRESS = 'y.ibuki91@gmail.com'

const Contact: FC = () => {
  return (
    <MotionSection className="space-y-6" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">GET IN TOUCH</h3>
      </div>
      <div className="mt-8">
        <p className="text-lg text-muted-foreground mb-4">Feel free to reach out via email:</p>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="text-2xl font-medium text-primary border-b-2 border-primary/20 hover:text-primary/80 hover:border-primary transition-[color,border-color,transform] duration-200 ease-out motion-reduce:transition-none"
        >
          {EMAIL_ADDRESS}
        </a>
      </div>
    </MotionSection>
  )
}

export default Contact
