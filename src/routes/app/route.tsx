import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { AppShell, Burger, Button, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getSession } from '#/lib/auth-serverFn.ts'
import { auth } from '#/lib/auth.tsx'
import { useSignOut } from '@features/auth'

const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const response = await auth.api.getSession({
    headers: getRequestHeaders(),
  })
  return response ? response.user : null
})

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: '/auth/sign-in' })
    }
    if (!session.user.emailVerified) {
      throw redirect({ to: '/auth/verify' })
    }
  },
  loader: async () => {
    const user = await getUser()

    if (!user) {
      throw redirect({ to: '/auth/sign-in' })
    }
    return { user }
  },
})

function RouteComponent() {
  const [opened, { toggle }] = useDisclosure()

  const { user } = Route.useLoaderData()
  const signOut = useSignOut()

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Hello, {user.name}!
          <Button onClick={() => signOut.mutate()} loading={signOut.isPending}>
            Sign out
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
