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
    const duration = (performance.now() - startTime).toFixed(2)
    const { name } = serverFnMeta

    if (e instanceof AppError && e.isOperational) {
      console.log(`[INFO] ${name} failed | duration: ${duration}ms`, e)
    } else if (e instanceof AppError) {
      console.error(`[ERROR] ${name} failed | duration: ${duration}ms`, e)
    } else {
      console.error(
        `[UNEXPECTED ERROR] ${name} failed | duration: ${duration}ms`,
        e,
      )
    }
    throw e
  }
})
