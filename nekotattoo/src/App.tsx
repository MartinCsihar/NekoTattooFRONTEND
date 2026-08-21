import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import "./app_style.css"
const App = () => {
  return (
     <>
      <div className="nav-bar-container">
        <p id='cinzel'>CINZEL DECORATIVE</p>
        <p id='oldtt'>OLD TT</p>
      </div>
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
      </Routes>
     </>
  )
}

export default App