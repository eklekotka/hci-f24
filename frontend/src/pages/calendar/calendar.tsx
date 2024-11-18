import "./calendar.css"
import NavBar from "../../components/navBar/navBar"
import { DndContext, Modifier, useDraggable } from "@dnd-kit/core"
import { useState } from "react"

function* rangeGen(start: number, end: number) {
  for (let num = start; num < end; num += 1) {
    yield num
  }
}

function range(start: number, end: number): number[] {
  return Array.from(rangeGen(start, end))
}

function createSnapModifier(gridSizeX: number, gridSizeY: number): Modifier {
  return ({ transform }) => ({
    ...transform,
    x: Math.ceil((transform.x - gridSizeX / 2) / gridSizeX) * gridSizeX,
    y: Math.ceil((transform.y - gridSizeY / 2) / gridSizeY) * gridSizeY,
  })
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

interface Event {
  name: string
  start: Date
  end: Date
  id: number
}

function roundToNearestInterval(value: number, interval: number) {
  return Math.round(value / interval) * interval
}

const DraggableEvent: React.FC<{ event: Event; startOffsetHours: number }> = ({
  event: { start, end, name, id },
  startOffsetHours,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    })

  const length = end.getTime() - start.getTime()

  const startOfDayDate = new Date(start)
  startOfDayDate.setHours(Math.floor(startOffsetHours))
  startOfDayDate.setMinutes(
    (startOffsetHours - Math.floor(startOffsetHours)) * 60
  )
  startOfDayDate.setSeconds(0)

  return (
    <div
      ref={setNodeRef}
      className="event"
      {...listeners}
      {...attributes}
      style={{
        height: length / 1000 / 60,
        top: (start.getTime() - startOfDayDate.getTime()) / 1000 / 60,
        transform: `translate(${transform?.x}px, ${transform?.y}px) scale(${
          isDragging ? 1.05 : 1
        })`,
        boxShadow: `0px 0px ${isDragging ? 10 : 0}px 0px purple`,
        zIndex: isDragging ? 1 : 0,
      }}
    >
      <p>{name}</p>
    </div>
  )
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

  // const verticalPos = (start.getTime() - startOfDayDate.getTime()) / 1000 / 60

  return {
    ...event,
    start: newStartDate,
    end: newEndDate,
  }
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState(initialEvents)

  const dates = Array(7)
    .fill(0)
    .map(
      (_, index) =>
        new Date(
          new Date("2024-11-11 00:00").getTime() + index * 1000 * 60 * 60 * 24
        )
    )

  return (
    <DndContext
      modifiers={[createSnapModifier(150, 15)]}
      autoScroll={false}
      onDragEnd={(draggedEvent) => {
        setEvents(
          events.map((event) => {
            if (event.id === draggedEvent.active.id) {
              return updateTimeFromCoordDelta(
                draggedEvent.delta.x,
                draggedEvent.delta.y,
                event,
                new Date()
              )
            }
            return event
          })
        )
      }}
    >
      <div>
        <NavBar />
        <div className="center-container">
          <div className="navigation-tabs">
            <a href="/calendar" className="active">
              Calendar
            </a>
            <a href="/optimizations">Optimizations</a>
            <a href="/insights">Insights</a>
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
            <div className="calendar-body">
              {dates.map((date) => {
                // TODO: make this check more robust
                const eventsForDay = events.filter(
                  ({ start }) => start.getDate() === date.getDate()
                )

                return (
                  <div key={date.getTime()} className="day-column">
                    {range(9, 21).map((num) => (
                      <div key={num} className="calendar-background-cell"></div>
                    ))}
                    {eventsForDay.map((event) => (
                      <DraggableEvent
                        event={event}
                        key={event.start.getTime()}
                        startOffsetHours={9}
                      />
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
          <h1>TBD -- not done yet</h1>
        </div>
      </div>
    </DndContext>
  )
}

export default HomePage
