export const hasErrors = (errors: any) => {
  const errorCount = Object.values(errors).map((value) => value).length
  return errorCount != 0
}