import React from 'react'
import "./CrucialToKnow.css"
import aftercare from "../../../public/aftercare.png"
import warning from "../../../public/warning.png"
import roseBody from "../../../public/roseBodyNew.svg"
import roseLeft from "../../../public/roseLeftNew.svg"
import roseRight from "../../../public/roseRight.svg"
const CrucialToKnow = () => {
  return (
    <>
        <main className='ctk-main-container'>
            <img src={roseBody} className='roseBody right' alt="" />
            <img src={roseBody} className='roseBody top' alt="" />
            <img className="roseDesignRight ctkrose" src={roseRight} alt=""  />
            <section className="aftercare-ctk-container">
                <section className="aftercare-container">
                        <header className="aftercare-header">
                            <img src={aftercare} className='aftercare-img' />
                            <h1>TETOVÁLÁS KEZELÉSE</h1>
                            <img src={aftercare} className='aftercare-img' />
                        </header>
                        <section className='aftercare-text-container'>
                                
                            <p><b>Első 3 nap</b>: Tartsd fólia alatt, 3–4 óránként (éjszaka nem kell felkelni) ismételd a tisztítást és krémezést .</p>
                            
                            <ol>
                                <li><b>Moss kezet</b>, <b>vedd le a fóliát</b>, <b>langyos vízzel</b> és <b>illatmentes szappannal mosd le.</b></li><br />
                                <li><b>Papírtörlővel itasd szárazra</b>, majd vékony rétegben <b>kend be Bepanthen krémmel</b> (nem Plus, Tattoo vagy kenőcs).</li><br />
                                <li><b>Hagyd pár percig levegőzni</b>, majd <b>tiszta fóliával fedd le újra</b>.</li><br />
                            </ol>
                            <p><b>4. naptól:</b> Már <b>nem kell fólia</b>, <b>de folytasd</b> a tisztítást és krémezést 3–4 óránként még kb. 7 napig.</p>
                        
                            <p><b>Teljes gyógyulás:</b> kb. 2 hét, ezalatt a tetkót sebszerűen kell kezelni.</p>
                        
                        </section>
                </section>
                <section className="ctk-container">
                        <header className="ctk-header">
                            <img src={warning} className='warning-img' />
                            <h1>FONTOS TUDNIVALÓK</h1>
                            <img src={warning} className='warning-img' />
                        </header>
                        <section className='ctk-text-container'> 
                            <ol>
                                <li>Gyógyulás alatt <b>ne áztasd</b> (zuhanyozni lehet).</li><br />
                                <li><b>Kerüld</b> a <b>termálfürdőt</b>, <b>napozást</b>, <b>barnító krémet</b>, <b>szoláriumot</b> legalább <b>2–3 hétig</b>.</li>
                                <li><b>Ne kapard</b>, <b>ne vakard</b> a hámló részeket.</li><br />
                                <li><b>Ne sportolj intenzíven</b> az első napokban — az <b>izzadság irritálhatja</b> a bőrt.</li><br />
                                <li>Ha erős <b>bőrpír</b>, <b>duzzanat</b>, <b>hólyagosodás</b> vagy <b>láz jelentkezik</b>, <b>fordulj orvoshoz</b>.</li><br />
                                <li><b>Kis mennyiségű</b> <b>vér</b> vagy <b>váladék</b> a fólia alatt <b>természetes</b>.</li><br />
                                <li>Háziállat <b>szőre ne érjen a tetkóhoz</b> a <b>gyógyulás idején</b>.</li><br />
                            </ol>
                        
                        </section>
                </section>
            </section>
        </main>
    </>
  )
}

export default CrucialToKnow