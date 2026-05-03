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

export type StrictExtract<
  TOriginalType,
  TElement extends TOriginalType,
> = Extract<TOriginalType, TElement>
