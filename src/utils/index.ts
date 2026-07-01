/**
 * A type-safe version of Object.entries
 */
export const entries = <TKey extends string, TValue>(
  obj: Record<TKey, TValue>,
) => {
  return Object.entries(obj) as [TKey, TValue][]
}

/**
 * A type-safe version of Object.keys
 */
export const keys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function toCurrencyFormat(price: number) {
  return currencyFormatter.format(price)
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const units: { unit: Intl.RelativeTimeFormatUnit; amount: number }[] = [
  { unit: 'year', amount: 31536000 },
  { unit: 'month', amount: 2592000 },
  { unit: 'day', amount: 86400 },
  { unit: 'hour', amount: 3600 },
  { unit: 'minute', amount: 60 },
  { unit: 'second', amount: 1 },
]

export function toRelativeDateFormat(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor(date.getTime() - now.getTime()) / 1000

  for (const { unit, amount } of units) {
    if (Math.abs(diffInSeconds) >= amount || unit === 'second') {
      const value = Math.round(diffInSeconds / amount)
      return rtf.format(value, unit)
    }
  }

  return 'just now'
}
