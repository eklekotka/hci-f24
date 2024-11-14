import "./optimizations.css"
import NavBar from "../../components/navBar/navBar"

export const OptimizationsPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="center-container">
        <div className="navigation-tabs">
          <a href="/calendar">Calendar</a>
          <a href="/optimizations" className="active">
            Optimizations
          </a>
          <a href="/insights">Insights</a>
        </div>

        <div className="content-frame">
          <h1>Optimizations!</h1>
        </div>
        <h1>TBD -- not done yet</h1>
      </div>
    </div>
  )
}
