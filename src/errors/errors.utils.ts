import type { ZodType } from 'zod'
import { ValidationError } from './ValidationError.ts'

export function validate<TData>(schema: ZodType<TData>) {
  return (data: unknown) => {
    const result = schema.safeParse(data)
    if (!result.success) {
      // todo: client only receives the message and loses all context of the error. fix this by adding validation error to the message
      throw new ValidationError('Invalid request', result.error)
    }
    return result.data
  }
}
