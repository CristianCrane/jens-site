import { createFileRoute } from '@tanstack/react-router'
import { QuoteView } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuoteView />
}
