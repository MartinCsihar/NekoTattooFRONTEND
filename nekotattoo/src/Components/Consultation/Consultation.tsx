import React, { ReactElement, useEffect, type ReactHTMLElement, type ReactNode } from 'react'
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
import TattooInformation from '../SubComponent/TattooInformation'
import plus from "../../../public/plus.png"
import axios from 'axios'
import { SyncLoader } from 'react-spinners'

type bodyPart = "Teljes Kar" |"Alkar" | "Felkar" | "Váll" | "Hát" | "Has" | "Nyak" | "Comb" | "Vádli" | "Boka" | "Lábfej" | "Kézfej" | "Mellkas" | "X" ;
type tattooStyle = "black" | "colored" 
type Tattoo = {
  id: number;
  width:number|undefined;
  height:number|undefined;
  style:tattooStyle;
  bodyPart: bodyPart;
  tattooPrice:number;
  tattooRefferences:File[];
  largeTattoo:boolean;
  customDesignTattoo:boolean;
  customDesignTattooText:string;
}
type GetPriceQuoteForCustomTattooReq = {
  tattooRefference:File[];
  customTattooText:string;
  width:number;
  height:number;
  tattooStyle:"black"
}
type GetPriceQuoteReq = {
  sizeWidth:number,
  sizeHeight:number,
  tattooRefference:File[]
}
type TattooCategory = "normal_text" | "normal" | "normal_custom" | "animal" | "detailed" | "detailed_custom" ;
type PriceQuoteForCustomDesignTattooRes = {
  estimatedWidth:number,
  estimatedHeight:number,
  isWrapAround:boolean,
  complexity:string,
  designNeeded:boolean,
  isAnimal:boolean,
  isText:boolean,
  category:TattooCategory,
  price:number,
  reason:string
}
type PriceQuoteRes = {
  estimatedWidth:number,
  estimatedHeight:number,
  isWrapAround:boolean,
  complexity:string,
  designNeeded:boolean,
  isAnimal:boolean,
  isText:boolean,
  category:TattooCategory,
  price:number,
  reason:string
}

