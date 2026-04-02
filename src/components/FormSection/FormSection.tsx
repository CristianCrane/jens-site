import type { PropsWithChildren } from 'react'
import { Divider, Title } from '@mantine/core'
import classes from './FormSection.module.css'

type FormSectionProps = {
  title: string
  subtitle?: string
  withDivider?: boolean
} & PropsWithChildren

export default function FormSection({
  title,
  withDivider,
  children,
}: FormSectionProps) {
  return (
    <div>
      <Title order={2} size="1.25rem" mb="lg">
        {title}
      </Title>
      <div className={classes.sectionContent}>{children}</div>
      {withDivider && <Divider my="xl" />}
    </div>
  )
}
