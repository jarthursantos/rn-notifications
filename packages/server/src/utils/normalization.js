export function normalizeInt(number) {
  if (typeof number === 'string') {
    return parseInt(number)
  }

  return number
}
