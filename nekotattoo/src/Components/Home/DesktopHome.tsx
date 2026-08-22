import React from 'react'
import "./DesktopHome.css"
import roseFlower from "../../../public/roseLeft.svg"
import NekoTattooText from "../../../public/nekotattoo.svg"
import paw from "../../../public/pawsOutline.png"
import { useNavigate } from 'react-router-dom'

const DesktopHome = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="home-main-container" data-height={window.innerHeight}>
      <img className="roseDesignLeft" src={roseFlower} alt=""  />
      <img className="roseDesignRight" src={roseFlower} alt=""  />
      <div className="mid-section-container">
        <img className='NekoTattooText' src={NekoTattooText} alt="" />
        <p className='mottoText'>"A bőrőd a legszebb vászon, viseld rajta a történeted."</p>
        <div className="buttons-container">
          <button className='createConsultationButton' onClick={()=>navigate("/createConsultation")}>Konzultáció kérése <img id='pawHome'  src={paw} alt="" /></button>
          <button className='myWorkButton' onClick={()=>navigate("/gallery")}>Munkáim</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default DesktopHome