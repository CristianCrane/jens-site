import Section from '#/components/Section/Section.tsx'
import { entries } from '#/utils'
import { serviceConfigs } from '@features/services'
import ServiceCard from './ServiceCard.tsx'
import classes from './Services.module.css'

export default function Services() {
  return (
    <div className={classes.wrapper}>
      <Section title="Our Services" margin>
        <div className={classes.services}>
          {entries(serviceConfigs).map(([service]) => (
            <ServiceCard key={`service-${service}`} service={service} />
          ))}
        </div>
      </Section>
    </div>
  )
}
