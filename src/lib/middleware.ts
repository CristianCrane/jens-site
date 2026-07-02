import { createMiddleware } from '@tanstack/react-start'
import { AppError } from '#/errors'

export const telemetryMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next, serverFnMeta }) => {
  const startTime = performance.now()
  try {
    const result = await next()
    const duration = performance.now() - startTime
    console.log(
      `[METRIC]: ${serverFnMeta.name} success | duration: ${duration.toFixed(2)}ms`,
    )
    return result
  } catch (e) {
    const duration = performance.now() - startTime

    if (e instanceof AppError && e.isOperational) {
      console.log(
        `[INFO] Execution failed | duration: ${duration.toFixed(2)}ms`,
        e,
      )
    } else if (e instanceof AppError) {
      console.error(
        `[ERROR] Execution failed | duration: ${duration.toFixed(2)}ms`,
        e,
      )
    } else {
      console.error(
        `[UNEXPECTED ERROR] Execution failed | duration: ${duration.toFixed(2)}ms`,
        e,
      )
    }
    throw e
  }
})
