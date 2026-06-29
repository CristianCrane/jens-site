import { useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import PageLayout from '#/components/Layout/PageLayout.tsx'
import { createQuote } from '../quotes.server.tsx'
import type { QuoteFormValues } from '../quotes.types.ts'
import QuoteForm from './QuoteForm.tsx'

const defaultInitialValues: QuoteFormValues = {
  jobType: 'Residential Cleaning',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  address2: '',
  city: '',
  zip: '',
  jobDescription: '',
  rooms: [],
  addons: [],
  sqft: 0,
}

export default function QuoteCreateForm() {
  const postQuote = useServerFn(createQuote)
  const navigate = useNavigate()
  const onSubmit = async (values: QuoteFormValues) => {
    const quote = await postQuote({
      data: values,
    })
    await navigate({ to: '/quotes/$quoteId', params: { quoteId: quote.id } })
  }

  return (
    <PageLayout title="Create Quote">
      <QuoteForm
        mode="create"
        initialValues={defaultInitialValues}
        onSubmit={onSubmit}
      />
    </PageLayout>
  )
}
