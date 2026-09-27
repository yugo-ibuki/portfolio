import { afterEach, beforeEach, describe, expect, test } from 'bun:test'
import { act, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { useInViewOnce } from './useInViewOnce'

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void

let observerCallback: ObserverCallback | null = null
let disconnectCount = 0
const originalObserver = globalThis.IntersectionObserver

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback
  }

  observe() {}

  disconnect() {
    disconnectCount += 1
  }
}

const Probe = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInViewOnce(ref)

  return <div ref={ref} data-in-view={String(isInView)} />
}

describe('useInViewOnce', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    observerCallback = null
    disconnectCount = 0
    globalThis.IntersectionObserver =
      FakeIntersectionObserver as unknown as typeof IntersectionObserver
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(() => {
    act(() => root.unmount())
    container.remove()
    globalThis.IntersectionObserver = originalObserver
  })

  const readState = () => container.querySelector('div')?.getAttribute('data-in-view')

  test('is false until the element enters the viewport', () => {
    act(() => root.render(<Probe />))
    expect(readState()).toBe('false')

    act(() => observerCallback?.([{ isIntersecting: false }]))
    expect(readState()).toBe('false')
  })

  test('becomes true once and stops observing', () => {
    act(() => root.render(<Probe />))
    act(() => observerCallback?.([{ isIntersecting: true }]))

    expect(readState()).toBe('true')
    expect(disconnectCount).toBe(1)
  })
})
