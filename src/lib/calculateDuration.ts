import { differenceInMonths, differenceInYears, parse } from 'date-fns'

export const calculateDuration = (startDate: string, endDate: string | null): string => {
  const start = parse(startDate, 'yyyy-MM', new Date())
  const end = endDate ? parse(endDate, 'yyyy-MM', new Date()) : new Date()

  const years = differenceInYears(end, start)
  const months = differenceInMonths(end, start) % 12

  if (years === 0) {
    return months === 1 ? '(1 month)' : `(${months} months)`
  } else if (years === 1 && months === 0) {
    return '(1 year)'
  } else if (months === 0) {
    return `(${years} years)`
  } else {
    return `(${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''})`
  }
}
