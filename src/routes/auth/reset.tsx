import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import {
  Alert,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { z } from 'zod'
import { useResetPassword } from '@features/auth'

const searchParamsSchema = z.object({
  token: z.string().nonempty().catch(''),
  error: z.string().optional(),
})

const formSchema = z
  .object({
    newPassword: z.string().min(8).nonempty('Required'),
    confirmPassword: z.string().min(8).nonempty(),
  })
  .refine(
    ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
    {
      error: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export const Route = createFileRoute('/auth/reset')({
  component: RouteComponent,
  validateSearch: (search) => {
    const result = searchParamsSchema.safeParse(search)

    if (result.error || result.data.error) {
      throw redirect({ to: '/auth/request-reset' })
    }

    return result.data
  },
})

function RouteComponent() {
  const { token } = Route.useSearch()
  const form = useForm({
    initialValues: { newPassword: '' },
    validate: schemaResolver(formSchema),
  })
  const requestReset = useResetPassword()

  return (
    <Container size="responsive" my="auto" w="100%" maw="450px">
      <Paper p="xl" w="100%" shadow="md">
        <Title mb="lg">Reset your password</Title>
        <Stack>
          <form
            onSubmit={form.onSubmit(async ({ newPassword }) => {
              await requestReset.mutateAsync({ token, newPassword })
              form.reset()
            })}
          >
            <Stack>
              <PasswordInput
                label="Password"
                placeholder="********"
                {...form.getInputProps('newPassword')}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="********"
                {...form.getInputProps('confirmPassword')}
              />
              <Button type="submit" size="md" loading={requestReset.isPending}>
                Update password
              </Button>
              {requestReset.isSuccess && (
                <Alert icon={<IconCheck />}>
                  Your password has been reset.{' '}
                  <Link to="/auth/sign-in">Sign in</Link>
                </Alert>
              )}
              {requestReset.error ? (
                <Alert icon={<IconAlertCircle />} color="red">
                  {requestReset.error.message}
                </Alert>
              ) : null}
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  )
}
