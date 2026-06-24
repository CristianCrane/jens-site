import { Link } from '@tanstack/react-router'
import { Box, Button, Container, Stack, Text, Title } from '@mantine/core'

// todo: looks bad and need to figure out how to get custom errors over the wire
export default function ErrorView({ error }: { error: Error }) {
  return (
    <Container size="xs" display="flex" flex={1}>
      <Stack my="auto">
        <Box>
          <Title size="h3" mb="xs">
            Unexpected Error
          </Title>
          <Text mb="lg">{error.message}</Text>
          <Button component={Link} to="/" variant="outline">
            Back to Home
          </Button>
        </Box>

        {/* Only show technical details in development */}
        {process.env.NODE_ENV === 'development' && (
          <pre>{JSON.stringify(error.cause, null, 2)}</pre>
        )}
      </Stack>
    </Container>
  )
}
