import { createFileRoute } from '@tanstack/react-router'
import QuoteForm from '#/components/QuoteForm/QuoteForm.tsx'

export const Route = createFileRoute('/quote')({
  component: QuoteForm,
})
