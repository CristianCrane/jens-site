import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '#/lib/auth.tsx'
import { protectedServerFn } from '#/lib/serverFn.ts'

export const getSession = protectedServerFn({ method: 'GET' }).handler(
  async () => {
    return await auth.api.getSession({
      headers: getRequestHeaders(),
    })
  },
)
