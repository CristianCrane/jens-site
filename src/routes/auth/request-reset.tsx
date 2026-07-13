import { createFileRoute } from '@tanstack/react-router'
import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'
import { z } from 'zod'
import { useRequestPasswordReset } from '@features/auth'

export const Route = createFileRoute('/auth/request-reset')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    initialValues: { email: '' },
    validate: schemaResolver(
      z.object({ email: z.email().nonempty('Required') }),
    ),
  })
  const requestReset = useRequestPasswordReset()

  return (
    <Container size="responsive" my="auto" w="100%" maw="450px">
      <Paper p="xl" w="100%" shadow="md">
        <Title mb="lg">Reset your password</Title>
        <Stack>
          <form
            onSubmit={form.onSubmit((values) =>
              requestReset.mutate(values.email),
            )}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
              <Button type="submit" size="md" loading={requestReset.isPending}>
                Reset password
              </Button>
              {requestReset.isSuccess && (
                <Alert icon={<IconCheck />}>
                  Check your email for a password reset link.
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
