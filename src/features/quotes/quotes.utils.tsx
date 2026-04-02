import type { FormValues } from './quotes.types.ts'

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
