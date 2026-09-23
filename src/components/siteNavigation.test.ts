import { describe, expect, test } from 'bun:test'
import { isNavigationItemActive, siteNavigation } from './siteNavigation'

describe('siteNavigation', () => {
  test('contains every primary portfolio route', () => {
    expect(siteNavigation.map((item) => item.href)).toEqual([
      '/',
      '/works',
      '/background',
      '/articles',
      '/presentation',
      '/contact',
    ])
  })

  test('marks nested routes under their parent while keeping home exact', () => {
    expect(isNavigationItemActive('/', '/')).toBe(true)
    expect(isNavigationItemActive('/works', '/')).toBe(false)
    expect(isNavigationItemActive('/background/company', '/background')).toBe(true)
    expect(isNavigationItemActive('/articles', '/articles')).toBe(true)
  })
})
