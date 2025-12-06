import type { FC } from 'react'


const EMAIL_ADDRESS = 'y.ibuki91@gmail.com'

const Contact: FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">
          GET IN TOUCH
        </h3>
      </div>
      <div className="mt-8">
        <p className="text-lg text-muted-foreground mb-4">Feel free to reach out via email:</p>
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="text-2xl font-medium text-primary hover:text-primary/80 transition-colors border-b-2 border-primary/20 hover:border-primary"
        >
          {EMAIL_ADDRESS}
        </a>
      </div>
    </div>
  )
}

export default Contact
