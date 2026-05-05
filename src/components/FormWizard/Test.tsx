import { TextInput } from '@mantine/core'
import FormWizard from '#/components/FormWizard/FormWizard.tsx'
import { z } from 'zod'

type FormValues = {
  test1: string
  test2: string
  test3: string
}

const validationSchema = z.object({
  test1: z.string().nonempty('Test 1 needs a thing.'),
  test2: z.string().nonempty('Test 2 needs a thing.'),
  test3: z.string().nonempty('Test 3 needs a thing.'),
})

export function TestForm() {
  const defaultValues: FormValues = {
    test2: '',
    test3: '',
    test1: '',
  }

  return (
    <FormWizard
      initialValues={defaultValues}
      validationSchema={validationSchema}
      steps={[
        {
          title: 'Step 1',
          schema: validationSchema.pick({ test1: true }),
          renderStep: (form) => (
            <TextInput label="Test 1" {...form.getInputProps('test1')} />
          ),
        },
        {
          title: 'Step 2',
          schema: validationSchema.pick({ test2: true }),
          renderStep: (form) => (
            <TextInput label="Test 2" {...form.getInputProps('test2')} />
          ),
        },
        {
          title: 'Step 3',
          schema: validationSchema.pick({ test3: true }),
          renderStep: (form) => (
            <TextInput label="Test 3" {...form.getInputProps('test3')} />
          ),
        },
      ]}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2))
        return Promise.resolve(true)
      }}
      onSubmitLabel="Send it!"
    />
  )
}
