import { Link } from '@tanstack/react-router'
import {
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'

export default function NotFoundView() {
  return (
    <Container size="xs" display="flex" flex={1}>
      <Stack my="auto">
        <Group wrap="nowrap" align="center">
          <Box>
            <Text c="gray" size="xs" my="lg">
              404 - Page not found
            </Text>
            <Title size="h3" mb="xs">
              Looks like this spot was missed!
            </Title>
            <Text mb="lg">
              We’ve scrubbed every corner, but we couldn't find the page you’re
              looking for.
            </Text>
            <Button component={Link} to="/" variant="outline">
              Back to Home
            </Button>
          </Box>
          <img
            src="/empire-girl.svg"
            alt="Empire Girl with a spray bottle"
            height="150"
          />
        </Group>
      </Stack>
    </Container>
  )
}
