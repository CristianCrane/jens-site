import {
  Button,
  Card,
  Grid,
  Group,
  Input,
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

export default function QuoteForm() {
  return (
    <Section title="Request a Quote">
      <Card radius="xl" classNames={{ root: classes.card }}>
        <FormSection
          title="What type of job are you looking for?"
          subtitle="Select a job type"
          withDivider
        >
          <Radio.Group>
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
              <TextInput label="Street Address" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Street Address 2" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="City" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Zip Code" />
            </Grid.Col>
          </Grid>
        </FormSection>
        <FormSection
          title="Who can we contact about this cleaning job?"
          withDivider
        >
          <Grid>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="First Name" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Last Name" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Phone Number" />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <TextInput label="Email" />
            </Grid.Col>
          </Grid>
        </FormSection>
        <FormSection title="Tell us about the job.">
          <Textarea label="Job Description" autosize minRows={5} />
          <Input.Wrapper
            label="Job Images"
            description="Providing us with pictures of the space is the best way to get the most accurate quote."
          >
            <Dropzone
              onDrop={(files) => console.log('accepted files', files)}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              mt="xs"
            >
              <Group
                justify="center"
                gap="xl"
                mih={220}
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
          </Input.Wrapper>
        </FormSection>
        <Group justify="end">
          <Button size="lg" type="submit">
            Request a Quote
          </Button>
        </Group>
      </Card>
    </Section>
  )
}
