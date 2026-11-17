import { notFound } from '@tanstack/react-router'
import { getSideWorkBySlug } from '@/content/background'

export const getBackgroundDetail = (name: string) => {
  const data = getSideWorkBySlug(name)
  if (!data) throw notFound()
  return data
}
