import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DesktopNavBar from './Components/Navbar/DesktopNavBar';
import Home from './Components/Home/Home';
import MobileNavBar from './Components/Navbar/MobileNavBar';
import Consultation from './Components/Consultation/Consultation';
import ConsultationFinal from './Components/ConsultationFinal/ConsultationFinal';
import "./app_style.css"
const App = () => {
  const isMobile = window.innerWidth <= 760;

  return (
      
     <>
     {isMobile ? <MobileNavBar/> : <DesktopNavBar/>}

      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createConsultation' element={<Consultation/>}/>
        <Route path='/createConsultationFinal' element={<ConsultationFinal/>}/>

      </Routes>
     </>
  )
}

export default App