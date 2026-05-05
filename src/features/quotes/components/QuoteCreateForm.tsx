import { useMutation } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import {
  ActionIcon,
  Chip,
  Grid,
  Group,
  Input,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { FormSection, Section, Table } from '#/components'
import { IconPlus, IconTrashX } from '@tabler/icons-react'
import type { Addon, Room } from '@features/services'
import {
  addons,
  isDifferentJobType,
  isHourlyServiceType,
  roomSizes,
  rooms,
  services,
} from '@features/services'
import { createQuote } from '../quotes.server.tsx'
import type { CreateQuoteFormValues } from '../quotes.types.ts'
import { createQuoteFormValuesSchema } from '../quotes.types.ts'
import QuoteSummary from './QuoteSummary.tsx'
import { SearchOptionsButton } from './SearchOptionsButton.tsx'

const defaultInitialValues: CreateQuoteFormValues = {
  jobType: 'Residential Cleaning',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  address: '',
  address2: '',
  city: '',
  zip: '',
  jobDescription: '',
  rooms: [],
  addons: [],
  sqft: 0,
}

export default function QuoteCreateForm() {
  const postQuote = useServerFn(createQuote)

  const form = useForm<CreateQuoteFormValues>({
    initialValues: defaultInitialValues,
    validate: schemaResolver(createQuoteFormValuesSchema),
  })

  const { mutate, isSuccess, isPending, error } = useMutation({
    mutationFn: (values: CreateQuoteFormValues) => postQuote({ data: values }),
  })

  form.watch('jobType', ({ previousValue, value }) => {
    if (isDifferentJobType(previousValue, value)) {
      form.setFieldValue('rooms', [])
      form.setFieldValue('addons', [])
      form.setFieldValue('sqft', 0)
    }
  })

  if (isSuccess) {
    return <div>success</div>
  }

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Section title="Create Quote">
        <Grid gap={{ base: '2rem', lg: '3rem', xl: '4rem' }}>
          <Grid.Col span={{ base: 12, sm: 6, md: 7, xl: 8 }}>
            <FormSection title="Client details">
              <Grid>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput
                    label="First Name"
                    {...form.getInputProps('firstName')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    {...form.getInputProps('lastName')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput
                    label="Phone number"
                    {...form.getInputProps('phoneNumber')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput label="Email" {...form.getInputProps('email')} />
                </Grid.Col>
              </Grid>
            </FormSection>
            <FormSection title="Job Details">
              <Grid>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput
                    label="Address"
                    {...form.getInputProps('address')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput
                    label="Address 2"
                    {...form.getInputProps('address2')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput label="City" {...form.getInputProps('city')} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
                  <TextInput label="Zip code" {...form.getInputProps('zip')} />
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Textarea
                    label="Job Description"
                    placeholder="(Example) A two bedroom apartment with a kitchen, 2 bathrooms, and a basement with a lot of dust..."
                    autosize
                    minRows={3}
                    {...form.getInputProps('jobDescription')}
                  />
                </Grid.Col>
              </Grid>
            </FormSection>
            <FormSection title="Quote details">
              <Grid>
                <Grid.Col span={{ base: 12, xs: 6, sm: 12 }}>
                  <Select
                    label="Job type"
                    allowDeselect={false}
                    data={services}
                    comboboxProps={{ shadow: 'md' }}
                    {...form.getInputProps('jobType')}
                  />
                </Grid.Col>
                {isHourlyServiceType(form.values.jobType) ? (
                  <>
                    <Grid.Col>
                      <Input.Wrapper
                        styles={{ label: { width: '100%' } }}
                        label={
                          <Group align="end" justify="space-between" mb="xs">
                            Rooms
                            <SearchOptionsButton
                              data={rooms.map((room) => room)}
                              label="Room"
                              placeholder="Search rooms"
                              icon={<IconPlus />}
                              onSelectOption={(room) => {
                                form.insertListItem('rooms', {
                                  name: room as Room,
                                  qty: 1,
                                  size: 'Medium',
                                })
                                form.validateField('rooms')
                                form.validateField('addons')
                              }}
                            />
                          </Group>
                        }
                        error={form.errors.rooms}
                      >
                        <Table
                          name="rooms"
                          data={form.values.rooms}
                          emptyMessage="No rooms added yet."
                          columns={[
                            {
                              header: 'Qty',
                              key: 'qty',
                              renderCell: (_, index) => (
                                <NumberInput
                                  w="4rem"
                                  min={0}
                                  max={99}
                                  {...form.getInputProps(`rooms.${index}.qty`)}
                                />
                              ),
                            },
                            {
                              header: 'Room',
                              key: 'name',
                              renderCell: (value) => value.name,
                            },
                            {
                              header: 'Size',
                              key: 'size',
                              renderCell: (_, index) => (
                                <Chip.Group
                                  multiple={false}
                                  {...form.getInputProps(`rooms.${index}.size`)}
                                >
                                  <Group wrap="nowrap" gap="xs">
                                    {roomSizes.map((size) => (
                                      <Chip
                                        variant="light"
                                        key={size}
                                        value={size}
                                        size="xs"
                                      >
                                        {size}
                                      </Chip>
                                    ))}
                                  </Group>
                                </Chip.Group>
                              ),
                            },
                            {
                              header: 'Delete',
                              key: 'action',
                              align: 'right',
                              renderCell: (_, index) => (
                                <ActionIcon
                                  variant="transparent"
                                  onClick={() =>
                                    form.removeListItem('rooms', index)
                                  }
                                >
                                  <IconTrashX color="var(--mantine-color-gray-6)" />
                                </ActionIcon>
                              ),
                            },
                          ]}
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col>
                      <Input.Wrapper
                        styles={{ label: { width: '100%' } }}
                        label={
                          <Group align="end" justify="space-between" mb="xs">
                            Addons
                            <SearchOptionsButton
                              data={addons.map((addon) => addon)}
                              label="Addon"
                              placeholder="Search addons"
                              icon={<IconPlus />}
                              onSelectOption={(addon) => {
                                form.insertListItem('addons', {
                                  name: addon as Addon,
                                  qty: 1,
                                })
                                form.validateField('rooms')
                                form.validateField('addons')
                              }}
                            />
                          </Group>
                        }
                        error={form.errors.addons}
                      >
                        <Table
                          name="addons"
                          data={form.values.addons}
                          emptyMessage="No addons added yet."
                          columns={[
                            {
                              header: 'Qty',
                              key: 'qty',
                              renderCell: (_, index) => (
                                <NumberInput
                                  w="4rem"
                                  min={1}
                                  max={99}
                                  {...form.getInputProps(`addons.${index}.qty`)}
                                />
                              ),
                            },
                            {
                              header: 'Name',
                              key: 'name',
                              renderCell: (value) => value.name,
                            },
                            {
                              header: 'Delete',
                              key: 'action',
                              align: 'right',
                              renderCell: (_, index) => (
                                <ActionIcon
                                  variant="transparent"
                                  onClick={() =>
                                    form.removeListItem('addons', index)
                                  }
                                >
                                  <IconTrashX color="var(--mantine-color-gray-6)" />
                                </ActionIcon>
                              ),
                            },
                          ]}
                        />
                      </Input.Wrapper>
                    </Grid.Col>
                  </>
                ) : (
                  <NumberInput
                    label="Square feet"
                    min={1}
                    {...form.getInputProps(`sqft`)}
                  />
                )}
              </Grid>
            </FormSection>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 5, xl: 4 }}>
            <QuoteSummary
              values={form.values}
              isPending={isPending}
              error={error}
            />
          </Grid.Col>
        </Grid>
      </Section>
    </form>
  )
}
