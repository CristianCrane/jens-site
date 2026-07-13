import { useLoaderData, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Group } from '@mantine/core'
import { PageLayout } from '#/components'
import QuoteForm from '../components/QuoteForm.tsx'
import QuoteStatus from '../components/QuoteStatus.tsx'
import { sendQuote } from '../quotes.server.tsx'
import type { QuoteFormValues } from '../quotes.types.ts'

export default function QuoteDetailsView() {
  const { quote } = useLoaderData({ from: '/quotes/$quoteId' })

  const quoteValues: QuoteFormValues = {
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

  const postQuote = useServerFn(sendQuote)
  const router = useRouter()

  const onSubmit = async (values: QuoteFormValues) => {
    await postQuote({
      data: {
        quoteId: quote.id,
        values,
      },
    })
    await router.invalidate()
    // todo: pop toast
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
        initialValues={quoteValues}
        onSubmit={onSubmit}
        mode="view"
        quoteId={quote.id}
        quoteStatus={quote.quoteStatus}
      />
    </PageLayout>
  )
}
