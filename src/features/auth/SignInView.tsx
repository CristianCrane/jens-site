import { Link } from '@tanstack/react-router'
import {
  Alert,
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { useEmailSignIn, useSocialSignIn } from './auth.hooks.ts'
import { emailSignInSchema } from './auth.types.ts'

export default function SignInView() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: schemaResolver(emailSignInSchema),
  })

  const emailSignIn = useEmailSignIn()
  const socialSignIn = useSocialSignIn()

  return (
    <Container size="responsive" my="auto" w="100%" maw="450px">
      <Paper p="xl" w="100%" shadow="md">
        <Title mb="lg">Sign in</Title>
        <Stack>
          <Button
            variant="default"
            size="md"
            leftSection={
              <img src="/google-login-logo.svg" alt="Google login logo" />
            }
            onClick={() => socialSignIn.mutate('google')}
            loading={socialSignIn.isPending}
          >
            Sign in with Google
          </Button>
          {socialSignIn.error ? (
            <Alert icon={<IconAlertCircle />} color="red">
              {socialSignIn.error.message}
            </Alert>
          ) : null}
          <Divider label="or" />
          <form
            onSubmit={form.onSubmit((values) => emailSignIn.mutate(values))}
          >
            <Stack>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                labelProps={{
                  w: '100%',
                }}
                label={
                  <Group justify="space-between" w="100%">
                    Password
                    <Anchor
                      size="sm"
                      component={Link}
                      to="/auth/request-reset"
                      ta="center"
                    >
                      Forgot your password?
                    </Anchor>
                  </Group>
                }
                placeholder="****"
                {...form.getInputProps('password')}
              />
              <Button type="submit" size="md" loading={emailSignIn.isPending}>
                Sign in
              </Button>
              {emailSignIn.error ? (
                <Alert icon={<IconAlertCircle />} color="red">
                  {emailSignIn.error.message}
                </Alert>
              ) : null}
            </Stack>
          </form>
          <Text size="sm" ta="center">
            Don't have an account?{' '}
            <Anchor component={Link} to="/auth/sign-up">
              Sign up
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Container>
  )
}
