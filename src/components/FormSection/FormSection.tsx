import type { PropsWithChildren, ReactNode } from 'react'
import { Box, Divider, Group, Text, ThemeIcon } from '@mantine/core'
import classes from './FormSection.module.css'

type FormSectionProps = {
  icon?: ReactNode
  title: string
  subtitle?: string
  withDivider?: boolean
  action?: ReactNode
} & PropsWithChildren

export default function FormSection({
  icon,
  title,
  withDivider,
  children,
  action,
}: FormSectionProps) {
  return (
    <Box className={classes.wrapper}>
      <Group justify="space-between" align="center" pb="xs">
        <Group gap="xs">
          {icon ? (
            <ThemeIcon variant="transparent" color="gray" radius="xl">
              {icon}
            </ThemeIcon>
          ) : null}
          <Text size="lg" fw="bold">
            {title}
          </Text>
        </Group>
        {action}
      </Group>
      <div className={classes.sectionContent}>{children}</div>
      {withDivider && <Divider my="xl" />}
    </Box>
  )
}
