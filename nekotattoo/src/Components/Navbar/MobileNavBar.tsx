import React, { useState } from 'react'
import "./MobileNavBar.css"
import mobileLogo from "../../../public/mobileLogo.svg"
import menu from "../../../public/menu.png"
import quitFromMenu from "../../../public/close.png"
import pawMobileNav from "../../../public/pawsOutline.png"
import { useNavigate } from 'react-router-dom'
const MobileNavBar = () => {
    const navigate = useNavigate()
    const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false)

    function gotoURL(url:string){
        navigate(url)
        setMobileMenuActive(false)
    }
  return (

   <>
    <div className="mobile-navbar-container">
        <img className='mobileLogo' src={mobileLogo} onClick={()=> gotoURL("/home")} alt="" />
        {
        mobileMenuActive ? 
            <img className='quitFromMenu' onClick={()=>setMobileMenuActive(false)} src={quitFromMenu}/> 
            :   
            <img onClick={()=>setMobileMenuActive(!mobileMenuActive)} className='menu' src={menu} alt="" />
        }
        <div className={mobileMenuActive ? "mobile-dropdown active" : "mobile-dropdown"}>
            <div className="createConsulattionMobile mobileNavElementContainer">
                <img className='pawMobileNav' src={pawMobileNav} alt="" />
                <p onClick={()=>gotoURL("/createConsultation")}>Kontultáció</p>
            </div>
             <div className="crucialToKnowMobile mobileNavElementContainer">
                <img className='pawMobileNav' src={pawMobileNav} alt="" />
                <p onClick={()=>gotoURL("/crucialToKnow")}>Fontos Tudnivalók</p>
            </div>
             <div className="faqMobile mobileNavElementContainer">
                <img className='pawMobileNav' src={pawMobileNav} alt="" />
                <p onClick={()=>gotoURL("/faq")}>Gyakran Ismételt Kérdések</p>
            </div>
             <div className="contact mobileNavElementContainer">
                <img className='pawMobileNav' src={pawMobileNav} alt="" />
                <p onClick={()=>gotoURL("/contact")}>Kapcsolat</p>
            </div>
             <div className="aboutme mobileNavElementContainer">
                <img className='pawMobileNav' src={pawMobileNav} alt="" />
                <p onClick={()=>gotoURL("/aboutme")}>Történetem</p>
            </div>
        </div>
    </div>
   </>
  )
}

export default MobileNavBar