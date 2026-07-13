import { z } from 'zod'

export const emailSignInSchema = z.object({
  email: z.email().nonempty('Required'),
  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters' })
    .nonempty('Required'),
})

export const emailSignUpSchema = emailSignInSchema.extend({
  name: z.string().nonempty('Required'),
})
