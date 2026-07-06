import { pgEnum } from 'drizzle-orm/pg-core'
import { services } from './services.types.ts'

export const serviceName = pgEnum('service_name', services)
