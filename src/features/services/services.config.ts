import {
  IconBath,
  IconBed,
  IconBuilding,
  IconBulldozer,
  IconHome,
  IconHomeMove,
  IconPackages,
  IconPicnicTable,
  IconSofa,
  IconSparkles,
  IconToolsKitchen3,
  IconWiperWash,
} from '@tabler/icons-react'
import type {
  Addon,
  AddonConfig,
  Room,
  RoomConfig,
  RoomSize,
  Service,
  ServiceConfig,
} from './services.types.ts'

export const rates = {
  hourlyRate: 55,
  sqFtRate: 0.5,
  taxRate: 0.08875,
}

export const roomSizeModifers: Record<RoomSize, number> = {
  Large: 1.2,
  Medium: 1,
  Small: 0.8,
}

export const serviceConfigs: Record<Service, ServiceConfig> = {
  'Commercial Cleaning': {
    icon: IconBuilding,
    description:
      'Enhance workplace hygiene and presentation with our expert commercial cleaning services, ensuring your business environment reflects the highest standards of cleanliness and professionalism.',
    rateType: 'perSqFt',
    rateModifier: 1,
  },
  'Deep Cleaning': {
    icon: IconSparkles,
    description:
      'Take your cleanliness to the next level with our professional Deep Cleaning services, leaving no corner or crevice untouched.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Move in & Move out Cleaning': {
    icon: IconHomeMove,
    description:
      'Seamless transitions start with our move-in and move-out cleaning services. We ensure a spotless space, setting the stage for a fresh start or a smooth departure.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Post Construction Cleaning': {
    icon: IconBulldozer,
    description:
      'Our professional cleaning services ensure a pristine and safe environment after construction, leaving your space ready for occupancy.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Power Washing': {
    icon: IconWiperWash,
    description:
      'Restore surfaces to their prime with our professional power washing services. We bring a high-pressure touch to eliminate grime, mold, and dirt, renewing the beauty of your property.',
    rateType: 'perSqFt',
    rateModifier: 2,
  },
  'Residential Cleaning': {
    icon: IconHome,
    description:
      'Transform your living spaces with our professional residential cleaning services, delivering meticulous care for a spotless and refreshing home environment.',
    rateType: 'perHour',
    rateModifier: 1,
  },
} as const

export const roomConfigs: Record<Room, RoomConfig> = {
  'Dining Room': {
    minutes: 20,
    icon: IconPicnicTable,
  },
  'Living Room': {
    minutes: 30,
    icon: IconSofa,
  },
  Attic: {
    minutes: 90,
    icon: IconHome,
  },
  Basement: {
    minutes: 90,
    icon: IconPackages,
  },
  Bathroom: {
    minutes: 45,
    icon: IconBath,
  },
  Bedroom: {
    minutes: 40,
    icon: IconBed,
  },
  Kitchen: {
    minutes: 90,
    icon: IconToolsKitchen3,
  },
} as const

export const addonConfigs: Record<Addon, AddonConfig> = {
  'Oven Interior': {
    minutes: 20,
  },
  'Fridge Interior': {
    minutes: 45,
  },
  'Cabinet (Exterior)': {
    minutes: 5,
  },
  'Cabinet (Interior)': {
    minutes: 15,
  },
  'Cabinet (Interior + Exterior)': {
    minutes: 20,
  },
  'Spot Wall Cleaning': {
    minutes: 5,
  },
  Baseboards: {
    minutes: 10,
  },
  'Trash Disposal': {
    minutes: 10,
  },
  'Bed Linen Change': {
    minutes: 10,
  },
  'High Light Fixture': {
    minutes: 10,
  },
} as const
