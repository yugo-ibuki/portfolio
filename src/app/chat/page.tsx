import type { Metadata } from 'next'
import { MotionSection } from '@/components/MotionSection'
import { ProfileChat } from '@/features/profile-chat/ProfileChat'

export const metadata: Metadata = {
  title: 'Chat',
}

const Chat = () => {
  return (
    <MotionSection className="space-y-6 pb-24" delayIndex={0}>
      <div className="flex items-baseline justify-between border-b pb-2 mb-4">
        <h3 className="text-2xl font-semibold tracking-tight">CHAT</h3>
      </div>
      <ProfileChat />
    </MotionSection>
  )
}

export default Chat
