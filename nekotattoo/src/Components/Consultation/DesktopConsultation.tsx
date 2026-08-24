import React from 'react'
import "./DesktopConsultation.css"
import Footer from '../Footer/Footer'
import upload from "../../../public/upload.png"
import { useState } from 'react'
import dropdown from "../../../public/right-arrow.png"
import arrow from "../../../public/right-arrow.png"
import widthHeight from "../../../public/length.png"
import check from "../../../public/check.png"
import catEar from "../../../public/catEar.svg"
import ai from "../../../public/ai.png"

type bodyPart = "Alkar" | "Felkar" | "Váll" | "Hát" | "Has" | "Nyak" | "Comb" | "Vádli" | "Boka" | "Lábfej" | "Kézfej" | "Mellkas" |"X" ;
type tattooStyle = "Fekete" | "Színes" 
const DesktopConsultation = () => {
  const [uploadClicked, setUploadClicked] = useState<boolean>(false) 
  const [image, setImage] = useState<string>("")
  const [bodyPart, setBodyPart] = useState<bodyPart>("X")
  const [bodypartDropdownActive, setBodypartDropdownActive] = useState<boolean>(false)
  const [heightValue, setHeightValue] = useState(0.0)
  const [widthValue, setWidthValue] = useState(0.0)
  const [tattooStyle, setTattooStyle] = useState<tattooStyle>("Fekete")
  const [customDesignCheck, setCustomDesignCheck] = useState<boolean>(false)
  const [customDesignTextLength, setCustomDesingTextLength] = useState<number>(0);
  const [customDesignText, setCustomDesignText] = useState<string>("")
  const [aiClicked, setAiClicked] = useState<boolean>(false)
  const [photoCounter, setPhotoCounter] = useState<number|undefined>(0)
  const [photoList, setPhotoList] = useState<string[]>([])
  const [numOfTattoos, setNumOfTattoos] = useState<number>(1)
  const bodyPartsList = [
      "Alkar",
      "Felkar",
      "Váll",
      "Hát",
      "Mellkas",
      "Has",
      "Nyak",
      "Comb",
      "Vádli",
      "Boka",
      "Lábfej",
      "Kézfej"
    ];

  function handleFileUpload(){
    const input = document.getElementById("photo-selector")
    input?.click()
    setUploadClicked(true)
    
  }
  function loadPhoto(direction:string){
    const currPhoto = image;
    
    let indexOfImage = photoList.indexOf(currPhoto);
    if (indexOfImage === -1) {
      indexOfImage+=1
    }
    if(direction == "next"){
      if (indexOfImage === 2) {

          setImage(photoList[0])
          
        }else{
          setImage(photoList[indexOfImage+1])
          
        }
      }
    else if(direction === "prev"){
        if (indexOfImage === 0) {
          setImage(photoList[2])
        }else{
        
          setImage(photoList[indexOfImage-1])
          
        }
    }
    
  }
  return (
    <>
      <div className="desktop-pricequote-background-container">
        <div className="pricequote-container">
          <div className="pricequote-inner-container">
            <div className="pricequote-header-container">
              <p className='pricequote-text'>ÁRAJÁNLAT</p>
            </div>
            <div className="pricequote-guidetext-container">
              <p className="guide-text">
              A <b>tetoválás ára</b> függ a <b>mérettől</b>, <b>stílustól, részletességtől és a tervezéstől is</b>, hogy kapj egy képet a tetoválás áráról, <b>töltsd fel a kívánt mintát a megfelelő helyre</b>, majd kérj egy ajánlatot, <b>amelyet a mesterésges inteligencia² határoz meg az ártáblázatom alapján</b>. Amennyiben megfelel az ajánlat, nyomj a tovább gombra, hogy megadhasd a konzultáció⁴ részleteit!
              <br /><br /><b>FIGYELEM:</b> Legfeljebb 4 tetoválást kérhetsz mérettől függetlenül, amely több alkalmat is magával vonhat (De ezt a konzultáció során mindenképpen megbeszéljük)!
              </p>
            </div>
            <div className="number-of-tattoos-outer-container">
              <button onClick={ ()=>{
                let count = numOfTattoos-1
                if (numOfTattoos < 2) {
                  setNumOfTattoos(1)
                }else{
                  setNumOfTattoos(numOfTattoos-1)
                }
              }
              } className='numoftattoo-button'>-</button>
              <div className="number-of-tattoos-container">
                    <p className='number-of-tattoos-text'>
                      {numOfTattoos}
                    </p>       
              </div>
              <button onClick={ ()=>{
                let count = numOfTattoos+1
                if (numOfTattoos > 3) {
                  setNumOfTattoos(4)
                }else{
                  setNumOfTattoos(numOfTattoos+1)
                }
              }
              } className='numoftattoo-button'>+</button>
            </div>  
            <div className="tattoo-information-window-container">
              <div className="photo-selector-outer-container">
                  <div onClick={()=> handleFileUpload()} className="photo-selector-container" 
                  style={{backgroundImage:`url(${image})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
                    <img  className={uploadClicked ? 'upload-img clicked' : 'upload-img'} src={upload} alt=""  />
                    <input 
                      multiple={customDesignCheck && true }
                      type="file" 
                      id='photo-selector'
                      accept='image/*'
                      onChange={(e) => {
                          const files = e.target.files;

                          if (!files || files.length === 0) return;
                          
                          const file = files[0];
                          
                          setImage(URL.createObjectURL(file));

                          if (customDesignCheck) {
                              setPhotoCounter(files.length);

                              Array.from(files).forEach((photo) => {
                                  setPhotoList(prev => [
                                      ...prev,
                                      URL.createObjectURL(photo)
                                  ]);
                              });
                            
                          }
                      }}
                    />
                    <div onClick={(e)=>{
                      e.stopPropagation()
                      loadPhoto("next")
                     
                    }} style={customDesignCheck && photoCounter > 1 ? {display:"flex"}:{display:'none'}} className='nextPhoto'><img src={arrow} alt="" /></div>
                    <div onClick={(e)=>{
                      e.stopPropagation()
                      loadPhoto("prev")
                    }}style={customDesignCheck && photoCounter > 1 ? {display:"flex"}:{display:'none'}} className='previousPhoto'><img src={arrow} alt="" /></div>
                    <span className='photoCounter' style={customDesignCheck ? {display:"block"} : {display:"none"}}>{photoCounter}/3</span>
                  </div>
              </div>
                <div className='right-container'>

                  <div className="custom-design-guide-text-container" style={customDesignCheck ? {display:'block'} : {display:'none'}}>
                    <p>
                      Tölts fel legfeljebb 3 képet olyan tetoválásokról, amelyeken megtetszett valami, vagy tölts fel legalább egy képet, amin változtatnál.
                      <br /><b>Fontos</b>: Részletesen írd le a “Tervezés” szövegdobozba, hogy hogyan gondoltad ki a tetoválást a legpontosabb árajánlathoz!
                    </p>
                  
                  
                  </div>

                  <div className="info-container">
                        <button onClick={()=> setBodypartDropdownActive(!bodypartDropdownActive)} data-name={"Testrész"} className='bodyPart-button infobutton'>
                          <p> {bodyPart} </p>
                          <img className={bodypartDropdownActive ? "rotateimage" : "img"} src={dropdown} alt="" />
                          <div className={bodypartDropdownActive ? "bodypart-dropdown active" : "bodypart-dropdown"}>
                                {
                                  bodyPartsList.map(part => (
                                    <p key={part} className='bodypart-option' onClick={()=> setBodyPart(part)}>
                                        {part}
                                    </p>
                                  ) )
                                }
                          </div>
                        </button>
                        <div className="height-input-container">
                          <input 
                          onChange={(e)=> {
                            const val = Number.parseFloat(e.target.value)
                            setHeightValue(val)
                          
                          }}
                          className='tattooHeight-input' 
                          placeholder='pl.: 10.5' 
                          type="number" 
                          min={0} 
                          step={0.1} />
                          <img className='widthHeight height' src={widthHeight} alt="" />
                        </div>
                        <div className="width-input-container">
                          <input 
                          onChange={(e)=> {
                            const val = Number.parseFloat(e.target.value)
                            setWidthValue(val)
                          
                          }}
                          className='tattooWidth-input' 
                          placeholder='pl.: 5.5' 
                          type="number" 
                          min={0} 
                          step={0.1} />
                          <img className='widthHeight width' src={widthHeight} alt="" />
                        </div>
                        <div className="style-container">
                          <p>Fekete</p>
                        </div>
                        <div className="custom-tattoo-check-button-container">
                          <button className='custom-design-check-button' onClick={()=>{
                                setCustomDesignCheck(!customDesignCheck)
                                setPhotoCounter(0)
                                setImage("")
                                setUploadClicked(false)
                              }}>
                              <img style={customDesignCheck ? {display:"block"} : {display:"none"}} className='check-img' src={check} alt="" />
                          </button>
                          <p>Egyedi minta³</p>
                        </div>
                      </div>
                        <div className="custom-design-tattoo-text-container" style={customDesignCheck ? {display:'block'} : {display:'none'}}>
                              <textarea onChange={(e)=> {
                                  setCustomDesignText(e.target.value)
                                  setCustomDesingTextLength(e.target.textLength)
                                }} className='custom-design-text' maxLength={150} />
                              <span className='lengthCounter'>{customDesignTextLength}/150</span>
                        </div>
                        <div className="price-quote-response-container">
                          <img className='left-cat-ear' src={catEar} alt="" />
                          <img className='right-cat-ear' src={catEar} alt="" />
                          {/* price quote response */}
                          <p>10 000 Ft</p>
                        </div>

                        <div className="ai-price-quote-button-container">
                          <button onClick={()=>{
                              setAiClicked(!aiClicked)
                          }} className= "ai-price-quote-button">
                            <img className='ai-icon' src={ai} alt="" />
                            <p>ÁRAJÁNLAT</p>
                            <img className='ai-icon' src={ai} alt="" />
                          </button>
                        </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </>
  )
}

export default DesktopConsultation