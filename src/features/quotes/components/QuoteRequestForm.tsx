import { useMutation } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import {
  Alert,
  Button,
  Grid,
  Group,
  Radio,
  TextInput,
  Textarea,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { FormSection, Section } from '#/components'
import { IconAlertCircle } from '@tabler/icons-react'
import { services } from '@features/landing-page'
import { requestQuote } from '../quotes.server.tsx'
import type { QuoteRequestFormValues } from '../quotes.types.ts'
import { quoteDetailsSchema } from '../quotes.types.ts'
import FormSuccess from './FormSuccess.tsx'
import RadioOption from './RadioOption.tsx'

export default function QuoteRequestForm() {
  const form = useForm<QuoteRequestFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      jobType: 'Residential Cleaning',
      address: '',
      address2: '',
      city: '',
      zip: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      jobDescription: '',
    },
    validate: schemaResolver(quoteDetailsSchema),
  })

  const postQuote = useServerFn(requestQuote)
  const { mutate, isSuccess, isPending, error } = useMutation({
    mutationFn: (formData: QuoteRequestFormValues) =>
      postQuote({ data: formData }),
  })

  if (isSuccess) {
    return <FormSuccess />
  }

  return (
    <Section title="Request a Quote">
      <form onSubmit={form.onSubmit((values) => mutate(values))}>
        <FormSection
          title="What type of job are you looking for?"
          subtitle="Select a job type"
        >
          <Radio.Group {...form.getInputProps('jobType')}>
            <Grid gap="lg">
              {services.map((service, index) => (
                <Grid.Col span={{ base: 12, md: 6 }} key={`service-${index}`}>
                  <RadioOption
                    icon={service.icon}
                    label={service.title}
                    value={service.title}
                    description={service.description}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Radio.Group>
        </FormSection>
        <FormSection title="Where's the job located?">
          <Grid>
            <Grid.Col span={{ md: 6 }}>
              <TextInput
                label="Street Address"
                {...form.getInputProps('address')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput
                label="Street Address 2"
                {...form.getInputProps('address2')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="City" {...form.getInputProps('city')} />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Zip Code" {...form.getInputProps('zip')} />
            </Grid.Col>
          </Grid>
        </FormSection>
        <FormSection title="Who can we contact about this cleaning job?">
          <Grid>
            <Grid.Col span={{ md: 6 }}>
              <TextInput
                label="First Name"
                {...form.getInputProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput
                label="Last Name"
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput
                label="Phone Number"
                {...form.getInputProps('phoneNumber')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Email" {...form.getInputProps('email')} />
            </Grid.Col>
          </Grid>
        </FormSection>
        <FormSection title="Tell us about the job.">
          <Textarea
            label="Job Description"
            placeholder="(Example) A two bedroom apartment with a kitchen, 2 bathrooms, and a basement with a lot of dust..."
            autosize
            minRows={5}
            {...form.getInputProps('jobDescription')}
          />
        </FormSection>
        <Group justify="end">
          <Button type="submit" loading={isPending}>
            Request a Quote
          </Button>
        </Group>
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Oops. Something went wrong"
            icon={<IconAlertCircle />}
            mt="2rem"
          >
            Sorry about that! The error has been sent to our team. In the
            meantime, please call us at (646) 320-9076 and we'll be happy to
            finish your quote.
          </Alert>
        )}
      </form>
    </Section>
  )
}
