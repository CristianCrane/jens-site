import { createFileRoute } from '@tanstack/react-router'
import { QuoteRequestForm } from '@features/quotes'

export const Route = createFileRoute('/quotes/request')({
  component: QuoteRequestForm,
})
