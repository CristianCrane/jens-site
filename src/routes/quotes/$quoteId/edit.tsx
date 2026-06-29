import { createFileRoute } from '@tanstack/react-router'
import { QuoteEditForm } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <QuoteEditForm />
}
