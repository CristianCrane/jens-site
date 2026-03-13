import { z } from 'zod'

const ServerEnv = z.object({
  DATABASE_URL: z.url('Invalid database URL')
})

const ClientEnv = z.object({
  VITE_APP_NAME: z.string()
})

// validate server environment
try {
  ServerEnv.parse(process.env)
} catch (e) {
  let error = 'Unknown error'
  if (e instanceof z.ZodError) {
    error = JSON.stringify(e.issues, null, 2)
  }
  throw new Error(`❌ Server environment error: ${error}`)
}

// validate client environment
try {
  ClientEnv.parse(import.meta.env)
} catch (e) {
  let error = `Unknown error`
  if (e instanceof z.ZodError) {
    error = JSON.stringify(e.issues, null, 2)
  }
  throw new Error(`❌ Client environment error: ${error}`)
}