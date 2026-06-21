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
  'Residential Cleaning': {
    icon: IconHome,
    description:
      'General maintenance of living areas, kitchens, and bathrooms, including dusting surfaces, mopping floors, and sanitizing high-touch zones.',
    rateType: 'perHour',
    rateModifier: 1,
  },
  'Commercial Cleaning': {
    icon: IconBuilding,
    description:
      'Routine upkeep for professional environments, focusing on sanitized restrooms, emptied waste bins, and vacuumed lobby or office floorboards.',
    rateType: 'perSqFt',
    rateModifier: 1,
  },
  'Deep Cleaning': {
    icon: IconSparkles,
    description:
      'Restoration-level scrubbing of neglected areas like baseboard grime, window tracks, ceiling fan blades, and bathroom grout lines.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Move in & Move out Cleaning': {
    icon: IconHomeMove,
    description:
      'Full-interior sterilization of empty homes, including the insides of ovens, refrigerators, kitchen drawers, and bedroom closets.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Post Construction Cleaning': {
    icon: IconBulldozer,
    description:
      'Detailed removal of fine masonry dust, paint droplets, and adhesive residue from windows, vents, and cabinetry following a renovation.',
    rateType: 'perHour',
    rateModifier: 1.5,
  },
  'Power Washing': {
    icon: IconWiperWash,
    description:
      'Heavy-duty exterior surface cleaning using pressurized water to lift embedded algae, moss, and oil stains from siding or driveways.',
    rateType: 'perSqFt',
    rateModifier: 2,
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
