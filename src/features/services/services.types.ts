import type { TablerIcon } from '@tabler/icons-react'

export const RESIDENTIAL_CLEANING = 'Residential Cleaning'
export const COMMERCIAL_CLEANING = 'Commercial Cleaning'
export const POST_CONSTRUCTION_CLEANING = 'Post Construction Cleaning'
export const MOVE_IN_OUT_CLEANING = 'Move in & Move out Cleaning'
export const DEEP_CLEANING = 'Deep Cleaning'
export const POWER_WASHING = 'Power Washing'

export const services = [
  RESIDENTIAL_CLEANING,
  COMMERCIAL_CLEANING,
  POST_CONSTRUCTION_CLEANING,
  MOVE_IN_OUT_CLEANING,
  DEEP_CLEANING,
  POWER_WASHING,
] as const
export type Service = (typeof services)[number]

export const hourlyServices = [
  RESIDENTIAL_CLEANING,
  POST_CONSTRUCTION_CLEANING,
  MOVE_IN_OUT_CLEANING,
  DEEP_CLEANING,
] as const
export type HourlyService = (typeof hourlyServices)[number]

export const sqFtServices = [COMMERCIAL_CLEANING, POWER_WASHING] as const
export type SqFtService = (typeof sqFtServices)[number]

export const rooms = [
  'Bedroom',
  'Bathroom',
  'Basement',
  'Living Room',
  'Kitchen',
  'Dining Room',
  'Attic',
] as const
export type Room = (typeof rooms)[number]

export const addons = [
  'Oven Interior',
  'Fridge Interior',
  'Cabinet (Exterior)',
  'Cabinet (Interior)',
  'Cabinet (Interior + Exterior)',
  'Spot Wall Cleaning',
  'Baseboards',
  'Trash Disposal',
  'Bed Linen Change',
  'High Light Fixture',
] as const
export type Addon = (typeof addons)[number]

export const roomSizes = ['Small', 'Medium', 'Large'] as const
export type RoomSize = (typeof roomSizes)[number]

export const addonSizes = ['Small', 'Medium', 'Large'] as const
export type AddonSize = (typeof addonSizes)[number]

export type RateType = 'perHour' | 'perSqFt'

export type ServiceConfig = {
  icon: TablerIcon
  description: string
  rateType: RateType
  rateModifier: number
}

export type RoomConfig = {
  minutes: number
  icon: TablerIcon
}

export type AddonConfig = {
  minutes: number
}
