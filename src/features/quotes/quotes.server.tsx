import { createServerFn } from '@tanstack/react-start'
import { db, quotes } from '#/db'
import { validate } from '#/errors'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import { uuid } from 'zod'
import {
  QuoteConfirmationEmail,
  QuoteEmail,
  QuoteRequestEmail,
} from '../../../emails'
import {
  createQuoteFormValuesSchema,
  editQuoteSchema,
  requestQuoteSchema,
} from './quotes.types.ts'
import { calcQuote } from './quotes.utils.ts'

export const createQuote = createServerFn({ method: 'POST' })
  .validator(validate(createQuoteFormValuesSchema))
  .handler(async ({ data }) => {
    // todo: database errors
    const [result] = await db
      .insert(quotes)
      .values({
        ...data,
      })
      .returning({
        id: quotes.id,
        quoteNumber: quotes.quoteNumber,
      })

    // todo: resend errors
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.CLIENT_NO_REPLY_EMAIL,
      to: data.email,
      subject: `Your ${data.jobType} quote`,
      react: (
        <QuoteEmail
          formValues={data}
          quote={calcQuote(data)}
          quoteNumber={result.quoteNumber}
        />
      ),
    })
  })

export const requestQuote = createServerFn({ method: 'POST' })
  .validator(validate(requestQuoteSchema))
  .handler(async ({ data }) => {
    // todo: database errors
    const [result] = await db
      .insert(quotes)
      .values({
        ...data,
      })
      .returning({
        id: quotes.id,
      })

    // todo: resend errors
    const resend = new Resend(process.env.RESEND_API_KEY)
    await Promise.all([
      resend.emails.send({
        from: process.env.CLIENT_NO_REPLY_EMAIL,
        to: data.email,
        subject: 'We got your request!',
        react: <QuoteConfirmationEmail data={data} />,
      }),
      resend.emails.send({
        from: process.env.CLIENT_NO_REPLY_EMAIL,
        to: 'empirecleaningproservices@gmail.com', // todo: replace with real email, testing only
        subject: 'New Quote request',
        react: <QuoteRequestEmail formValues={data} quoteId={result.id} />,
      }),
    ])
  })

export const getQuote = createServerFn({ method: 'GET' })
  .validator(validate(uuid()))
  .handler(async ({ data: quoteId }) => {
    const [quote] = await db
      .select()
      .from(quotes)
      .where(eq(quotes.id, quoteId))
      .limit(1)

    return quote ?? null
  })

export const editQuote = createServerFn({ method: 'POST' })
  .validator(validate(editQuoteSchema))
  .handler(async ({ data }) => {
    const { quoteId, values } = data
    const [updatedQuote] = await db
      .update(quotes)
      .set({ ...values })
      .where(eq(quotes.id, quoteId))
      .returning()

    return updatedQuote ?? null
  })
