import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DesktopNavBar from './Components/Navbar/DesktopNavBar';
import Home from './Components/Home/Home';
import MobileNavBar from './Components/Navbar/MobileNavBar';
import "./app_style.css"
const App = () => {
  const isMobile = window.innerWidth <= 760;

  return (
      
     <>
     {isMobile ? <MobileNavBar/> : <DesktopNavBar/>}

      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
     </>
  )
}

export default App