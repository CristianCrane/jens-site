import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quotes/$quoteId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/quotes/$quoteId/"!</div>
}
