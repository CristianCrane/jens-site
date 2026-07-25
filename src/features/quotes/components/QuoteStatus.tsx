import type { MantineColor } from '@mantine/core'
import { Badge } from '@mantine/core'
import type { QuoteStatus } from '../quotes.types.ts'

const statusColors: Record<QuoteStatus, MantineColor> = {
  draft: 'yellow',
  sent: 'green',
  paid: 'green',
  void: 'gray',
}

export default function QuoteStatus({ status }: { status: QuoteStatus }) {
  const color = statusColors[status]
  return (
    <Badge radius="md" color={color} size="lg">
      {status}
    </Badge>
  )
}
