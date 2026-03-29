import classes from './Services.module.css'
import Service from '#/components/Services/Service.tsx'
import services from '#/components/Services/services-data.tsx'
import Section from '#/components/Section/Section.tsx'

export default function Services() {
  return (
    <div className={classes.wrapper}>
      <Section title="Our Services">
        <div className={classes.services}>
          {services.map((service) => (
            <Service
              key={`service-${service.title}`}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}
