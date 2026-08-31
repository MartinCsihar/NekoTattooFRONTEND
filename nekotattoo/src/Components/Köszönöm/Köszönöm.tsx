import React from 'react'
import szfinxTámaszkodik from "../../../public/szfinxTámaszkodik.svg"
import szfinxVissza from "../../../public/szfinxVisszanéz.svg"
import "./Köszönöm.css"
import kira from "../../../public/Photos/Kira/side.png"
import thxCardLogo from "../../../public/thxCardLogo.svg"
const Köszönöm = () => {
  return (
    <>
      <main>
        <section>
          <div className="inner-content-contaner">
            <div className="photo-container" 
              style={{
                backgroundImage:`url(${kira})`,
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'left',
                borderRadius:'10px',
                opacity:"90%"
                }}>
            
            </div>
            <div className="thx-text-container">
                  <header>
                    <h1>Köszönöm!</h1>
                  </header>
                  <section>
                    <div className="thx-text-body">
                      <p>Nagyon örülök, hogy engem választottál a következő tetoválásodhoz.</p>
                      <p>A tetoválás számomra történetmesélés — alig várom, hogy megismerjem a tiédet, és együtt alkossunk valami igazán személyeset.</p>
                      <p>Ha van bármi kérdésed, nyugodtan vedd fel velem a <a href="/contacts">kapcsolatot</a>.</p>
                    </div>
                  </section>
                  <div className="thx-logo-container">
                    <img src={thxCardLogo} alt="" />
                  </div>
                  <img src={szfinxTámaszkodik} className='szfinx left' />
                  <img src={szfinxVissza}        className='szfinx right' />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Köszönöm