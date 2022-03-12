import numeral from 'numeral'

export function num2FormatString(n: number | undefined | null) {
  const string = numeral(n).format('0,0')
  return string
}
