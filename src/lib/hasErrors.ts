export const hasErrors = (errors: Record<string, unknown>) => {
  return Object.keys(errors).length > 0
}