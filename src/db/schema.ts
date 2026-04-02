import * as t from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

const timestamps = {
  updatedAt: t.timestamp('updated_at'),
  createdAt: t.timestamp('created_at').defaultNow().notNull(),
  deletedAt: t.timestamp('deleted_at'),
}

export const quotes = pgTable(
  'quotes',
  {
    id: t.uuid().primaryKey().defaultRandom(),
    jobType: t.varchar('job_type').notNull(),
    address: t.varchar().notNull(),
    address2: t.varchar('address_2'),
    city: t.varchar().notNull(),
    zip: t.varchar().notNull(),
    firstName: t.varchar('first_name').notNull(),
    lastName: t.varchar('last_name'),
    phoneNumber: t.varchar('phone_number').notNull(),
    email: t.varchar().notNull(),
    jobDescription: t.varchar('job_description'),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('email_idx').on(table.email)],
)
