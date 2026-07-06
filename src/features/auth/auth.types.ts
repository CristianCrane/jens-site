import { z } from 'zod'

export const emailSignUpSchema = z.object({
  name: z.string().nonempty('Whats your name?'),
  email: z.email().nonempty(),
  password: z
    .string()
    .min(8, { error: 'Please create a password with at least 8 characters.' })
    .nonempty(),
})
