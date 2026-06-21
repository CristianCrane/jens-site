import { Center, Stack, Text, Title } from '@mantine/core'
import { AppError } from '../AppError.ts'

export default function ErrorView({ error }: { error: Error }) {
  const isAppError = error instanceof AppError

  return (
    <Center>
      <Stack>
        <Title c="red">{isAppError ? error.code : 'Unexpected Error'}</Title>
        <Text c="red" size="sm">
          {error.message}
        </Text>

        {/* Only show technical details in development */}
        {process.env.NODE_ENV === 'development' && (
          <pre>{JSON.stringify(error.cause, null, 2)}</pre>
        )}
      </Stack>
    </Center>
  )
}
