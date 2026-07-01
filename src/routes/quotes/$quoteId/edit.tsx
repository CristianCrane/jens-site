import { createFileRoute } from '@tanstack/react-router'
import { EditQuoteView } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditQuoteView />
}
