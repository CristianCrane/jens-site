import type { ZodError } from 'zod'
import { AppError } from './AppError.ts'

export class ValidationError extends AppError {
  constructor(message: string, cause?: ZodError) {
    super(message, {
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      cause,
    })
  }
}
