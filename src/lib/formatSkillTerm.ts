// 経験年数を短い表記に整形する（1年未満は月数で表す）
export const formatSkillTerm = (years: number): string => {
  if (years < 1) {
    return `${Math.max(1, Math.round(years * 12))}mo`
  }

  return `${years}y`
}
