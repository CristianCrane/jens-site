import type { ZodType } from 'zod'
import { ValidationError } from './ValidationError.ts'

export function validate<TData>(schema: ZodType<TData>) {
  return (data: unknown) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new ValidationError('Invalid request', result.error)
    }
    return result.data
  }
}
