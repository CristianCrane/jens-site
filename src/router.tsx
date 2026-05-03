import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { validateEnvironmentVariables } from '#/validate-env.ts'
import { routeTree } from './routeTree.gen'

validateEnvironmentVariables()

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
