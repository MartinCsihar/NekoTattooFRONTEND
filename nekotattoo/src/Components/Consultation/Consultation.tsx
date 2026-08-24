import React from 'react'
import DesktopConsultation from './DesktopConsultation'
import MobileConsultation from './MobileConsultation'
const Consultation = () => {
    const isMobile = window.innerWidth <= 768
  return isMobile ? <MobileConsultation/> : <DesktopConsultation/>
    
  
}

export default Consultation