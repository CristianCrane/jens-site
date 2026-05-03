import type { PropsWithChildren, ReactNode } from 'react'
import { Container, Group } from '@mantine/core'
import classes from './Section.module.css'

type SectionProps = {
  title: string
  action?: ReactNode
  margin?: boolean
} & PropsWithChildren

export default function Section({
  title,
  action,
  children,
  margin = true,
}: SectionProps) {
  return (
    <div className={classes.root}>
      <Container size="responsive" my={margin ? { base: '2rem' } : 0}>
        <section>
          <Group justify="space-between" align="center">
            <h2>{title}</h2>
            {action}
          </Group>
          {children}
        </section>
      </Container>
    </div>
  )
}
