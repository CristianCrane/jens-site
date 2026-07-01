import { createFileRoute } from '@tanstack/react-router'
import { RequestQuoteView } from '@features/quotes'

export const Route = createFileRoute('/quotes/request')({
  component: RequestQuoteView,
})
