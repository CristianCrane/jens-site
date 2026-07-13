import { db } from '#/db'
import { sendEmail } from '#/lib/email.ts'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import * as authSchema from '@/features/users'
import PasswordResetEmail from '../../emails/PasswordResetEmail.tsx'
import VerificationEmail from '../../emails/VerificationEmail.tsx'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      sendEmail({
        to: user.email,
        subject: 'Reset your password',
        template: <PasswordResetEmail url={url} />,
      })
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        template: <VerificationEmail url={url} />,
      })
    },
  },
  plugins: [tanstackStartCookies()],
})
