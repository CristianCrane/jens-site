import type { ReactNode } from 'react'
import { Table as MantineTable, Text } from '@mantine/core'
import classes from './Table.module.css'

type TableProps<TData> = {
  name: string
  data: TData[]
  columns: {
    header: string
    key: keyof TData | string
    renderCell: (value: TData, index: number) => ReactNode
    align?: 'right' | 'center' | 'left'
  }[]
  emptyMessage: string
}

export default function Table<TData extends Record<string, unknown>>({
  name,
  data,
  columns,
  emptyMessage,
}: TableProps<TData>) {
  const rows = data.map((item, rowIndex) => (
    <MantineTable.Tr key={`tr-${name}-${rowIndex}`}>
      {columns.map(({ key, renderCell, align }, colIndex) => (
        <MantineTable.Td
          key={`td-${String(key)}-${colIndex}`}
          align={align ?? 'left'}
        >
          {renderCell(item, rowIndex)}
        </MantineTable.Td>
      ))}
    </MantineTable.Tr>
  ))

  return (
    <MantineTable.ScrollContainer
      minWidth="100%"
      m={0}
      p={0}
      style={{
        border: '1px solid var(--mantine-color-default-border)',
        borderRadius: 'var(--mantine-radius-md)',
        backgroundColor: 'white',
      }}
    >
      <MantineTable classNames={{ table: classes.table }}>
        <MantineTable.Thead>
          <MantineTable.Tr>
            {columns.map((column, index) => (
              <MantineTable.Th
                key={`header-${column}-${index}`}
                ta={column.align ?? 'left'}
              >
                {column.header}
              </MantineTable.Th>
            ))}
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>
          {rows.length ? (
            rows
          ) : (
            <MantineTable.Tr>
              <MantineTable.Td colSpan={columns.length}>
                <Text size="sm" ta="center" p="lg" c="dimmed">
                  {emptyMessage}
                </Text>
              </MantineTable.Td>
            </MantineTable.Tr>
          )}
        </MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
  )
}
