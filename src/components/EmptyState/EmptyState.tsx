import { Stack, Text, Title } from '@mantine/core'

type EmptyStateProps = {
  title?: string
  subtitle?: string
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <Stack gap="0.25rem" ta="center" p="md">
      <Title c="dimmed" size="md">
        {title}
      </Title>
      <Text size="sm" c="dimmed">
        {subtitle}
      </Text>
    </Stack>
  )
}
