import { Link } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

type AppLinkProps = ComponentProps<'a'> & { href: string }

export const AppLink = ({ href, children, ...props }: AppLinkProps) => {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
