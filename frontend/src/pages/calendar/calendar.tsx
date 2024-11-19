import "./calendar.css"
import NavBar from "../../components/navBar/navBar"
import { DndContext, Modifier } from "@dnd-kit/core"
import { useRef, useState } from "react"
import {
  addMinutes,
  calculateEventBoundingBox,
  getStartOfDayTime,
} from "./dateUtils"
import { DraggableEvent } from "./DraggableEvent"
import { range } from "./range"
import { WorkBlock } from "./calendarTypes"
import { Event } from "./calendarTypes"
import { NavigationTabs } from "../../components/NavigationTabs"
import { Transform } from "@dnd-kit/utilities"

function createSnapModifier(gridSizeX: number, gridSizeY: number): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil((transform.x - gridSizeX / 2) / gridSizeX) * gridSizeX,
    y: Math.ceil((transform.y - gridSizeY / 2) / gridSizeY) * gridSizeY,
  })
}

type ClientRect = NonNullable<Parameters<Modifier>[0]["activeNodeRect"]>

function restrictToBoundingRect(
  transform: Transform,
  rect: ClientRect,
  boundingRect: ClientRect
): Transform {
  const value = {
    ...transform,
  }

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top
  } else if (
    rect.bottom + transform.y >=
    boundingRect.top + boundingRect.height
  ) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left
  } else if (
    rect.right + transform.x >=
    boundingRect.left + boundingRect.width
  ) {
    value.x = boundingRect.left + boundingRect.width - rect.right
  }

  return value
}

const initialEvents: Event[] = [
  {
    name: "Cool Event",
    start: new Date("2024-11-12 15:30"),
    end: new Date("2024-11-12 18:30"),
    id: 1,
  },
  {
    name: "Cool Event 2",
    start: new Date("2024-11-13 09:30"),
    end: new Date("2024-11-13 10:30"),
    id: 2,
  },
  {
    name: "Cool Event 3",
    start: new Date("2024-11-15 13:30"),
    end: new Date("2024-11-15 14:30"),
    id: 3,
  },
]

function roundToNearestInterval(value: number, interval: number) {
  return Math.round(value / interval) * interval
}

const DroppableWorkZone: React.FC<{
  workBlock: WorkBlock
  startOffsetHours: number
}> = ({ workBlock, startOffsetHours }) => {
  const { height, top } = calculateEventBoundingBox(workBlock, startOffsetHours)

  return <div className="workZone" style={{ height, top }}></div>
}

const millisPerDay = (1000 * 60 * 60 * 24) / 150

function updateTimeFromCoordDelta(
  deltaX: number,
  deltaY: number,
  event: Event
  // startOfDayDate: Date
): Event {
  const { start, end } = event

  const newStart = start.getTime() + deltaY * 1000 * 60 + deltaX * millisPerDay
  const newStartDate = new Date(newStart)
  newStartDate.setMinutes(roundToNearestInterval(newStartDate.getMinutes(), 15))

  const newEnd = end.getTime() + deltaY * 1000 * 60 + deltaX * millisPerDay
  const newEndDate = new Date(newEnd)
  newEndDate.setMinutes(roundToNearestInterval(newEndDate.getMinutes(), 15))

  return {
    ...event,
    start: newStartDate,
    end: newEndDate,
  }
}

function getMinuteDifference(dateA: Date, dateB: Date): number {
  return (dateA.getTime() - dateB.getTime()) / 1000 / 60
}

const minimumBlockSizeMinutes = 30
const transitionTimeMinutes = 10

const restrictToParentElement: (
  containerRef: React.RefObject<HTMLDivElement>
) => Modifier =
  (containerRef): Modifier =>
  ({ draggingNodeRect, transform }) => {
    const rect = containerRef.current?.getBoundingClientRect()

    if (!draggingNodeRect || rect === undefined) {
      return transform
    }

    const clientRect = {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    }

    return restrictToBoundingRect(transform, draggingNodeRect, clientRect)
  }

