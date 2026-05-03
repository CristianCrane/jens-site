import type { ReactNode } from 'react'
import { Group, Radio, Text, ThemeIcon } from '@mantine/core'
import classes from './QuoteRequestForm.module.css'

type RadioOptionProps = {
  icon: ReactNode
  label: string
  value: string
  description: string
}

export default function RadioOption({
  label,
  icon,
  value,
  description,
}: RadioOptionProps) {
  return (
    <Radio.Card
      className={classes.radioRoot}
      radius="md"
      value={value}
      mih={{ md: '9rem' }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" align="start">
          <ThemeIcon
            variant="transparent"
            radius="md"
            size="xl"
            classNames={{
              root: classes.radioIcon,
            }}
          >
            {icon}
          </ThemeIcon>
          <div>
            <Text className={classes.radioLabel}>{label}</Text>
            <Text className={classes.radioDescription}>{description}</Text>
          </div>
        </Group>
        <Radio.Indicator />
      </Group>
    </Radio.Card>
  )
}
