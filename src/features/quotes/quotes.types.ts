import { z } from 'zod'
import {
  addons,
  isHourlyServiceType,
  isSqftServiceType,
  roomSizes,
  rooms,
  services,
} from '@features/services'
import type { quoteStatus } from './quotes.sql.ts'

const jobTypeSchema = z.enum(services)

export type QuoteStatus = (typeof quoteStatus.enumValues)[number]

export const quoteDetailsSchema = z.object({
  jobType: jobTypeSchema,
  address: z.string().nonempty('Required'),
  address2: z.string().nullable(),
  city: z.string().nonempty('Required'),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code')
    .nonempty('Required'),
  firstName: z.string().nonempty('Required'),
  lastName: z.string().nullable(),
  phoneNumber: z
    .string()
    .nonempty('Required')
    .length(10, 'Invalid phone number'),
  email: z.email().nonempty('Required'),
  jobDescription: z.string().nonempty('Required'),
})

export const requestQuoteSchema = quoteDetailsSchema

export type QuoteRequestFormValues = z.infer<typeof quoteDetailsSchema>

export const roomQuoteFormValueSchema = z.object({
  qty: z.number().positive(),
  name: z.enum(rooms),
  size: z.enum(roomSizes),
})

export type QuoteRoom = z.infer<typeof roomQuoteFormValueSchema>

export const addonQuoteFormValueSchema = z.object({
  qty: z.number().positive(),
  name: z.enum(addons),
})

export type QuoteAddon = z.infer<typeof addonQuoteFormValueSchema>

export const quoteItemSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty().optional(),
  qty: z.number(),
  price: z.number(),
})

export type QuoteSummaryItem = z.infer<typeof quoteItemSchema>

export const quoteSchema = z.object({
  items: z.array(quoteItemSchema),
  subtotal: z.number().nonnegative(),
  taxes: z.number().nonnegative(),
  total: z.number().nonnegative(),
})

export type Quote = z.infer<typeof quoteSchema>

export const QuoteFormValuesSchema = quoteDetailsSchema
  .extend({
    rooms: z.array(roomQuoteFormValueSchema),
    addons: z.array(addonQuoteFormValueSchema),
    sqft: z.number(),
  })
  .refine(
    (data) => {
      if (
        isHourlyServiceType(data.jobType) &&
        !data.rooms.length &&
        !data.addons.length
      ) {
        return false
      }
      return true
    },
    {
      path: ['rooms'],
      message: 'At least 1 room or addon is required.',
    },
  )
  .refine(
    (data) => {
      if (
        isHourlyServiceType(data.jobType) &&
        !data.rooms.length &&
        !data.addons.length
      ) {
        return false
      }
      return true
    },
    {
      path: ['addons'],
      message: 'At least 1 room or addon is required.',
    },
  )
  .refine(
    (data) => {
      if (isSqftServiceType(data.jobType) && !data.sqft) {
        return false
      }
      return true
    },
    {
      path: ['sqft'],
      message: 'Required',
    },
  )

export type QuoteFormValues = z.infer<typeof QuoteFormValuesSchema>

export const quoteParamsSchema = z.object({
  quoteId: z.uuid(),
})

export const editQuoteSchema = quoteParamsSchema.extend({
  values: QuoteFormValuesSchema,
})

export const quotesSearchSchema = z.object({
  page: z.number().catch(1),
  limit: z.number().catch(10),
  search: z.string().catch(''),
})
