import classes from './Services.module.css'
import { Container } from '@mantine/core'
import Service from '#/components/Services/Service.tsx'
import SectionTitle from '#/components/SectionTitle/SectionTitle.tsx'
import services from '#/components/Services/services-data.tsx'

export default function Services() {
  return (
    <div className={classes.wrapper}>
      <Container size="responsive">
        <div className={classes.services}>
          <SectionTitle>Services</SectionTitle>
          {services.map((service) => (
            <Service
              key={`service-${service.title}`}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
