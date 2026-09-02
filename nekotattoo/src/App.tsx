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
import Gallery from './Components/Gallery/Gallery';
import Faq from './Components/FAQ/Faq';
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
        <Route path='/aboutme' element={<AboutMe/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/faq' element={<Faq/>}/>

      </Routes>
     </>
  )
}

export default App