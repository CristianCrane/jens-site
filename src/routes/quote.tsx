import { createFileRoute } from '@tanstack/react-router'
import { QuoteForm } from '@features/quotes'

export const Route = createFileRoute('/quote')({
  component: QuoteForm,
})
