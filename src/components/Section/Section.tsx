import { Container, Group } from '@mantine/core'
import type { PropsWithChildren, ReactNode } from 'react'
import classes from './Section.module.css'

type SectionProps = {
  title: string
  action?: ReactNode
} & PropsWithChildren

export default function Section({ title, action, children }: SectionProps) {
  return (
    <div className={classes.root}>
      <Container size="responsive">
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
