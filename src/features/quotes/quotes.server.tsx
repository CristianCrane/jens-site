import { createServerFn } from '@tanstack/react-start'
import { db, quotes } from '#/db'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { QuoteConfirmationEmail, QuoteRequestEmail } from '../../../emails'
import { serverSchema } from './quotes.types.ts'

export const sendQuoteRequest = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('Expected form data')
    }

    try {
      return serverSchema.parse(data)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Zod Error:', error)
        throw new Error('Quote request error. Failed to parse data', {
          cause: error,
        })
      }
      throw new Error('Quote request error. Unexpected exception', {
        cause: error,
      })
    }
  })
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { images, ...quoteRequest } = data
    try {
      const [result] = await db
        .insert(quotes)
        .values({
          ...quoteRequest,
        })
        .returning({
          id: quotes.id,
        })

      await Promise.all([
        resend.emails.send({
          from: 'quotes@empirecleaningandpro.com',
          to: data.email,
          subject: 'Cleaning Service Quote',
          react: <QuoteConfirmationEmail data={data} />,
        }),
        resend.emails.send({
          from: 'quotes@empirecleaningandpro.com',
          to: 'empirecleaningproservices@gmail.com',
          subject: 'New Quote request',
          react: <QuoteRequestEmail data={data} id={result.id} />,
        }),
      ])
    } catch (e) {
      console.error('Failed to send email', e)
    }
  })
