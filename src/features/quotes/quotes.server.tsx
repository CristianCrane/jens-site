import { db } from '#/db'
import { ValidationError, validate } from '#/errors'
import { protectedServerFn } from '#/lib/serverFn.ts'
import { count, desc, eq, ilike, sql } from 'drizzle-orm'
import { Resend } from 'resend'
import { uuid } from 'zod'
import {
  QuoteConfirmationEmail,
  QuoteEmail,
  QuoteRequestEmail,
} from '../../../emails'
import { quotes } from './quotes.sql.ts'
import {
  QuoteFormValuesSchema,
  editQuoteSchema,
  quotesSearchSchema,
  requestQuoteSchema,
} from './quotes.types.ts'
import { calcQuote } from './quotes.utils.ts'

export const createQuote = protectedServerFn({ method: 'POST' })
  .validator(validate(QuoteFormValuesSchema))
  .handler(async ({ data }) => {
    const [quote] = await db
      .insert(quotes)
      .values({
        ...data,
      })
      .returning({
        id: quotes.id,
        quoteNumber: quotes.quoteNumber,
      })

    return quote
  })

export const requestQuote = protectedServerFn({ method: 'POST' })
  .validator(validate(requestQuoteSchema))
  .handler(async ({ data }) => {
    const [result] = await db
      .insert(quotes)
      .values({
        ...data,
      })
      .returning({
        id: quotes.id,
      })

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

export const getQuote = protectedServerFn({ method: 'GET' })
  .validator(validate(uuid()))
  .handler(async ({ data: quoteId }) => {
    const [quote] = await db
      .select()
      .from(quotes)
      .where(eq(quotes.id, quoteId))
      .limit(1)

    return quote ?? null
  })

export const editQuote = protectedServerFn({ method: 'POST' })
  .validator(validate(editQuoteSchema))
  .handler(async ({ data }) => {
    const { quoteId, values } = data

    const quote = await getQuote({ data: quoteId })
    if (quote.quoteStatus === 'sent' || quote.quoteStatus === 'void') {
      throw new ValidationError(
        `Quote has already been sent or cancelled. Please create another.`,
      )
    }

    const [updatedQuote] = await db
      .update(quotes)
      .set({ ...values })
      .where(eq(quotes.id, quoteId))
      .returning()

    return updatedQuote ?? null
  })

export const sendQuote = protectedServerFn({ method: 'POST' })
  .validator(validate(editQuoteSchema))
  .handler(async ({ data }) => {
    const { quoteId } = data

    const quote = await getQuote({ data: quoteId })
    if (quote.quoteStatus === 'sent' || quote.quoteStatus === 'void') {
      throw new ValidationError(
        `Quote has already been sent or cancelled. Please create another.`,
      )
    }

    const [sentQuote] = await db
      .update(quotes)
      .set({ quoteStatus: 'sent' })
      .where(eq(quotes.id, quoteId))
      .returning()

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.CLIENT_NO_REPLY_EMAIL,
      to: quote.email,
      subject: `Your ${sentQuote.jobType} quote`,
      react: (
        <QuoteEmail
          formValues={sentQuote}
          quote={calcQuote(sentQuote)}
          quoteNumber={sentQuote.quoteNumber}
        />
      ),
    })
  })

export const getQuotes = protectedServerFn({ method: 'GET' })
  .validator(validate(quotesSearchSchema))
  .handler(async ({ data }) => {
    const { page, limit, search } = data

    const offset = (page - 1) * limit
    const filter = search
      ? ilike(
          sql`cast(
          ${quotes.quoteNumber}
          as
          text
          )`,
          `%${search}%`,
        )
      : undefined

    const quoteData = await db
      .select()
      .from(quotes)
      .where(filter)
      .orderBy(desc(quotes.createdAt))
      .limit(limit)
      .offset(offset)

    const [countResult] = await db
      .select({ count: count() })
      .from(quotes)
      .where(filter)

    return {
      data: quoteData,
      totalPages: Math.ceil(countResult.count / limit),
    }
  })
