import { z } from 'zod'
import { createIsomorphicFn } from '@tanstack/react-start'

const ServerEnv = z.object({
  DATABASE_URL: z.url('Invalid database URL'),
})

const ClientEnv = z.object({
  VITE_APP_NAME: z.string(),
  VITE_GOOGLE_MAPS_API_KEY: z.string(),
})

export const validateEnvironmentVariables = createIsomorphicFn()
  .client(() => {
    try {
      ClientEnv.parse(import.meta.env)
    } catch (e) {
      let error = `Unknown error`
      if (e instanceof z.ZodError) {
        error = JSON.stringify(e.issues, null, 2)
      }
      throw new Error(`❌ Client environment error: ${error}`)
    }
  })
  .server(() => {
    try {
      ServerEnv.parse(process.env)
    } catch (e) {
      let error = 'Unknown error'
      if (e instanceof z.ZodError) {
        error = JSON.stringify(e.issues, null, 2)
      }
      throw new Error(`❌ Server environment error: ${error}`)
    }
  })
