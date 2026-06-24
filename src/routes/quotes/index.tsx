import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quotes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/quotes/"!</div>
}
