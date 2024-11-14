import "./calendar.css"
import NavBar from "../../components/navBar/navBar"

function* rangeGen(start: number, end: number) {
  for (let num = start; num < end; num += 1) {
    yield num
  }
}

function range(start: number, end: number): number[] {
  return Array.from(rangeGen(start, end))
}

const HomePage: React.FC = () => {
  const dates = Array(7)
    .fill(0)
    .map((_, index) => new Date(1731359971032 + index * 1000 * 60 * 60 * 24))

  return (
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
              return (
                <div key={date.getTime()} className="day-column">
                  {range(0, 10).map((num) => (
                    <div key={num}></div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        <h1>TBD -- not done yet</h1>
      </div>
    </div>
  )
}

export default HomePage
