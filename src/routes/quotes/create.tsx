import { createFileRoute } from '@tanstack/react-router'
import { CreateQuoteView } from '@features/quotes'

export const Route = createFileRoute('/quotes/create')({
  component: CreateQuoteView,
})
