import { createFileRoute } from '@tanstack/react-router'
import {
  Alert,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { authClient } from '#/lib/auth-client.ts'
import { IconCheck, IconMail } from '@tabler/icons-react'
import { useSendVerificationEmail } from '@features/auth'

export const Route = createFileRoute('/auth/verify')({
  component: RouteComponent,
})

function RouteComponent() {
  const verifyEmail = useSendVerificationEmail()
  const session = authClient.useSession()

  const usersEmail = session.data?.user.email ?? ''

  return (
    <Container display="flex" size="sm" flex={1}>
      <Paper p="xl" my="auto">
        <Stack ta="center">
          <Group justify="center">
            <ThemeIcon variant="transparent" radius="xl" size="6rem">
              <IconMail style={{ width: '100%', height: '100%' }} />
            </ThemeIcon>
          </Group>
          <Title>Please verify your email</Title>
          <Text>
            You're almost there! We sent an email to{' '}
            <strong>{usersEmail}</strong>.
          </Text>
          <Text>
            Just click the link in that email to complete your signup. If you
            don't see it, you may need to check your spam folder.
          </Text>
          <Text ta="center">Still can't find the email? No problem.</Text>
          <Button
            size="sm"
            loading={verifyEmail.isPending}
            onClick={() => verifyEmail.mutate(usersEmail)}
          >
            Resend verification email
          </Button>
          {verifyEmail.isSuccess && (
            <Alert icon={<IconCheck />}>Email sent</Alert>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}
