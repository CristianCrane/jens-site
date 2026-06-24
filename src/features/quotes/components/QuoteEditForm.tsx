import { useLoaderData, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { editQuote } from '../quotes.server.tsx'
import { type CreateQuoteFormValues } from '../quotes.types.ts'
import QuoteForm from './QuoteForm.tsx'

export default function QuoteEditForm() {
  const { quote } = useLoaderData({ from: '/quotes/$quoteId/edit' })

  const initialValues: CreateQuoteFormValues = {
    jobType: quote.jobType,
    address: quote.address,
    address2: quote.address2,
    city: quote.city,
    zip: quote.zip,
    firstName: quote.firstName,
    lastName: quote.lastName,
    phoneNumber: quote.phoneNumber,
    email: quote.email,
    jobDescription: quote.jobDescription,
    rooms: quote.rooms,
    addons: quote.addons,
    sqft: quote.sqft,
  }

  const postQuote = useServerFn(editQuote)
  const navigate = useNavigate()
  const onSubmit = async (values: CreateQuoteFormValues) => {
    await postQuote({
      data: { quoteId: quote.id, values },
    })
    await navigate({ to: '/quotes/$quoteId', params: { quoteId: quote.id } })
  }

  return (
    <QuoteForm
      title="Edit Quote"
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  )
}
