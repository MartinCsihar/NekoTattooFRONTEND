import React, { useEffect } from 'react'
import "./Gallery.css"
import roseBody from "../../../public/roseBodyNew.svg"
import roseLeft from "../../../public/roseLeftNew.svg"
import roseRight from "../../../public/roseRight.svg"
import textFlower from "../../../public/flower2.png"
const Gallery = () => {
    const refs = Object.values(
            import.meta.glob(
                "../../assets/Refs/*.{png,jpg,jpeg}"
                ,
                {
                    eager:true,
                    query:"?url",
                    import:"default"
                }
            )
        )
 
  return (
    <>
    <main className='gallery-main-container'>
      <img className="roseDesignLeft galleryrose" src={roseLeft} alt=""  />
      <img className="roseDesignRight galleryrose" src={roseRight} alt=""  />
      <img src={roseBody} className='roseBody bottom' alt="" />
      <img src={roseBody} className='roseBody left' alt="" />
      <img src={roseBody} className='roseBody right' alt="" />
      <img src={roseBody} className='roseBody top' alt="" />
      <section className='ref-photo-container'>
            {
                refs.map((image, index) =>(
                    <div style={
                        {
                            backgroundImage:`url(${image})`,
                            backgroundSize:"cover",
                            backgroundPosition:"center"
                        }
                    } className='gallery-image' key={index} ></div>
                ))
            }
      </section>
    </main>
    </>
  )
}

export default Gallery