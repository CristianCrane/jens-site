import { useLoaderData, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { Group } from '@mantine/core'
import PageLayout from '#/components/Layout/PageLayout.tsx'
import type { QuoteFormValues } from '@features/quotes'
import QuoteForm from '@features/quotes/components/QuoteForm.tsx'
import QuoteStatus from '@features/quotes/components/QuoteStatus.tsx'
import { sendQuote } from '@features/quotes/quotes.server.tsx'

export default function QuoteView() {
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
