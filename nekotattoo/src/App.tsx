import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DesktopNavBar from './Components/Navbar/DesktopNavBar';
import Home from './Components/Home/Home';
import MobileNavBar from './Components/Navbar/MobileNavBar';
import Consultation from './Components/Consultation/Consultation';
import ConsultationFinal from './Components/ConsultationFinal/ConsultationFinal';
import Köszönöm from './Components/Köszönöm/Köszönöm';
import Contact from './Components/Contact/Contact';
import AboutMe from './Components/AboutMe/AboutMe';
import AboutMeMobile from './Components/AboutMe/AboutMeMobile';
import Gallery from './Components/Gallery/Gallery';
import "./app_style.css"
const App = () => {
  const isMobile = window.innerWidth <= 1500;

  return (
      
     <>
     {isMobile ? <MobileNavBar/> : <DesktopNavBar/>}

      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/createConsultation' element={<Consultation/>}/>
        <Route path='/createConsultationFinal' element={<ConsultationFinal/>}/>
        <Route path='/köszönöm' element={<Köszönöm/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/myStory' element={<AboutMe/>}/>
        <Route path='/aboutme' element={<AboutMeMobile/>}/>
        <Route path='/gallery' element={<Gallery/>}/>

      </Routes>
     </>
  )
}

export default App