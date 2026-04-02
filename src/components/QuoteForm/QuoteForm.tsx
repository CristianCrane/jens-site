import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Input,
  LoadingOverlay,
  Radio,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import classes from './QuoteForm.module.css'
import FormSection from '#/components/QuoteForm/FormSection.tsx'
import Section from '#/components/Section/Section.tsx'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import RadioOption from '#/components/QuoteForm/RadioOption.tsx'
import services from '#/components/Services/services-data.tsx'
import { useForm } from '@mantine/form'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useServerFn } from '@tanstack/react-start'
import type { FormValues } from '#/components/QuoteForm/utils.tsx'
import {
  clientSchema,
  sendQuoteRequest,
  toFormData,
} from '#/components/QuoteForm/utils.tsx'
import { useMutation } from '@tanstack/react-query'
import { IconInfo } from '@react-email/preview-server/src/components/icons/icon-info.tsx'
import FormSuccess from '#/components/QuoteForm/FormSuccess.tsx'

export default function QuoteForm() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      jobType: '',
      address: '',
      address2: '',
      city: '',
      zip: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      jobDescription: '',
      images: [],
    },
    validate: zod4Resolver(clientSchema),
  })

  const postQuote = useServerFn(sendQuoteRequest)
  const { mutate, isSuccess, isPending, error } = useMutation({
    mutationFn: (formData: FormData) => postQuote({ data: formData }),
  })

  if (isSuccess) {
    return <FormSuccess />
  }

  return (
    <form onSubmit={form.onSubmit((values) => mutate(toFormData(values)))}>
      <Section title="Request a Quote">
        <Card radius="xl" classNames={{ root: classes.card }}>
          <LoadingOverlay
            visible={isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{
              size: 'xl',
            }}
          />
          <FormSection
            title="What type of job are you looking for?"
            subtitle="Select a job type"
            withDivider
          >
            <Radio.Group {...form.getInputProps('jobType')}>
              <Grid gutter="lg">
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
          <FormSection title="Where's the job located?" withDivider>
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
          <FormSection
            title="Who can we contact about this cleaning job?"
            withDivider
          >
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
            <Input.Wrapper
              label="Job Images"
              description="If you have any pictures to share, its a great way to help us give an accurate quote."
            >
              <Dropzone
                onDrop={(files) =>
                  files.forEach((file) => form.insertListItem('images', file))
                }
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                mt="xs"
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={150}
                  style={{ pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      size={52}
                      color="var(--mantine-color-blue-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      size={52}
                      color="var(--mantine-color-red-6)"
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      size={52}
                      color="var(--mantine-color-dimmed)"
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              <Group my="xl">
                {form.values.images?.map((image, index) => (
                  <Badge
                    key={`image-${index}`}
                    variant="default"
                    color="blue"
                    size="lg"
                    radius="md"
                    rightSection={
                      <ActionIcon
                        variant="light"
                        color="gray"
                        size="sm"
                        onClick={() => form.removeListItem('images', index)}
                      >
                        <IconX />
                      </ActionIcon>
                    }
                  >
                    {image.name}
                  </Badge>
                ))}
              </Group>
            </Input.Wrapper>
          </FormSection>
          <Group justify="end">
            <Button size="lg" type="submit" disabled={isPending}>
              Request a Quote
            </Button>
          </Group>
          {error && (
            <Alert
              variant="light"
              color="red"
              title="Oops. Something went wrong"
              icon={<IconInfo />}
              mt="2rem"
            >
              Sorry about that! The error has been sent to our team. In the
              meantime, please call us at (646) 320-9076 and we'll be happy to
              finish your quote.
            </Alert>
          )}
        </Card>
      </Section>
    </form>
  )
}
