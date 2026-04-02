import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import QuoteConfirmationEmail from '../../../emails/QuoteConfirmationEmail.tsx'
import QuoteRequestEmail from '../../../emails/QuoteRequestEmail.tsx'

export const clientSchema = z.object({
  jobType: z.string().nonempty('Please select a job type.'),
  address: z.string().nonempty('Required'),
  address2: z.string().optional(),
  city: z.string().nonempty('Required'),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, 'Invalid US ZIP code')
    .nonempty('Required'),
  firstName: z.string().nonempty('Required'),
  lastName: z.string().optional(),
  phoneNumber: z.string().nonempty('Required'),
  email: z.email().nonempty('Required'),
  jobDescription: z.string().nonempty('Required'),
  images: z.array(z.file().max(5_000_000).mime(IMAGE_MIME_TYPE)).optional(),
})

export type FormValues = z.infer<typeof clientSchema>

export const serverSchema = zfd.formData({
  jobType: zfd.text().nonoptional(),
  address: zfd.text().nonoptional(),
  address2: zfd.text(),
  city: zfd.text().nonoptional(),
  zip: zfd.text().nonoptional(),
  firstName: zfd.text().nonoptional(),
  lastName: zfd.text(),
  phoneNumber: zfd.text().nonoptional(),
  email: zfd.text().nonoptional(),
  jobDescription: zfd.text().nonoptional(),
  images: zfd.repeatable(z.array(zfd.file())),
})

export const toFormData = (values: FormValues) => {
  const formData = new FormData()

  formData.append('jobType', values.jobType)
  formData.append('address', values.address)
  formData.append('address2', values.address2 || '')
  formData.append('city', values.city)
  formData.append('zip', values.zip)
  formData.append('firstName', values.firstName)
  formData.append('lastName', values.lastName || '')
  formData.append('phoneNumber', values.phoneNumber)
  formData.append('email', values.email)
  formData.append('jobDescription', values.jobDescription)
  values.images?.forEach((file) => formData.append('images', file))

  return formData
}

export const sendQuoteRequest = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('Expected form data')
    }

    try {
      return serverSchema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Zod Error:', error)
        throw new Error('Quote request error. Failed to parse data', {
          cause: error,
        })
      }
      throw new Error('Quote request error. Unexpected exception', {
        cause: error,
      })
    }
  })
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    try {
      // todo: integrate a db and save quote, pass the quoteID to the templates
      await resend.emails.send({
        from: 'quotes@empirecleaningandpro.com',
        to: 'empirecleaningproservices@gmail.com',
        subject: 'Cleaning Service Quote',
        react: <QuoteConfirmationEmail data={data} />,
      })
      await resend.emails.send({
        from: 'quotes@empirecleaningandpro.com',
        to: 'empirecleaningproservices@gmail.com',
        subject: 'New Quote request',
        react: <QuoteRequestEmail data={data} />,
      })
      console.log('Quote sent!')
    } catch (e) {
      console.error('Failed to send email', e)
    }
  })
