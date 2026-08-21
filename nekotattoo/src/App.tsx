import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
     <>
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
      </Routes>
     </>
  )
}

export default App