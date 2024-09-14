import { format, parse } from 'date-fns'

export const formatDate = (dateString: string): string => {
  const date = parse(dateString, 'yyyy-MM', new Date())
  return format(date, 'yyyy.M')
}
