import React, { useEffect } from 'react'
import "./AboutMe.css"
import roseBody from "../../../public/roseBodyNew.svg"
import roseLeft from "../../../public/roseLeftNew.svg"
import roseRight from "../../../public/roseRight.svg"
import textFlower from "../../../public/flower2.png"
import beniTop from "../../../public/Photos/Beni/beni2.png"
import beniBot from "../../../public/Photos/Beni/beni1.png"
import beniAlszik from "../../../public/bambinoAlszik.svg"

const AboutMe = () => {
  const refs = Object.values(
      import.meta.glob(
          "../../assets/Refs/*.{png,jpg,jpeg,webp}",
          {
              eager: true,
              query: "?url",
              import: "default"
          }
      )
  );
  useEffect(()=>{
    if (window.innerWidth <= 1500) {
      const images = document.querySelectorAll(".ref-image");
      const imagesBeni = document.querySelectorAll(".beni-photo");
      const observer = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            observer.unobserve(entry.target)
          }
        })
      }, {threshold: 0.3}
    )
      images.forEach(image => {
        observer.observe(image)
      })
       imagesBeni.forEach(image => {
         observer.observe(image)
       })
      return () => observer.disconnect()
    }
  },[])
  return (
    <>
    <main className='aboutme-mystory-container'>
      <img className="roseDesignLeft aboutmerose" src={roseLeft} alt=""  />
      <img className="roseDesignRight aboutmerose" src={roseRight} alt=""  />
      <img src={roseBody} className='roseBody bottom' alt="" />
      <img src={roseBody} className='roseBody left' alt="" />
      <img src={roseBody} className='roseBody right' alt="" />
      <img src={roseBody} className='roseBody top' alt="" />
      <section className='mid-container'>
            <div className="inner-section-container">
                <section className="aboutme-photo-container">
                  
                </section>
                <section className="aboutme-text-container">
                    <img src={textFlower} className='text-flower top'/>
                    <img src={textFlower} className='text-flower bottom'/>
                    <p>
                         Szia!   <br />
                        Kira vagyok, feltörekvő tetováló. Mindig is tudtam, hogy az alkotás az én utam. A művészet számomra az önkifejezés eszköze — az érzelmek, gondolatok és történetek láthatóvá tétele. Minden embernek megvan a saját története, éppen ezért minden mintához - legyen az egy apró finom vonal vagy egy összetett projekt - szívvel-lélekkel, maximális alázattal és tűpontos precizitással állok. 
                        <br /><br />
                        Miért éppen <b>Neko Tattoo</b>? <br />
                        A „neko” japánul macskát jelent. A név mögött a legmélyebb szeretet és egyben a legnagyobb fájdalom rejlik. Beni -aki a képeken is látható- sokszor órákig nézett miközben rajzolok. Szeretett az ölemben aludni, amíg elkészült egy-egy alkotás. A név és a logó egy halk, szeretetteljes tisztelgés és megemlékezés elötte.

                        A Neko Tattoo számomra nem csupán egy munkahely, hanem egy valóra vált álom, ahol az érzések művészetté válnak.  
                    </p>
                </section>
                <div className="beni-photo-container">
                    <img src={beniTop} className='beni-photo top' />
                    <div className="beni-photo bot" style={{
                        backgroundImage:`url(${beniBot})`,
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"cover",
                        backgroundPosition:"center"
                    }}></div>
                </div>
            </div>
      {
        window.innerWidth <= 1500 &&
        
        <section className='reference-photo-container'>
            <img src={beniAlszik} className='beni-alszik' />
            {
              refs.map((ref:string) => (
                  <img className='ref-image' src={ref} key={ref} />
              ))
            }
        </section>
    
      }
      </section>
    </main>
    </>
  )
}

export default AboutMe