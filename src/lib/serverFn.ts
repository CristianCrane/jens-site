import { createServerFn } from '@tanstack/react-start'
import { telemetryMiddleware } from '#/lib/middleware.ts'

export const protectedServerFn = createServerFn().middleware([
  telemetryMiddleware,
])
