import { createFileRoute } from '@tanstack/react-router'
import { TestForm } from '#/components/FormWizard/Test.tsx'

export const Route = createFileRoute('/quotes/wizard')({
  component: TestForm,
})
