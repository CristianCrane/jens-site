import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSession } from '#/lib/auth-serverFn.ts'
import { LandingPage } from '@features/landing-page'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session && session.user.emailVerified) {
      throw redirect({ to: '/app' })
    }
  },
  component: LandingPage,
})
