import { Link } from '@tanstack/react-router'
import {
  Anchor,
  Button,
  Container,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'

export default function SignInView() {
  return (
    <Container size="responsive" my="auto" w="100%" maw="450px">
      <Paper p="xl" w="100%" shadow="md">
        <Stack>
          <Title>Sign in</Title>
          <TextInput label="Email" placeholder="your@email.com" />
          <PasswordInput label="Password" placeholder="****" />
          <Button size="md">Sign in</Button>
          <Anchor size="sm" component={Link} to="/auth/reset" ta="center">
            Forgot your password?
          </Anchor>
          <Divider label="or" />
          <Button
            variant="default"
            size="md"
            leftSection={
              <img src="/google-login-logo.svg" alt="Google login logo" />
            }
          >
            Sign in with Google
          </Button>
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
