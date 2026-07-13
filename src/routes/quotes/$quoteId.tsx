import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { NotFoundView } from '#/errors'
import { getQuote, quoteParamsSchema } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId')({
  params: {
    parse: (params) => {
      try {
        return quoteParamsSchema.parse(params)
      } catch (e) {
        throw notFound()
      }
    },
  },
  loader: async ({ params }) => {
    const quote = await getQuote({ data: params.quoteId })
    if (!quote) {
      throw notFound()
    }
    return { quote }
  },
  component: () => <Outlet />,
  notFoundComponent: () => {
    return (
      <NotFoundView
        title="Quote not found"
        details="Double check the quote number and try again."
      />
    )
  },
})
