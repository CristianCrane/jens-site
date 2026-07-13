import { useLoaderData, useNavigate, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Group } from '@mantine/core'
import { PageLayout } from '#/components'
import QuoteForm from '../components/QuoteForm.tsx'
import QuoteStatus from '../components/QuoteStatus.tsx'
import { editQuote } from '../quotes.server.tsx'
import type { QuoteFormValues } from '../quotes.types.ts'

export default function EditQuoteView() {
  const { quote } = useLoaderData({ from: '/quotes/$quoteId' })

  const initialValues: QuoteFormValues = {
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
  const router = useRouter()
  const onSubmit = async (values: QuoteFormValues) => {
    await postQuote({
      data: { quoteId: quote.id, values },
    })
    await router.invalidate()
    await navigate({ to: '/quotes/$quoteId', params: { quoteId: quote.id } })
  }

  return (
    <PageLayout
      title={
        <Group>
          Quote #{quote.quoteNumber}
          <QuoteStatus status={quote.quoteStatus} />
        </Group>
      }
    >
      <QuoteForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        mode="edit"
      />
    </PageLayout>
  )
}
