import {
  Alert,
  Button,
  Container,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { useEmailSignUp, useSocialSignIn } from '@features/auth/auth.hooks.ts'
import { emailSignUpSchema } from '@features/auth/auth.types.ts'

export default function SignUpView() {
  const emailSignUp = useEmailSignUp()
  const socialSignIn = useSocialSignIn()

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: schemaResolver(emailSignUpSchema),
  })

  return (
    <Container size="responsive" my="auto" w="100%" maw="450px">
      <Paper p="xl" w="100%" shadow="md">
        <Stack>
          <Title>Sign up</Title>
          <form
            onSubmit={form.onSubmit((values) => emailSignUp.mutate(values))}
          >
            <Stack>
              <TextInput
                label="Name"
                placeholder="John Doe"
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="****"
                {...form.getInputProps('password')}
              />
              <Button type="submit" size="md" loading={emailSignUp.isPending}>
                Create account
              </Button>
              {emailSignUp.error ? (
                <Alert title="Sign up error" color="red">
                  {emailSignUp.error.message}
                </Alert>
              ) : null}
            </Stack>
          </form>
          <Divider label="or" />
          <Button
            variant="default"
            size="md"
            leftSection={
              <img src="/google-login-logo.svg" alt="Google login logo" />
            }
            onClick={() => socialSignIn.mutate({ provider: 'google' })}
            loading={socialSignIn.isPending}
          >
            Sign in with Google
          </Button>
          {socialSignIn.error ? (
            <Alert title="Sign up error" color="red">
              {socialSignIn.error.message}
            </Alert>
          ) : null}
        </Stack>
      </Paper>
    </Container>
  )
}
