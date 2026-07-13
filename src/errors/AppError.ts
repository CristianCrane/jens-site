export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'DATABASE_ERROR'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
  | 'AUTHENTICATION_ERROR'

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(
    message: string,
    options?: {
      code?: ErrorCode
      statusCode?: number
      cause?: unknown
      isOperational?: boolean
    },
  ) {
    super(message, { cause: options?.cause })

    this.name = this.constructor.name
    this.code = options?.code || 'INTERNAL_ERROR'
    this.statusCode = options?.statusCode || 500

    /*
     * isOperational distinguishes between "expected" errors (bad input)
     * and "crashes" (null pointers, connection loss)
     * */
    this.isOperational = options?.isOperational ?? false

    Error.captureStackTrace(this, this.constructor)
  }
}
