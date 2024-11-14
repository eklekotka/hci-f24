//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { StudentProvider } from "./components/useStudent/useStudent" // Adjust path as necessary
import LoginPage from "./pages/loginPage/loginPage"
import CalendarPage from "./pages/calendarPage/calendarPage" // Placeholder for student home page
import HomePage from "./pages/calendar/calendar"
import ProfilePage from "./pages/profilePage/profilePage"
import WelcomePage from "./pages/welcomePage/welcomePage"
import { OptimizationsPage } from "./pages/optimizations/optimizations"
const App: React.FC = () => {
  return (
    <StudentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendarold" element={<CalendarPage />} />
          <Route path="/optimizations" element={<OptimizationsPage />} />
          <Route path="/calendar" element={<HomePage />} />
          <Route path="/profilePage" element={<ProfilePage />} />
        </Routes>
      </Router>
    </StudentProvider>
  )
}

export default App

// return (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.tsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )
