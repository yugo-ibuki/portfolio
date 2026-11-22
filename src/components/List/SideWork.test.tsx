import { describe, expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { SideWork } from './SideWork'

describe('SideWork', () => {
  test('keeps the detail links alongside the official sites', async () => {
    const router = createRouter({
      routeTree: createRootRoute({ component: SideWork }),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    document.body.innerHTML = renderToStaticMarkup(<RouterProvider router={router} />)

    for (const [slug, url] of [
      ['english_mentor', 'https://corp.tech-training.jp/'],
      ['programming_mentor', 'https://tech-boost.jp/'],
      ['programming_mentor_2', 'https://service.techtrain.dev/'],
    ]) {
      const title = document.querySelector(`a[href="/background/${slug}"]`)
      const officialSite = title?.parentElement?.querySelector(`a[href="${url}"]`)
      expect(officialSite?.textContent).toBe('Official site')
      expect(officialSite?.getAttribute('target')).toBe('_blank')
      expect(officialSite?.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  test('shows categorized cards with local OGP images under Tech Train', async () => {
    const router = createRouter({
      routeTree: createRootRoute({ component: SideWork }),
      history: createMemoryHistory({ initialEntries: ['/'] }),
    })
    await router.load()
    document.body.innerHTML = renderToStaticMarkup(<RouterProvider router={router} />)

    const title = document.querySelector('a[href="/background/programming_mentor_2"]')
    expect(title?.parentElement?.textContent).toContain('present')
    const projects = title?.parentElement?.parentElement?.nextElementSibling

    for (const category of ['AI Consulting', 'Workshop', 'Public Speaking']) {
      const section = projects?.querySelector(`section[aria-label="${category}"]`)
      expect(section?.querySelector('a[target="_blank"]')).not.toBeNull()
      const images = section?.querySelectorAll('a img')
      expect(images).toHaveLength(category === 'Public Speaking' ? 2 : 1)
      for (const image of images ?? []) {
        expect(image.getAttribute('width')).toBe('64')
        expect(existsSync(`public${image.getAttribute('src')}`)).toBe(true)
      }
    }
    expect(document.body.textContent).not.toContain('スッシトレイン')
  })
})
