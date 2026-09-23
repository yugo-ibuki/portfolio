export const siteNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Works', href: '/works' },
  { name: 'Background', href: '/background' },
  { name: 'Articles', href: '/articles' },
  { name: 'Presentation', href: '/presentation' },
  { name: 'Contact', href: '/contact' },
] as const

export const isNavigationItemActive = (pathname: string, href: string) => {
  if (href === '/') {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
