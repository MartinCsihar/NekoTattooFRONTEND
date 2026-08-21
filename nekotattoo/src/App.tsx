import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import "./app_style.css"
import nekoTattooLogo from "../public/logoNeko.svg";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dropdown from "../public/dropdown.png"
import paw from "../public/pawsOutline.png"
import Home from './Components/Home';
const App = () => {
  const navigate = useNavigate();
  const [guideWindowActive, setGuideWindowActive] = useState<boolean>(false)
  const [aboutMeWindowActive, setAboutMeWindowActive] = useState<boolean>(false)
  const isMobile = window.innerWidth <= 768;
  const [contactActive, setContact] = useState<boolean>(false)
  const [createConsultationActive, setCreateConsultationActive] = useState<boolean>(false)

  function gotoURL(url:string){
    navigate(url)
    if(url == "/crucialToKnow" || url == "/faq"){
      setGuideWindowActive(false)
      setCreateConsultationActive(false)
      setContact(false)
    }
    else if(url == "/createConsultation"){
      setCreateConsultationActive(true)
      setContact(false)
      setGuideWindowActive(false)
     setAboutMeWindowActive(false)
    }
    else if(url == "/contact"){
      setContact(true)
       setGuideWindowActive(false)
      setAboutMeWindowActive(false)
      setCreateConsultationActive(false)

    }
    else if(url == "/home"){
      setGuideWindowActive(false)
      setAboutMeWindowActive(false)
      setCreateConsultationActive(false)
      setContact(false)
    }
    else{
      setAboutMeWindowActive(false)
      setCreateConsultationActive(false)
      setContact(false)
    }
    
  }

  return (
     <>
      <div className="navbar-container">
        <div className='inner-navbar-container'>
            <p className={createConsultationActive ? 'navelement active' : 'navelement'} onClick={()=> gotoURL("/createConsultation")}>Konzultáció</p>
            <div className="guideNavElement">
              <p className='navelement' onClick={() => setGuideWindowActive(!guideWindowActive)}>Útmutató</p>
              <img className={guideWindowActive ? 'dropdown-button dropdown-active' : "dropdown-button"} onClick={() => setGuideWindowActive(!guideWindowActive)} src={dropdown} alt="" />
              {
                <div className={guideWindowActive ? 'guides-window active' : 'guides-window'} >
                  <div className="crucialToKnow">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> gotoURL("/crucialToKnow")} >Fontos Tudnivalók</p>
                  </div>
                  <div className="faq">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> gotoURL("/faq")}>Gyakran Ismételt Kérdések</p>
                  </div>
                </div>
                
              }
            </div>

            <img className='navelement nekoLogo'  src={nekoTattooLogo} onClick={()=> gotoURL("/home")}/>

            <p className={contactActive ? 'navelement active' : 'navelement'}onClick={()=> gotoURL("/contact")}>Kapcsolat</p>
            <div className="aboutmeNavElement">
              <p className='navelement' onClick={() => setAboutMeWindowActive(!aboutMeWindowActive)}>Rólam</p>
              <img className={aboutMeWindowActive ? 'dropdown-button dropdown-active' : "dropdown-button"} onClick={() => setAboutMeWindowActive(!aboutMeWindowActive)} src={dropdown} alt="" />
               {
                 
                <div className={aboutMeWindowActive && !isMobile ? 'aboutme-window active' : 'aboutme-window'}>
                  <div className="myStory">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> gotoURL("/myStory")}>Történetem</p>
                  </div>
                  <div className="gallery">
                    <img id='paw' src={paw} alt="" />
                    <p onClick={()=> gotoURL("/gallery")}>Galéria</p>
                  </div>
                </div>
              
              }
            </div>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
     </>
  )
}

export default App