const Consultation = () => {
  const [uploadClicked, setUploadClicked] = useState<boolean>(false) 
  const [image, setImage] = useState<string>("")
  const [bodyPart, setBodyPart] = useState<bodyPart>("X")
  const [bodypartDropdownActive, setBodypartDropdownActive] = useState<boolean>(false)
  const [heightValue, setHeightValue] = useState<number|undefined>(undefined)
  const [widthValue, setWidthValue] = useState<number|undefined>(undefined)
  const [tattooStyle, setTattooStyle] = useState<tattooStyle>("black")
  const [customDesignCheck, setCustomDesignCheck] = useState<boolean>(false)
  const [customDesignTextLength, setCustomDesingTextLength] = useState<number>(0);
  const [customDesignText, setCustomDesignText] = useState<string>("")
  const [aiClicked, setAiClicked] = useState<boolean>(false)
  const [photoCounter, setPhotoCounter] = useState<number|undefined>(0)
  const [photoList, setPhotoList] = useState<string[]>([])
  const [fileList, setFileList] = useState<File[]>([])
  const [tattoos,setTattoos] = useState<Tattoo[]>([])
  const [hidePlusButton, setHidePlusButton] =useState<boolean>(false)
  const [largeTattooBase, setLargeTattooBase] = useState<boolean>(false)
  const [tattooPriceBase, setTattooPriceBase] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  

  async function handlePriceQuoteForCustomDesignTattoo(){
    try{
      setLoading(true)
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append("tattooRefference", file)
      })
      formData.append("customTattooText", customDesignText)
      if (widthValue == undefined && heightValue == undefined) {
        formData.append("width", "")
        formData.append("height", "")
      }else{
        formData.append("width", widthValue.toString())
        formData.append("height", heightValue.toString())
      }
      formData.append("tattooStyle", tattooStyle)
      const res = 
        await axios.post("http://localhost:8099/api/getPriceQuoteForCustomTattoo", formData ,{withCredentials:true} )
      setTattooPriceBase(res.data.price)
      console.log(res.data)
      if(res.data.price === 0){
        setLargeTattooBase(true)
      }
      if (!largeTattooBase &&  widthValue == undefined && heightValue == undefined) {
        setWidthValue(res.data.estimatedWidth)
        setHeightValue(res.data.estimatedHeight)
      }
    }catch{
      alert("Elérted az AI árajánlat kereted, több árajánlatot nem kérhetsz!")
    }finally{
      setLoading(false)
    }
  }
  async function handlePriceQuote() {
    try{
      setLoading(true)
      const formData = new FormData()
      
      formData.append("tattooRefference", fileList[0])
      if (widthValue == undefined && heightValue == undefined) {
          formData.append("width", "")
          formData.append("height", "")
        }else{
          formData.append("width", widthValue.toString())
          formData.append("height", heightValue.toString())
        }
      const res = 
        await axios.post("http://localhost:8099/api/getPriceQuote", formData , {withCredentials:true})
      setTattooPriceBase(res.data.price)
      if(res.data.price === 0){
        setLargeTattooBase(true)
      }
       if (!largeTattooBase && widthValue == undefined && heightValue == undefined) {
        setWidthValue(res.data.estimatedWidth)
        setHeightValue(res.data.estimatedHeight)
      }
      console.log(res.data)
    }catch(error){
      alert("Elérted az AI árajánlat kereted, több árajánlatot nem kérhetsz!")
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
      if (widthValue != undefined && heightValue != undefined) {
        if (widthValue * heightValue >= 600) {
            setLargeTattooBase(true)
          }else{
           setLargeTattooBase(false)
        }
      }
     }, [widthValue, heightValue]) 

  const bodyPartsList = [
      "Kar",
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

  function deleteTattoo(id:number){
    setTattoos(p => p.filter(tattoo => tattoo.id !== id))
    setHidePlusButton(false)
  } 
    
  function updateTattoo(id:number, changes:Partial<Tattoo>){
    setTattoos(prev => 
      prev.map(tattoo => tattoo.id === id ? {...tattoo, ...changes} : tattoo)
    )
  }
  const formatHuf = (value: number): string => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(value);
  };

  function handleFileUpload(){
    const input = document.getElementById("photo-selector-base")
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
                A <b>tetoválás ára</b> függ a <b>mérettől</b>, <b>stílustól, részletességtől és a tervezéstől is</b>. Annak érdekében, hogy kapj egy képet a tetoválás áráról, <b>töltsd fel a kívánt mintát a megfelelő helyre</b>, majd kérj egy ajánlatot, <b>amelyet a mesterésges inteligencia² határoz meg az ártáblázatom alapján</b>. Amennyiben megfelel az ajánlat, nyomj a tovább gombra, hogy megadhasd a konzultáció⁴ részleteit!
                <br /><br /><b>FIGYELEM:</b> Legfeljebb 4 tetoválást kérhetsz mérettől függetlenül, amely több alkalmat is magával vonhat (De ezt a konzultáció során mindenképpen megbeszéljük)!
                <br /><br /><b>FONTOS:</b> A tetoválás méreteit nem kötelező megadni, azonban <b>nagyon ajánlott, amennyiben pontos árajánlatot szeretnél kapni!</b>
                <br /><br /><b>AI ÁRAJÁNLAT:</b> Az esetleges félreértések végett legfeljebb <b>4 árajánlatot kérhetsz!</b> Kérlek legyél erre tekintettel.
              </p>
            </div>
            <div className="tattoo-information-window-container">
              <div className="photo-selector-outer-container">
                  <div onClick={()=> handleFileUpload()} className="photo-selector-container" 
                  style={{backgroundImage:`url(${image})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
                    <img  className={uploadClicked ? 'upload-img clicked' : 'upload-img'} src={upload} alt=""  />
                    <input 
                      multiple={customDesignCheck}
                      type="file" 
                      id='photo-selector-base'
                      accept='image/*'
                      onChange={(e) => {
                          const files = e.target.files;

                          if (!files || files.length === 0) return;
                          
                          const file = files[0];
                          const fileArray = Array.from(files)
                          setFileList(fileArray)

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
                          <p> {bodyPart == "X" ? "" : bodyPart} </p>
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
                          value={heightValue}
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
                          value={widthValue}
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
                                }} className='custom-design-text' maxLength={200} />
                              <span className='lengthCounter'>{customDesignTextLength}/200</span>
                        </div>
                        
                        {!largeTattooBase ? 
                        <>
                          <div className="price-quote-response-container">
                            <img className='left-cat-ear' src={catEar} alt="" />
                            <img className='right-cat-ear' src={catEar} alt="" />
                            {/* price quote response */}
                            <p>{tattooPriceBase === undefined ? undefined : formatHuf(tattooPriceBase)}</p>
                          </div>

                          <div className="ai-price-quote-button-container">
                            <button onClick={()=>{
                              
                                if(fileList.length == 0){
                                  alert("Először tölts fel képet/képeket a tetoválásról!")
                                  return;

                                }else{
                                  if(customDesignCheck){
                                    handlePriceQuoteForCustomDesignTattoo()
                                  }else{
                                    handlePriceQuote()
                                }
                                }
                            }} className={loading ? "ai-price-quote-button loading" : "ai-price-quote-button"}>
                              <img className='ai-icon' src={ai} alt="" />
                              {loading ? <SyncLoader loading={loading}/> :<p>ÁRAJÁNLAT</p>}
                              <img className='ai-icon' src={ai} alt="" />
                            </button>
                           </div>
                        </> : <div className="large-tattoo-text-container">
                              <p className='large-tattoo-text'>A <b>tetoválásod</b>, mérete alapján teljesen <b>egyedi árazást igényel</b>, így AI árajánlat nem kérhető rá. A konzultáció során megbeszéljük a pontos árát. </p>
                            </div>
                        }
              </div>
            </div>
            {
              tattoos.map(tattoo => (
                <TattooInformation
                  tattoo={tattoo}
                  onDelete={() => deleteTattoo(tattoo.id)}
                  onChange={updateTattoo}
                  key={tattoo.id}
                />
              ))
            }
            <div className="add-tattoo-button-container" style={!hidePlusButton && tattoos.length < 3  ? {display:"flex"} : {display: "none"}}>
              <button onClick={() => {

                if (tattoos.length < 4) {
                  
                  setTattoos(prev => [...prev, {
                    id:Date.now(),
                    width:undefined,
                    height:undefined,
                    style:"black",
                    bodyPart:"X",
                    tattooPrice:0,
                    tattooRefferences:[],
                    largeTattoo:false,
                    customDesignTattoo:false,
                    customDesignTattooText:""
                  }])
                  
                }else{
                  
                  setHidePlusButton(true)
                  alert("Legfeljebb 4 tetoválást választhatsz!")

                }
                
              }} className="add-tattoo-button">
                <img src={plus} alt="" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Consultation