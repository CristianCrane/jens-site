import { useEffect, useState } from 'react'
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import {
  Anchor,
  Button,
  Group,
  Pagination,
  Stack,
  TextInput,
  ThemeIcon,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Table } from '#/components'
import PageLayout from '#/components/Layout/PageLayout.tsx'
import { toRelativeDateFormat } from '#/utils'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { serviceConfigs } from '@features/services'
import QuoteStatus from '../components/QuoteStatus.tsx'

export default function ListQuotesView() {
  const { page, search } = useSearch({ from: '/quotes/' })
  const { data, totalPages } = useLoaderData({ from: '/quotes/' })
  const navigate = useNavigate({ from: '/quotes/' })

  const [searchValue, setSearchValue] = useState(search)
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 300)

  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearchValue, page: 1 }),
    })
  }, [debouncedSearchValue])

  const handlePageChange = (newPage: number) =>
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    })

  return (
    <PageLayout
      title="Quotes"
      action={
        <Group>
          <TextInput
            leftSection={<IconSearch />}
            placeholder="Search by quote number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <Button
            component={Link}
            to="/quotes/create"
            size="sm"
            leftSection={<IconPlus />}
          >
            New Quote
          </Button>
        </Group>
      }
    >
      <Stack>
        <Table
          name="quotes-table"
          data={data}
          columns={[
            {
              header: 'Quote Number',
              key: 'quoteNumber',
              renderCell: (value) => (
                <Anchor component={Link} to={`/quotes/${value.id}`}>
                  # {value.quoteNumber}
                </Anchor>
              ),
            },
            {
              header: 'Client',
              key: 'client',
              renderCell: (value) => `${value.firstName} ${value.lastName}`,
            },
            {
              header: 'Job Type',
              key: 'jobType',
              renderCell: (value) => {
                const Icon = serviceConfigs[value.jobType].icon
                return (
                  <Group gap="xs" wrap="nowrap">
                    <ThemeIcon variant="transparent" size="sm">
                      <Icon />
                    </ThemeIcon>
                    {value.jobType}
                  </Group>
                )
              },
            },
            {
              header: 'Status',
              key: 'status',
              renderCell: (value) => <QuoteStatus status={value.quoteStatus} />,
            },
            {
              header: 'Created',
              key: 'createdAt',
              renderCell: (value) => toRelativeDateFormat(value.createdAt),
            },
          ]}
          emptyMessage="No quotes to display."
        />
        <Pagination
          total={totalPages}
          value={page}
          onChange={handlePageChange}
          layout="responsive"
        />
      </Stack>
    </PageLayout>
  )
}
