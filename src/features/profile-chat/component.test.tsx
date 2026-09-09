import { afterEach, describe, expect, test } from 'bun:test'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { DEFAULT_PROFILE_CHAT_RESPONSE_DELAY_MS, ProfileChat } from './ProfileChat'

let mountedRoot: Root | null = null
let mountedContainer: HTMLDivElement | null = null

const renderProfileChat = async () => {
  mountedContainer = document.createElement('div')
  document.body.appendChild(mountedContainer)
  mountedRoot = createRoot(mountedContainer)

  await act(async () => {
    mountedRoot?.render(<ProfileChat responseDelayMs={10} />)
  })

  return mountedContainer
}

const wait = (durationMs: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, durationMs)
  })

afterEach(async () => {
  if (mountedRoot) {
    await act(async () => {
      mountedRoot?.unmount()
    })
  }

  mountedContainer?.remove()
  mountedRoot = null
  mountedContainer = null
  document.body.innerHTML = ''
})

describe('ProfileChat', () => {
  test('labels the experience as profile Q&A', async () => {
    const container = await renderProfileChat()

    expect(container.textContent?.includes('Profile Q&A')).toBe(true)
  })

  test('uses a slower default response delay for a writing feel', () => {
    expect(DEFAULT_PROFILE_CHAT_RESPONSE_DELAY_MS).toBe(2000)
  })

  test('keeps rendered message ids unique across repeated replies', async () => {
    const container = await renderProfileChat()
    const suggestionButton = Array.from(container.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Tell me about your works')
    )

    if (!suggestionButton) {
      throw new Error('Profile chat suggestion was not rendered')
    }

    await act(async () => {
      suggestionButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    })

    await act(async () => {
      await wait(20)
    })

    await act(async () => {
      suggestionButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    })

    await act(async () => {
      await wait(20)
    })

    const messageIds = Array.from(container.querySelectorAll('[data-message-id]')).map((element) =>
      element.getAttribute('data-message-id')
    )

    expect(messageIds.length).toBeGreaterThan(4)
    expect(new Set(messageIds).size).toBe(messageIds.length)
  })

  test('shows a writing indicator before adding the bot response', async () => {
    const container = await renderProfileChat()
    const suggestionButton = Array.from(container.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Tell me about your works')
    )

    if (!suggestionButton) {
      throw new Error('Profile chat suggestion was not rendered')
    }

    await act(async () => {
      suggestionButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    })

    expect(container.textContent?.includes('Writing')).toBe(true)
    expect(container.textContent?.includes('UnitMux')).toBe(false)
    expect(container.querySelector('.profile-chat-message-enter') !== null).toBe(true)
    expect(container.querySelector('.profile-chat-typing-bubble') !== null).toBe(true)
    expect(container.querySelectorAll('.profile-chat-typing-dot').length).toBe(3)

    await act(async () => {
      await wait(20)
    })

    expect(container.textContent?.includes('Writing')).toBe(false)
    expect(container.textContent?.includes('UnitMux')).toBe(true)
    expect(container.querySelectorAll('.profile-chat-message-text p').length).toBeGreaterThan(1)
  })
})
