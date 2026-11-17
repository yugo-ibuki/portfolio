import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { AppLink } from './AppLink'

describe('AppLink', () => {
  test('keeps external links as anchors with their security attributes', () => {
    const markup = renderToStaticMarkup(
      <AppLink href="https://github.com/yugo-ibuki" target="_blank" rel="noreferrer">
        GitHub
      </AppLink>
    )
    expect(markup).toContain('href="https://github.com/yugo-ibuki"')
    expect(markup).toContain('rel="noreferrer"')
  })

  test('renders internal links with the router while preserving the public URL', async () => {
    const routeTree = createRootRoute({ component: () => <AppLink href="/works">Works</AppLink> })
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    const markup = renderToStaticMarkup(<RouterProvider router={router} />)
    expect(markup).toContain('href="/works"')
    expect(markup).toContain('Works</a>')
  })
})
