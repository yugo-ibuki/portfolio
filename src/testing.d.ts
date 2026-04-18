declare module 'bun:test' {
  export const afterEach: (fn: () => void | Promise<void>) => void
  export const beforeEach: (fn: () => void | Promise<void>) => void
  export const describe: (label: string, fn: () => void) => void
  export const test: (label: string, fn: () => void) => void
  export const it: (label: string, fn: () => void) => void
  export const mock: {
    module: (
      id: string,
      factory: () => Record<string, unknown> | Promise<Record<string, unknown>>
    ) => void
  }

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

declare module 'react-dom/client' {
  import type { ReactNode } from 'react'

  export type Root = {
    render(children: ReactNode): void
    unmount(): void
  }

  export const createRoot: (container: Element | DocumentFragment) => Root
}
