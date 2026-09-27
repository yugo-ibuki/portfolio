const pluralize = (count: number, unit: string): string =>
  `${count} ${unit}${count === 1 ? '' : 's'}`

// 経験年数を表示用に整形する（1年未満は月数で表す）
export const formatSkillTerm = (years: number): string => {
  if (years < 1) {
    return pluralize(Math.max(1, Math.round(years * 12)), 'month')
  }

  return pluralize(years, 'year')
}
