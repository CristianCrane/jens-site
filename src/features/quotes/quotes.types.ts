import { IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

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

export type FormValues = z.infer<typeof clientSchema>
