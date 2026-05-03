import type { PropsWithChildren, ReactNode } from 'react'
import { Box, Divider, Group, Text } from '@mantine/core'
import classes from './FormSection.module.css'

type FormSectionProps = {
  title: string
  subtitle?: string
  withDivider?: boolean
  action?: ReactNode
} & PropsWithChildren

export default function FormSection({
  title,
  withDivider,
  children,
  action,
}: FormSectionProps) {
  return (
    <Box className={classes.wrapper}>
      <Group justify="space-between" align="center" pb="xs">
        <Text size="lg" fw="bold">
          {title}
        </Text>
        {action}
      </Group>
      <div className={classes.sectionContent}>{children}</div>
      {withDivider && <Divider my="xl" />}
    </Box>
  )
}
