import { createFileRoute } from '@tanstack/react-router'
import { QuoteCreateForm } from '@features/quotes'

export const Route = createFileRoute('/quotes/create')({
  component: QuoteCreateForm,
})
