import { Text, ThemeIcon, Title } from '@mantine/core'
import classes from './Services.module.css'
import type { ReactNode } from 'react'

type ServiceProps = {
  icon: ReactNode
  title: string
  description: string
}

export default function Service({ icon, title, description }: ServiceProps) {
  return (
    <div className={classes.service}>
      <ThemeIcon
        variant="white"
        size="xl"
        radius="md"
        classNames={{
          root: classes.icon,
        }}
        styles={{ root: { boxShadow: '0 20px 26px rgba(0,0,0,.04)' } }}
      >
        {icon}
      </ThemeIcon>
      <div className={classes.content}>
        <Title order={3}>{title}</Title>
        <Text>{description}</Text>
      </div>
    </div>
  )
}
