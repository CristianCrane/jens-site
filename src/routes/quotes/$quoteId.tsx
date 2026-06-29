import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { NotFoundView } from '#/errors'
import { getQuote, quoteParamsSchema } from '@features/quotes'

export const Route = createFileRoute('/quotes/$quoteId')({
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
