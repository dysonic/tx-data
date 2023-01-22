const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const base = 1000

export function niceBytes(n: number) {
  let l = 0
  while (n >= base && ++l) {
    n = n / base
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]
}
