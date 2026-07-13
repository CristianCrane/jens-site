import type { JSX } from 'react'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type SendEmailOptions = {
  to: string
  subject: string
  template: JSX.Element
}

export async function sendEmail({ to, subject, template }: SendEmailOptions) {
  return resend.emails.send({
    from: process.env.CLIENT_NO_REPLY_EMAIL,
    to,
    subject,
    react: template,
  })
}