const HomePage: React.FC = () => {
  const startOffsetHours = 9
  const endOfDayHour = 21
  const startWorkingHours = 10
  const endWorkingHours = 20

  const dates = Array(7)
    .fill(0)
    .map(
      (_, index) =>
        new Date(
          new Date("2024-11-11 00:00").getTime() + index * 1000 * 60 * 60 * 24
        )
    )

  const [events, setEvents] = useState(initialEvents)

  const generateSlots = (): WorkBlock[] => {
    const newFreeSlots: WorkBlock[] = []
    let id = 0
    dates.forEach((date) => {
      const eventsOnDate = events.filter(
        (event) => event.start.getDate() === date.getDate()
      )
      eventsOnDate.sort((a, b) => a.start.getTime() - b.start.getTime())
      const startOfDayDate = getStartOfDayTime(date, startWorkingHours)
      const endOfDayDate = getStartOfDayTime(date, endWorkingHours)

      eventsOnDate.forEach((event, index) => {
        if (index === 0) {
          if (
            getMinuteDifference(event.start, startOfDayDate) >
            minimumBlockSizeMinutes + transitionTimeMinutes
          ) {
            newFreeSlots.push({
              id: id++,
              start: startOfDayDate,
              end: addMinutes(event.start, -transitionTimeMinutes),
            })
          }
        } else {
          const prevEvent = eventsOnDate[index - 1]

          if (
            getMinuteDifference(event.start, prevEvent.end) >
            minimumBlockSizeMinutes + transitionTimeMinutes * 2
          ) {
            newFreeSlots.push({
              id: id++,
              start: addMinutes(prevEvent.end, transitionTimeMinutes),
              end: addMinutes(event.start, -transitionTimeMinutes),
            })
          }
        }
      })

      if (eventsOnDate.length >= 1) {
        const lastEvent = eventsOnDate[eventsOnDate.length - 1]
        if (
          getMinuteDifference(endOfDayDate, lastEvent.end) >
          transitionTimeMinutes + minimumBlockSizeMinutes
        ) {
          newFreeSlots.push({
            id: id++,
            start: addMinutes(lastEvent.end, transitionTimeMinutes),
            end: endOfDayDate,
          })
        }
      } else if (eventsOnDate.length === 0) {
        newFreeSlots.push({
          id: id++,
          start: startOfDayDate,
          end: endOfDayDate,
        })
      }
    })
    return newFreeSlots
  }

  const freeSlots = generateSlots()

  const contentFrameRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <NavBar />
      <div className="center-container">
        <NavigationTabs />
        <div className="calendar-side">
          <div className="time-labels">
            {range(startOffsetHours, endOfDayHour + 1).map((hour) => {
              const dayPeriod = hour < 12 ? "am" : "pm"
              const convertedHour = hour === 12 ? 12 : hour % 12

              return (
                <p>
                  {convertedHour}
                  {dayPeriod}
                </p>
              )
            })}
          </div>
          <div className="content-frame">
            <div className="calendar-dates">
              {dates.map((sourceDate) => {
                const month = sourceDate.toLocaleDateString("en-us", {
                  month: "short",
                })
                const dayOfTheWeek = sourceDate.toLocaleDateString("en-us", {
                  weekday: "long",
                })
                const date = sourceDate.getDate()
                return (
                  <div key={sourceDate.getTime()}>
                    <p>{month}</p>
                    <p>{date}</p>
                    <p>{dayOfTheWeek}</p>
                  </div>
                )
              })}
            </div>
            <DndContext
              modifiers={[
                restrictToParentElement(contentFrameRef),
                createSnapModifier(150, 15),
              ]}
              autoScroll={false}
              onDragEnd={(draggedEvent) => {
                setEvents(
                  events.map((event) => {
                    if (event.id === draggedEvent.active.id) {
                      return updateTimeFromCoordDelta(
                        draggedEvent.delta.x,
                        draggedEvent.delta.y,
                        event
                      )
                    }
                    return event
                  })
                )
              }}
            >
              <div className="calendar-body" ref={contentFrameRef}>
                {dates.map((date) => {
                  // TODO: make this check more robust
                  const eventsForDay = events.filter(
                    ({ start }) => start.getDate() === date.getDate()
                  )

                  const workBlocksForDay = freeSlots.filter(
                    ({ start }) => start.getDate() === date.getDate()
                  )

                  return (
                    <div key={date.getTime()} className="day-column">
                      {range(startOffsetHours, endOfDayHour).map((num) => (
                        <div
                          key={num}
                          className="calendar-background-cell"
                        ></div>
                      ))}
                      {eventsForDay.map((event) => (
                        <DraggableEvent
                          event={event}
                          key={event.start.getTime()}
                          startOffsetHours={startOffsetHours}
                        />
                      ))}
                      {workBlocksForDay.map((event) => (
                        <DroppableWorkZone
                          workBlock={{
                            start: event.start,
                            end: event.end,
                            id: event.id,
                          }}
                          startOffsetHours={startOffsetHours}
                        />
                      ))}
                    </div>
                  )
                })}
              </div>
              {/* <div className="calendar-body-overlay">
                {dates.map((date) => {
                  return (
                    <div key={date.getTime()} className="day-column">
                      <DroppableWorkZone
                        workBlock={{
                          start: new Date("2024-11-13 18:30"),
                          end: new Date("2024-11-13 20:30"),
                          id: 5,
                        }}
                        startOffsetHours={9}
                      />
                    </div>
                  )
                })}
              </div> */}
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
