import { createFileRoute } from '@tanstack/react-router'
import { FormSuccess } from '@features/quotes'

export const Route = createFileRoute('/quotes/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FormSuccess />
}
