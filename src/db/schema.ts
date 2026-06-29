import { sql } from 'drizzle-orm'
import * as t from 'drizzle-orm/pg-core'
import { pgEnum, pgTable } from 'drizzle-orm/pg-core'
import type { QuoteAddon, QuoteRoom } from '@features/quotes'
import { services } from '@features/services'

const timestamps = {
  updatedAt: t.timestamp('updated_at'),
  createdAt: t.timestamp('created_at').defaultNow().notNull(),
  deletedAt: t.timestamp('deleted_at'),
}

export const quoteNumberSequence = t.pgSequence('quote_number_sequence', {
  startWith: 1000,
})

export const quoteStatus = pgEnum('quote_status', [
  'draft',
  'sent',
  'paid',
  'void',
])

export type QuoteStatus = (typeof quoteStatus.enumValues)[number]

export const serviceName = pgEnum('service_name', services)

export const quotes = pgTable('quotes', {
  id: t.uuid().primaryKey().defaultRandom(),
  quoteNumber: t
    .integer('quote_number')
    .default(sql`nextval('quote_number_sequence')`)
    .notNull(),
  quoteStatus: quoteStatus().default('draft').notNull(),
  jobType: serviceName('job_type').notNull(),
  address: t.text().notNull(),
  address2: t.text('address_2'),
  city: t.text().notNull(),
  zip: t.text().notNull(),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name'),
  phoneNumber: t.text('phone_number').notNull(),
  email: t.text().notNull(),
  jobDescription: t.text('job_description').notNull(),
  rooms: t.jsonb('rooms').$type<QuoteRoom[]>().notNull().default([]),
  addons: t.jsonb('addons').$type<QuoteAddon[]>().notNull().default([]),
  sqft: t.integer('sqft').notNull().default(0),
  ...timestamps,
})
