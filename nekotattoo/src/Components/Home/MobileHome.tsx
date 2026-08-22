import React from 'react'
import "./MobileHome.css"
import mobileHomeBackground from "../../../public/Photos/Kira/front.png"
import roseMobile from "../../../public/roseLeft.svg"
import NekoTattoo from "../../../public/nekotattoo.svg"
import { useNavigate } from 'react-router-dom'
import paw from "../../../public/pawsOutline.png"
const MobileHome = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="mobile-home-container" data-bg={mobileHomeBackground}>
        <img className='roseMobile roseLeft' src={roseMobile} alt="" />
        <img className='roseMobile roseRight' src={roseMobile} alt="" />
        <div className="mid-mobile-home-section-container">
            <img className='nekotattoo-mobile-home' src={NekoTattoo} alt="" />
            <p className='home-quote'>“A bőröd a legszebb vászon, viseld rajta a történeted”</p>
            <div className="mobile-home-button-container">
              <button className='createConsultationButton-mobile' onClick={()=>navigate("/createConsultation")}>Konzultáció<img id='pawHome-mobile'  src={paw} alt="" /></button>
              <button className='myWorkButton-mobile' onClick={()=>navigate("/gallery")}>Munkáim</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default MobileHome