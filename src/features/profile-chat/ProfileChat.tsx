'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Bot, Send, UserRound } from 'lucide-react'
import { Button } from '@/components/components/ui/button'
import { cn } from '@/lib/utils'
import { buildProfileChatReply, getSuggestedProfileQuestions } from './response'

type ChatMessage = {
  id: number
  role: 'bot' | 'user'
  text: string
}

type PendingReply = {
  id: number
  text: string
}

type ProfileChatProps = {
  responseDelayMs?: number
}

export const DEFAULT_PROFILE_CHAT_RESPONSE_DELAY_MS = 2000

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'bot',
    text: "Hi. I can answer questions about Yugo Ibuki's profile, including skills, career, works, and mentoring experience.",
  },
]

const MessageText = ({ text }: { text: string }) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className="profile-chat-message-text space-y-2">
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={`${paragraph}-${paragraphIndex}`} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export const ProfileChat = ({
  responseDelayMs = DEFAULT_PROFILE_CHAT_RESPONSE_DELAY_MS,
}: ProfileChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [pendingReply, setPendingReply] = useState<PendingReply | null>(null)
  const suggestedQuestions = getSuggestedProfileQuestions()

  useEffect(() => {
    if (!pendingReply) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: pendingReply.id,
          role: 'bot',
          text: pendingReply.text,
        },
      ])
      setPendingReply(null)
    }, responseDelayMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [pendingReply, responseDelayMs])

  const submitQuestion = (question: string) => {
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || pendingReply) {
      return
    }

    const userMessageId = Math.max(...messages.map((message) => message.id)) + 1
    const botMessageId = userMessageId + 1

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: userMessageId,
        role: 'user',
        text: trimmedQuestion,
      },
    ])
    setPendingReply({
      id: botMessageId,
      text: buildProfileChatReply(trimmedQuestion),
    })
    setInput('')
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitQuestion(input)
  }

  return (
    <div className="flex min-h-[640px] flex-col rounded-lg border bg-card/80 shadow-sm backdrop-blur">
      <div className="border-b px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Profile Q&A</h2>
            <p className="text-sm text-muted-foreground">
              Ask about Yugo Ibuki&apos;s profile in a conversational way.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.map((message) => {
          const isUserMessage = message.role === 'user'

          return (
            <div
              key={message.id}
              data-message-id={message.id}
              data-role={message.role}
              className={cn(
                'profile-chat-message-enter flex items-end gap-3',
                isUserMessage ? 'justify-end' : 'justify-start'
              )}
            >
              {!isUserMessage && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </div>
              )}

              <div
                className={cn(
                  'max-w-[78%] rounded-lg px-4 py-3 text-sm leading-relaxed sm:max-w-[68%]',
                  isUserMessage
                    ? 'bg-primary text-primary-foreground'
                    : 'border bg-background text-foreground'
                )}
              >
                <MessageText text={message.text} />
              </div>

              {isUserMessage && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
          )
        })}
        {pendingReply && (
          <div
            data-role="bot"
            className="profile-chat-message-enter flex items-end justify-start gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </div>
            <div
              className="profile-chat-typing-bubble flex items-center gap-1 rounded-lg border bg-background px-4 py-3 text-sm text-muted-foreground"
              aria-live="polite"
            >
              <span>Writing</span>
              <span className="inline-flex gap-1" aria-hidden="true">
                <span className="profile-chat-typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span className="profile-chat-typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                <span className="profile-chat-typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t px-4 py-4 sm:px-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              disabled={pendingReply !== null}
              className="rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              onClick={() => submitQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>

        <form className="flex gap-2" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="profile-chat-input">
            Ask about Yugo Ibuki
          </label>
          <input
            id="profile-chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={pendingReply !== null}
            className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary"
            placeholder="Ask about Yugo..."
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send message"
            disabled={pendingReply !== null}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </div>
  )
}
