import { serviceConfigs } from './services.config.ts'
import type { Service } from './services.types.ts'

export function isHourlyServiceType(service: Service) {
  return serviceConfigs[service].rateType === 'perHour'
}

export function isSqftServiceType(service: Service) {
  return serviceConfigs[service].rateType === 'perSqFt'
}

export function isDifferentJobType(service: Service, service2: Service) {
  return serviceConfigs[service].rateType !== serviceConfigs[service2].rateType
}
