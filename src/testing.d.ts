declare module 'bun:test' {
  export const describe: (label: string, fn: () => void) => void
  export const test: (label: string, fn: () => void) => void
  export const it: (label: string, fn: () => void) => void

  type Matchers = {
    toBe(expected: unknown): void
    toContain(expected: string): void
    toBeLessThan(expected: number): void
    toBeGreaterThan(expected: number): void
  }

  export const expect: <T>(actual: T) => Matchers
}

declare module 'react-dom/server' {
  import type { ReactElement } from 'react'

  export const renderToStaticMarkup: (element: ReactElement) => string
}
