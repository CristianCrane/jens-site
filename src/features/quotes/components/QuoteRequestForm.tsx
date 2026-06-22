import { useServerFn } from '@tanstack/react-start'
import {
  Container,
  Grid,
  MaskInput,
  Radio,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { FormWizard } from '#/components'
import { serviceConfigs, services } from '@features/services'
import { requestQuote } from '../quotes.server.tsx'
import type { QuoteRequestFormValues } from '../quotes.types.ts'
import { quoteDetailsSchema } from '../quotes.types.ts'
import RadioOption from './RadioOption.tsx'

export default function QuoteRequestForm() {
  const postQuote = useServerFn(requestQuote)

  const initialValues: QuoteRequestFormValues = {
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
  }

  return (
    <Container size="md" maw="66rem">
      <Title ta="center" mb="lg">
        Request a quote
      </Title>
      <FormWizard
        initialValues={initialValues}
        validationSchema={quoteDetailsSchema}
        steps={[
          {
            title: 'What type of cleaning are you looking for?',
            schema: quoteDetailsSchema.pick({ jobType: true }),
            renderStep: (form) => (
              <Radio.Group {...form.getInputProps('jobType')}>
                <Grid gap="lg">
                  {services.map((service, index) => {
                    const Icon = serviceConfigs[service].icon
                    return (
                      <Grid.Col
                        span={{ base: 12, md: 6 }}
                        key={`service-${index}`}
                      >
                        <RadioOption
                          icon={<Icon />}
                          label={service}
                          value={service}
                          description={serviceConfigs[service].description}
                        />
                      </Grid.Col>
                    )
                  })}
                </Grid>
              </Radio.Group>
            ),
          },
          {
            title: "Where's the cleaning located?",
            schema: quoteDetailsSchema.pick({
              address: true,
              address2: true,
              city: true,
              zip: true,
            }),
            renderStep: (form) => (
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
            ),
          },
          {
            title: 'Who can we contact about this cleaning?',
            schema: quoteDetailsSchema.pick({
              firstName: true,
              lastName: true,
              phoneNumber: true,
              email: true,
            }),
            renderStep: (form) => (
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
                  {/* MaskInput is uncontrolled, don't pass value. Use 'onChangeRaw' to update formstate instead. */}
                  <MaskInput
                    mask="(999) 999-9999"
                    placeholder="(___) ___-____"
                    label="Phone Number"
                    defaultValue={
                      form.getInputProps('phoneNumber').defaultValue
                    }
                    onBlur={form.getInputProps('phoneNumber').onBlur}
                    onChange={form.getInputProps('phoneNumber').onChange}
                    onFocus={form.getInputProps('phoneNumber').onFocus}
                    error={form.getInputProps('phoneNumber').error}
                    onChangeRaw={(raw) =>
                      form.setFieldValue('phoneNumber', raw)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ md: 6 }}>
                  <TextInput label="Email" {...form.getInputProps('email')} />
                </Grid.Col>
              </Grid>
            ),
          },
          {
            title: 'Tell us a bit about the cleaning.',
            schema: quoteDetailsSchema.pick({
              jobDescription: true,
            }),
            renderStep: (form) => (
              <Textarea
                label="Job Description"
                placeholder="(Example) A two bedroom apartment with a kitchen, 2 bathrooms, and a basement with a lot of dust..."
                autosize
                minRows={5}
                {...form.getInputProps('jobDescription')}
              />
            ),
          },
        ]}
        onSubmit={(values) => postQuote({ data: values })}
      />
    </Container>
  )
}
