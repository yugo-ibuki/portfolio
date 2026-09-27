export const siteNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Works', href: '/works' },
  { name: 'Background', href: '/background' },
  { name: 'Writing', href: '/articles' },
] as const

export const isNavigationItemActive = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
