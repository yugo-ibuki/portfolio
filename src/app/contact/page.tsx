import type { FC } from 'react'
import { Block, Title } from '@components'

const EMAIL_ADDRESS = 'y.ibuki91@gmail.com'

const Contact: FC = () => {
  return (
    <main className="w-full">
      <Block className="w-full max-w-none px-0">
        <div className="px-6">
          <Title>GET IN TOUCH</Title>
        </div>
        <div className="mt-8 px-6 text-center">
          <p className="text-lg mb-4">Feel free to reach out via email:</p>
          <a 
            href={`mailto:${EMAIL_ADDRESS}`}
            className="text-xl font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {EMAIL_ADDRESS}
          </a>
        </div>
      </Block>
    </main>
  )
}

export default Contact
