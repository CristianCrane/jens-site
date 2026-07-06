import { timestamps } from '#/db'
import { sql } from 'drizzle-orm'
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgSequence,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core'
import { serviceName } from '@features/services'
import type { QuoteAddon, QuoteRoom } from './quotes.types.ts'

export const quoteNumberSequence = pgSequence('quote_number_sequence', {
  startWith: 1000,
})

export const quoteStatus = pgEnum('quote_status', [
  'draft',
  'sent',
  'paid',
  'void',
])

export type QuoteStatus = (typeof quoteStatus.enumValues)[number]

export const quotes = pgTable(
  'quotes',
  {
    id: uuid().primaryKey().defaultRandom(),
    quoteNumber: integer('quote_number')
      .default(sql`nextval('quote_number_sequence')`)
      .notNull(),
    quoteStatus: quoteStatus().default('draft').notNull(),
    jobType: serviceName('job_type').notNull(),
    address: text().notNull(),
    address2: text('address_2'),
    city: text().notNull(),
    zip: text().notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    phoneNumber: text('phone_number').notNull(),
    email: text().notNull(),
    jobDescription: text('job_description').notNull(),
    rooms: jsonb('rooms').$type<QuoteRoom[]>().notNull().default([]),
    addons: jsonb('addons').$type<QuoteAddon[]>().notNull().default([]),
    sqft: integer('sqft').notNull().default(0),
    ...timestamps,
  },
  (table) => [index('quote_number_idx').on(table.quoteNumber)],
)
