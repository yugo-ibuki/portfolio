export const hasErrors = (errors: Record<string, any>) => {
  return Object.keys(errors).length > 0
}