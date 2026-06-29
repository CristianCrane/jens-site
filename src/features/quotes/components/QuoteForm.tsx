import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
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
  Tooltip,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { FormSection, Table } from '#/components'
import type { QuoteStatus } from '#/db'
import {
  IconEdit,
  IconMapPin,
  IconNotes,
  IconPlus,
  IconUser,
  IconX,
} from '@tabler/icons-react'
import { isQuoteEditable } from '@features/quotes/quotes.utils.ts'
import type { Addon, Room } from '@features/services'
import {
  addons,
  isDifferentJobType,
  isHourlyServiceType,
  roomSizes,
  rooms,
  services,
} from '@features/services'
import type { QuoteFormValues } from '../quotes.types.ts'
import { QuoteFormValuesSchema } from '../quotes.types.ts'
import QuoteSummary from './QuoteSummary.tsx'
import { SearchOptionsButton } from './SearchOptionsButton.tsx'

type QuoteFormProps = {
  quoteId?: string
  quoteStatus?: QuoteStatus
  mode: 'view' | 'create' | 'edit'
  initialValues: QuoteFormValues
  onSubmit: (values: QuoteFormValues) => Promise<void>
}

export default function QuoteForm({
  quoteId,
  initialValues,
  onSubmit,
  mode,
  quoteStatus,
}: QuoteFormProps) {
  const readonly = mode === 'view'

  const form = useForm<QuoteFormValues>({
    initialValues,
    validate: schemaResolver(QuoteFormValuesSchema),
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (values: QuoteFormValues) => onSubmit(values),
  })

  form.watch('jobType', ({ previousValue, value }) => {
    if (isDifferentJobType(previousValue, value)) {
      form.setFieldValue('rooms', [])
      form.setFieldValue('addons', [])
      form.setFieldValue('sqft', 0)
    }
  })

  const editButton =
    quoteId && isQuoteEditable(quoteStatus) ? (
      <Tooltip label="Edit quote">
        <ActionIcon
          component={Link}
          to={`/quotes/${quoteId}/edit`}
          variant="subtle"
        >
          <IconEdit />
        </ActionIcon>
      </Tooltip>
    ) : null

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Grid gap={{ base: '2rem', lg: '3rem', xl: '4rem' }}>
        <Grid.Col span={{ base: 12, sm: 6, md: 7, xl: 8 }}>
          <fieldset
            disabled={readonly}
            style={{ border: 'none', margin: 0, padding: 0 }}
          >
            <FormSection
              icon={<IconUser />}
              title="Client details"
              action={readonly ? editButton : null}
            >
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
            <FormSection
              icon={<IconMapPin />}
              title="Job details"
              action={readonly ? editButton : null}
            >
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
            <FormSection
              icon={<IconNotes />}
              title="Quote details"
              action={readonly ? editButton : null}
            >
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
                            {readonly ? null : (
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
                            )}
                          </Group>
                        }
                        error={form.errors.rooms}
                      >
                        <Table
                          name="rooms"
                          data={form.values.rooms}
                          emptyMessage="No rooms have been added to this quote."
                          columns={[
                            {
                              header: 'Qty',
                              key: 'qty',
                              renderCell: (value, index) =>
                                readonly ? (
                                  value.qty
                                ) : (
                                  <NumberInput
                                    w="4rem"
                                    min={0}
                                    max={99}
                                    {...form.getInputProps(
                                      `rooms.${index}.qty`,
                                    )}
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
                              renderCell: (value, index) =>
                                readonly ? (
                                  value.size
                                ) : (
                                  <Chip.Group
                                    multiple={false}
                                    {...form.getInputProps(
                                      `rooms.${index}.size`,
                                    )}
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
                              header: readonly ? '' : 'Delete',
                              key: 'action',
                              align: 'right',
                              renderCell: (_, index) =>
                                readonly ? null : (
                                  <ActionIcon
                                    variant="transparent"
                                    onClick={() =>
                                      form.removeListItem('rooms', index)
                                    }
                                  >
                                    <IconX color="var(--mantine-color-gray-6)" />
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
                            {readonly ? null : (
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
                            )}
                          </Group>
                        }
                        error={form.errors.addons}
                      >
                        <Table
                          name="addons"
                          data={form.values.addons}
                          emptyMessage="No addons have been added to this quote."
                          columns={[
                            {
                              header: 'Qty',
                              key: 'qty',
                              renderCell: (value, index) =>
                                readonly ? (
                                  value.qty
                                ) : (
                                  <NumberInput
                                    w="4rem"
                                    min={1}
                                    max={99}
                                    {...form.getInputProps(
                                      `addons.${index}.qty`,
                                    )}
                                  />
                                ),
                            },
                            {
                              header: 'Name',
                              key: 'name',
                              renderCell: (value) => value.name,
                            },
                            {
                              header: readonly ? '' : 'Delete',
                              key: 'action',
                              align: 'right',
                              renderCell: (_, index) =>
                                readonly ? null : (
                                  <ActionIcon
                                    variant="transparent"
                                    onClick={() =>
                                      form.removeListItem('addons', index)
                                    }
                                  >
                                    <IconX color="var(--mantine-color-gray-6)" />
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
          </fieldset>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 5, xl: 4 }}>
          <QuoteSummary
            mode={mode}
            quoteStatus={quoteStatus}
            values={form.values}
            isPending={isPending}
            error={error}
          />
        </Grid.Col>
      </Grid>
    </form>
  )
}
