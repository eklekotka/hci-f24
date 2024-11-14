import "./calendar.css"
import NavBar from "../../components/navBar/navBar"

const HomePage: React.FC = () => {
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
            {Array(7)
              .fill(0)
              .map((_, index) => {
                const sourceDate = new Date(
                  1731619171032 + index * 1000 * 60 * 60 * 24
                )
                const month = sourceDate.toLocaleDateString("en-us", {
                  month: "short",
                })
                const dayOfTheWeek = sourceDate.toLocaleDateString("en-us", {
                  weekday: "long",
                })
                const date = sourceDate.getDate()
                return (
                  <div key={index}>
                    <p>{month}</p>
                    <p>{date}</p>
                    <p>{dayOfTheWeek}</p>
                  </div>
                )
              })}
          </div>
          <h1>Calendar!</h1>
        </div>
        <h1>TBD -- not done yet</h1>
      </div>
    </div>
  )
}

export default HomePage
