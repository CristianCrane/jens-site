import { createFileRoute } from '@tanstack/react-router'
import { QuoteDetailsView } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuoteDetailsView />
}
