import { createFileRoute, notFound } from '@tanstack/react-router'
import { QuoteEditForm, getQuote, quoteParamsSchema } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId/edit')({
  params: {
    parse: (params) => {
      const result = quoteParamsSchema.safeParse(params)
      if (!result.success) {
        throw notFound()
      }
      return result.data
    },
  },
  loader: async ({ params }) => {
    const quote = await getQuote({ data: params.quoteId })
    if (!quote) {
      throw notFound()
    }
    return { quote }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <QuoteEditForm />
}
