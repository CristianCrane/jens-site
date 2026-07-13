import { createFileRoute } from '@tanstack/react-router'
import { ListQuotesView, getQuotes, quotesSearchSchema } from '@features/quotes'

export const Route = createFileRoute('/quotes/')({
  validateSearch: (search) => quotesSearchSchema.parse(search),
  loaderDeps: ({ search: { page, limit, search } }) => ({
    page,
    limit,
    search,
  }),
  loader: async ({ deps }) => {
    return await getQuotes({ data: deps })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ListQuotesView />
}
