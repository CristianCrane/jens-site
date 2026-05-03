import { Text, ThemeIcon, Title } from '@mantine/core'
import type { Service } from '@features/services'
import { serviceConfigs } from '@features/services'
import classes from './Services.module.css'

type ServiceProps = {
  service: Service
}

export default function ServiceCard({ service }: ServiceProps) {
  const Icon = serviceConfigs[service].icon
  const description = serviceConfigs[service].description
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
        <Icon />
      </ThemeIcon>
      <div className={classes.content}>
        <Title order={3}>{service}</Title>
        <Text>{description}</Text>
      </div>
    </div>
  )
}
