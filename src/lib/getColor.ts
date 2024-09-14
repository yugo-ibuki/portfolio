export const getColor = (count: number) => {
  switch (true) {
    case count === 0:
      return '#ebedf0'
    case count < 5:
      return '#9be9a8'
    case count < 10:
      return '#40c463'
    case count < 20:
      return '#30a14e'
    default:
      return '#216e39'
  }
}
