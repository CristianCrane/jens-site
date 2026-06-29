import type { QuoteStatus } from '#/db'
import {
  addonConfigs,
  isHourlyServiceType,
  isSqftServiceType,
  rates,
  roomConfigs,
  roomSizeModifers,
  serviceConfigs,
} from '@features/services'
import type { Addon, Room, RoomSize, Service } from '@features/services'
import type { Quote, QuoteFormValues } from './quotes.types.ts'

export function calcRoomPrice(
  service: Service,
  room: Room,
  size: RoomSize,
  qty: number,
) {
  const { hourlyRate } = rates
  const { rateModifier } = serviceConfigs[service]
  const { minutes } = roomConfigs[room]
  const sizeModifier = roomSizeModifers[size]
  const jobTimeInHours = minutes / 60
  return hourlyRate * jobTimeInHours * rateModifier * sizeModifier * qty
}

export function calcAddonPrice(service: Service, addon: Addon, qty: number) {
  const { hourlyRate } = rates
  const { rateModifier } = serviceConfigs[service]
  const { minutes } = addonConfigs[addon]
  const jobTimeInHours = minutes / 60
  return hourlyRate * jobTimeInHours * rateModifier * qty
}

export function calcSqFtPrice(service: Service, qty: number) {
  const { sqFtRate } = rates
  const { rateModifier } = serviceConfigs[service]
  return sqFtRate * rateModifier * qty
}

export function calcHourlyQuote({
  jobType,
  rooms,
  addons,
}: QuoteFormValues): Quote {
  const roomPrices = rooms.map((room) => ({
    room,
    price: calcRoomPrice(jobType, room.name, room.size, room.qty),
  }))

  const addonPrices = addons.map((addon) => ({
    addon,
    price: calcAddonPrice(jobType, addon.name, addon.qty),
  }))

  const roomSubtotal = roomPrices.reduce((sum, room) => sum + room.price, 0)
  const addonSubtotal = addonPrices.reduce((sum, addon) => sum + addon.price, 0)
  const subtotal = roomSubtotal + addonSubtotal
  const taxes = calcTax(subtotal)
  const total = subtotal + taxes

  return {
    items: [
      ...roomPrices.map(({ room, price }) => ({
        qty: room.qty,
        name: room.name,
        description: room.size,
        price: price,
      })),
      ...addonPrices.map(({ addon, price }) => ({
        qty: addon.qty,
        name: addon.name,
        price: price,
      })),
    ],
    subtotal,
    taxes,
    total,
  }
}

export function calcSqFtQuote({ jobType, sqft }: QuoteFormValues): Quote {
  const subtotal = calcSqFtPrice(jobType, sqft)
  const taxes = calcTax(subtotal)
  const total = subtotal + taxes

  return {
    items: [
      {
        qty: 1,
        name: jobType,
        description: `${sqft} sqft`,
        price: subtotal,
      },
    ],
    subtotal,
    taxes,
    total,
  }
}

export function calcQuote(values: QuoteFormValues): Quote {
  if (isHourlyServiceType(values.jobType)) return calcHourlyQuote(values)
  else if (isSqftServiceType(values.jobType)) return calcSqFtQuote(values)
  else throw new Error(`Calc quote error. Invalid job type: ${values.jobType}`)
}

export function calcTax(subtotal: number) {
  const { taxRate } = rates
  return subtotal * taxRate
}

export function isQuoteEditable(quoteStatus?: QuoteStatus) {
  return !quoteStatus || quoteStatus === 'draft'
}
