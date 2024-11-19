import { WorkBlock } from "./calendarTypes"

export function dateToTime(date: Date) {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
}

export function calculateEventBoundingBox(
  { end, start }: WorkBlock,
  startOffsetHours: number
) {
  const length = end.getTime() - start.getTime()

  const startOfDayDate = getStartOfDayTime(start, startOffsetHours)

  return {
    height: length / 1000 / 60,
    top: (start.getTime() - startOfDayDate.getTime()) / 1000 / 60,
  }
}

export function getStartOfDayTime(date: Date, startOffsetHours: number): Date {
  const startOfDayDate = new Date(date)
  startOfDayDate.setHours(Math.floor(startOffsetHours))
  startOfDayDate.setMinutes(
    (startOffsetHours - Math.floor(startOffsetHours)) * 60
  )
  startOfDayDate.setSeconds(0)

  return startOfDayDate
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + 1000 * 60 * minutes)
}
