export function extractAccount(url = '') {
  return url.split('account=')[1]
}
