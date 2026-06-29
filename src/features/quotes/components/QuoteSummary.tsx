import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { EmptyState } from '#/components'
import type { QuoteStatus } from '#/db'
import { toCurrencyFormat } from '#/utils'
import {
  IconAlertCircle,
  IconDeviceFloppy,
  IconMailShare,
} from '@tabler/icons-react'
import type { QuoteFormValues } from '../quotes.types.ts'
import { calcQuote, isQuoteEditable } from '../quotes.utils.ts'
import classes from './QuoteCalculator.module.css'

type QuoteProps = {
  values: QuoteFormValues
  isPending: boolean
  error: Error | null
  mode: 'view' | 'create' | 'edit'
  quoteStatus?: QuoteStatus
}

export default function QuoteSummary({
  values,
  isPending,
  error,
  mode,
  quoteStatus,
}: QuoteProps) {
  const quote = calcQuote(values)

  return (
    <Stack className={`${classes.quote} ${classes.sticky}`}>
      <Box className={classes.quoteHeader}>
        <Title size="xl">Quote</Title>
      </Box>
      <Box>
        {quote.items.length ? (
          <Box>
            {quote.items.map((item, index) => (
              <Box key={`quote-item-${index}`}>
                <Group align="start" justify="space-between" py="md">
                  <Group align="start">
                    <Text>{item.qty}</Text>
                    <Box>
                      <Text>{item.name}</Text>
                      {item.description ? (
                        <Text size="sm" c="dimmed">
                          {item.description}
                        </Text>
                      ) : null}
                    </Box>
                  </Group>
                  {toCurrencyFormat(item.price)}
                </Group>
                {index < quote.items.length - 1 ? <Divider /> : null}
              </Box>
            ))}
          </Box>
        ) : (
          <EmptyState subtitle="Nothing has been added to this quote yet." />
        )}
      </Box>
      <Box className={classes.quoteFooter}>
        <Stack gap="xs" mb="md">
          <Group justify="space-between">
            <Text>Subtotal</Text>
            <Text>{toCurrencyFormat(quote.subtotal)}</Text>
          </Group>
          <Group justify="space-between">
            <Text>Taxes</Text>
            <Text>{toCurrencyFormat(quote.taxes)}</Text>
          </Group>
          <Group justify="space-between">
            <Text fw="bold" size="lg">
              Total
            </Text>
            <Text fw="bold" size="lg">
              {toCurrencyFormat(quote.total)}
            </Text>
          </Group>
        </Stack>
        <Button
          type="submit"
          fullWidth
          loading={isPending}
          leftSection={
            mode === 'view' ? <IconMailShare /> : <IconDeviceFloppy />
          }
          disabled={!isQuoteEditable(quoteStatus)}
        >
          {mode === 'view' ? 'Send Quote' : 'Save Quote'}
        </Button>
        {error && (
          <Alert
            variant="light"
            color="red"
            title="Oops. Something went wrong"
            icon={<IconAlertCircle />}
            mt="2rem"
          >
            {error.message}
          </Alert>
        )}
      </Box>
    </Stack>
  )
}
