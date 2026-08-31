import React from 'react'
import "./Contact.css"
import roseBody from "../../../public/roseBody.svg"
import bambino from "../../../public/bambino.svg"
import szfinx from "../../../public/szfinxVisszanéz.svg"
import destination from "../../../public/gps.png"
import paws from "../../../public/footprint.png"
import phone from "../../../public/phone-call.png"
import tiktok from "../../../public/tiktok.png"
import facebook from "../../../public/facebook.png"
import instagramm from "../../../public/instagram.png"
import mail from "../../../public/emailBlack.png"
import { Map } from '../SubComponent/Map'
import { useState } from 'react'
const Contact = () => {
    const [phoneActive, setPhoneActive] = useState<boolean>(false) 
    const [mailActive, setMailActive] = useState<boolean>(false) 
    const [copied, setCopied] = useState<boolean>(false)
    
    function handleOnClick(where:string){
        document.getElementById(`${where}link`)?.click();
    }
    function handleCopy(){
        navigator.clipboard.writeText("+36 30 368 3414")
        setCopied(true);
        alert("Sikeresen kimásoltad a telefonszámot!")
    }

  return (
    <main className='contact-main-container'>
        <section className='google-maps-container'>
            <Map classN="google-maps"/>
        </section>
        <section className="contact-information-outer-container">
            <div className="contact-info-container">
                <div className="location-container">
                    <img src={destination} alt=""  />
                    <p>Farád, Győri út 34.</p>
                </div>
                <img src={paws} className='paws' />
                <div className="socialmedias-container">
                    
                    <div  className="phone-container social-container">
                        <img  onClick={() => {setPhoneActive(!phoneActive)}} src={phone} alt="" className='social-icon phone-icon'/>
                         <div onClick={()=> {
                            handleCopy()
                            }} className={phoneActive ? "phone-innertext-container innertext-container active" : "phone-innertext-container innertext-container"}>
                            <p>+36 30 368 3414</p>
                        </div>
                        
                    </div>
                    <div  className="tiktok-container social-container">
                        <img onClick={()=>handleOnClick("tiktok")}   src={tiktok} alt="" className='social-icon tiktok-icon'/>
                        <a id='tiktoklink' href="https://www.tiktok.com" target='_blank'>nekoTattoo</a> 
                    </div>
                    <div className="facebook-container social-container">
                        <img onClick={()=>handleOnClick("facebook")}  src={facebook} alt="" className='social-icon facebook-icon'/>
                        <a id='facebooklink' href="https://www.facebook.com" target='_blank'>nekoTattoo</a>
                    </div>
                    <div className="insta-container social-container">
                        <img onClick={()=>handleOnClick("insta")}  src={instagramm}  className='social-icon insta-icon'/>
                        <a id='instalink' href="https://www.instagram.com" target='_blank'>nekoTattoo</a>
                    </div>
                    <div className="mail-container social-container mail-social">
                        <img  onClick={()=>{
                            setMailActive(!mailActive)
                            
                            }} src={mail} alt="" className='social-icon mail-icon'/>
                        <div onClick={()=> handleOnClick("mail")} className={mailActive ? "mail-innertext-container innertext-container active" : "mail-innertext-container innertext-container"}>
                            <p>nekotattoo26@gmail.com</p>
                        </div>
                        <a id='maillink'  href="mailto:nekotattoo26@gmail.com"  target='_blank'>nekotattoo26@gmail.com</a>
                    </div>
                </div>
            </div>
        </section>
        <img src={bambino} className='bambino' />
    </main>
  )
}

export default Contact