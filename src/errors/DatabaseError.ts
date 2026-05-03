import { AppError } from './AppError.ts'

export class DatabaseError extends AppError {
  constructor(message: string, cause?: unknown) {
    super(message, {
      code: 'DATABASE_ERROR',
      statusCode: 500,
      cause,
      isOperational: false, // Infrastructure failures usually aren't operational
    })
  }
}
