import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import "./app_style.css"
import nekoTattooLogo from "../public/logoNeko.svg";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dropdown from "../public/dropdown.png"
import paw from "../public/pawsOutline.png"
const App = () => {
  const navigate = useNavigate();
  const [gotoConsulActive, setGotoConsulActive] = useState<boolean>(false)
  const [guideWindowActive, setGuideWindowActive] = useState<boolean>(false)
  const [gotoContactActive, setGotoContactActive] = useState<boolean>(false)
  const [aboutMeWindowActive, setAboutMeWindowActive] = useState<boolean>(false)
  const isMobile = window.innerWidth <= 768;
 

  return (
     <>
      <div className="navbar-container">
        <div className='inner-navbar-container'>
            <p className='navelement' onClick={()=> navigate("/createConsultation")}>Konzultáció</p>
            <div className="guideNavElement">
              <p className='navelement' onClick={() => setGuideWindowActive(!guideWindowActive)}>Útmutató</p>
              <img className={guideWindowActive ? 'dropdown-button dropdown-active' : "dropdown-button"} onClick={() => setGuideWindowActive(!guideWindowActive)} src={dropdown} alt="" />
              {
                guideWindowActive ? 
                <div className='guides-window'>
                  <div className="crucialToKnow">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> navigate("/crucialToKnow")}>Fontos Tudnivalók</p>
                  </div>
                  <div className="faq">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> navigate("/gyik")}>Gyakori kérdések</p>
                  </div>
                </div>
                :
                null
              }
            </div>
            <img className='navelement' src={nekoTattooLogo} onClick={()=> navigate("/home")}/>
            <p className='navelement'onClick={()=> navigate("/contact")}>Kapcsolat</p>
            <div className="aboutmeNavElement">
              <p className='navelement' onClick={() => setAboutMeWindowActive(!aboutMeWindowActive)}>Rólam</p>
              <img className={aboutMeWindowActive ? 'dropdown-button dropdown-active' : "dropdown-button"} onClick={() => setAboutMeWindowActive(!aboutMeWindowActive)} src={dropdown} alt="" />
               {
                aboutMeWindowActive && !isMobile ? 
                <div className='aboutme-window'>
                  <div className="myStory">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> navigate("/myStory")}>Történetem</p>
                  </div>
                  <div className="gallery">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> navigate("/gallery")}>Galéria</p>
                  </div>
                </div>
                :
                null
              }
            </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
      </Routes>
     </>
  )
}

export default App