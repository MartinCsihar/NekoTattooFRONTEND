import React, { useEffect } from 'react'

import "../../Components/Consultation/DesktopConsultation.css"
import upload from "../../../public/upload.png"
import { useState } from 'react'
import dropdown from "../../../public/right-arrow.png"
import arrow from "../../../public/right-arrow.png"
import widthHeight from "../../../public/length.png"
import check from "../../../public/check.png"
import catEar from "../../../public/catEar.svg"
import ai from "../../../public/ai.png"
import plus from "../../../public/plus.png"
import { useRef } from 'react'
import { SyncLoader } from 'react-spinners'
import axios from 'axios'

type bodyPart = "Teljes Kar" |"Alkar" | "Felkar" | "Váll" | "Hát" | "Has" | "Nyak" | "Comb" | "Vádli" | "Boka" | "Lábfej" | "Kézfej" | "Mellkas" |"X" ;
type tattooStyle = "Fekete" | "Színes" 
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
  width:Number;
  height:Number;
  tattooStyle:"Fekete"
}
type GetPriceQuoteReq = {
  sizeWidth:Number,
  sizeHeight:Number,
  tattooRefference:File[]
}


type TattooInformationProps = {
  onDelete: () => void;
  onChange: (id:number, changes:Partial<Tattoo>) => void,
  tattoo: Tattoo;
}

const TattooInformation = ({onDelete, onChange, tattoo}:TattooInformationProps) => {

  const [uploadClicked, setUploadClicked] = useState<boolean>(false) 
  const [bodypartDropdownActive, setBodypartDropdownActive] = useState<boolean>(false)
  
  const [customDesignCheck, setCustomDesignCheck] = useState<boolean>(false)
  const [customDesignTextLength, setCustomDesingTextLength] = useState<number>(0);
  const [customDesignText, setCustomDesignText] = useState<string>("")
  const [aiClicked, setAiClicked] = useState<boolean>(false)
  const [photoCounter, setPhotoCounter] = useState<number|undefined>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const [photoList, setPhotoList] = useState<string[]>([])
  const [image, setImage] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null);

  const bodyPartsList: bodyPart[] = [
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

async function handlePriceQuoteForCustomDesignTattoo(){
    try{
      setLoading(true)
      const formData = new FormData()
      tattoo.tattooRefferences?.forEach(file => {
        formData.append("tattooRefference", file)
      })
      formData.append("customTattooText", customDesignText)
      formData.append("width", tattoo.width.toString())
      formData.append("height", tattoo.height.toString())
      formData.append("tattooStyle", tattoo.style)
      const res = 
        await axios.post("http://localhost:8099/api/getPriceQuoteForCustomTattoo", formData ,{withCredentials:true} )
      onChange(tattoo.id, {tattooPrice:res.data.price})

      if (!tattoo.largeTattoo &&  tattoo.width == undefined && tattoo.height == undefined) {
        onChange(tattoo.id, {width:res.data.estimatedWidth})
        onChange(tattoo.id, {height:res.data.estimatedHeight})
      }
      console.log(res.data)
      if(res.data.price === 0){
        onChange(tattoo.id, {largeTattoo:true})
      }
      
    }catch(err){
      console.log(err)
       alert("Elérted az AI árajánlat kereted, több árajánlatot nem kérhetsz!")
    }finally{
      setLoading(false)
    }
  }
  async function handlePriceQuote() {
    try{
      setLoading(true)
      const formData = new FormData()
      
      formData.append("tattooRefference", tattoo.tattooRefferences[0])
      if (tattoo.width == undefined && tattoo.height == undefined ) {
        formData.append("width", "")
        formData.append("height","")
        
      }else{
        formData.append("width", tattoo.width?.toString())
        formData.append("height", tattoo.height?.toString())
        
      }
      const res = 
      await axios.post("http://localhost:8099/api/getPriceQuote", formData , {withCredentials:true})
        
      onChange(tattoo.id, {tattooPrice:res.data.price})
      if(res.data.price === 0){
        onChange(tattoo.id, {largeTattoo:true})
      }
      if (!tattoo.largeTattoo && tattoo.width == undefined && tattoo.height == undefined) {
        onChange(tattoo.id, {width:res.data.estimatedWidth})
        onChange(tattoo.id, {height:res.data.estimatedHeight})
      }
      console.log(res.data)
    }catch(err){
      alert("Elérted az AI árajánlat kereted, több árajánlatot nem kérhetsz!")
    }finally{
      setLoading(false)
    }
  }


   useEffect(()=>{
    if (tattoo.width != undefined && tattoo.height != undefined) {
  
      if (tattoo.width * tattoo.height >= 600) {
          onChange(tattoo.id, {largeTattoo:true})
        }else{
          onChange(tattoo.id, {largeTattoo:false})
      }
    }
   }, [tattoo.width, tattoo.height]) 
  function handleFileUpload(){
    fileInputRef.current?.click()
  
    setUploadClicked(true)
    
  }
    const formatHuf = (value: number): string => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(value);
  };
  function loadPhoto(direction:string){
    const currPhoto = image;
    
    let indexOfImage = photoList.indexOf(currPhoto);

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
          <div className="tattoo-information-window-container">
            <button className="delete-button" onClick={onDelete}>
              <img src={plus} alt="" />
            </button>
              <div className="photo-selector-outer-container">
                  <div onClick={()=> handleFileUpload()} className="photo-selector-container" 
                  style={{backgroundImage:`url(${image})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
                    <img  className={uploadClicked ? 'upload-img clicked' : 'upload-img'} src={upload} alt=""  />
                    <input 
                      multiple={tattoo.customDesignTattoo}
                      type="file" 
                      ref={fileInputRef}
                      id='photo-selector'
                      accept='image/*'
                      onChange={(e) => {
                          const files = e.target.files;

                          if (!files || files.length === 0) return;
                          
                          const filesArray = Array.from(files);
                          
                          if (tattoo.customDesignTattoo) {
    
                              const urls = filesArray.map(file =>
                                  URL.createObjectURL(file)
                              );
                              setImage(urls[0])
                              setPhotoList(urls)
                              setPhotoCounter(urls.length);

                              onChange(tattoo.id, {tattooRefferences:filesArray})
                            }else{
                              const file = files[0];
                              setImage(URL.createObjectURL(file));
                              onChange(tattoo.id, {tattooRefferences: filesArray })

                            }
                      }}
                    />
                    <div onClick={(e)=>{
                      e.stopPropagation()
                      loadPhoto("next")
                     
                    }} style={tattoo.customDesignTattoo && photoCounter > 1 ? {display:"flex"}:{display:'none'}} className='nextPhoto'><img src={arrow} alt="" /></div>
                    <div onClick={(e)=>{
                      e.stopPropagation()
                      loadPhoto("prev")
                    }}style={tattoo.customDesignTattoo && photoCounter > 1 ? {display:"flex"}:{display:'none'}} className='previousPhoto'><img src={arrow} alt="" /></div>
                    <span className='photoCounter' style={tattoo.customDesignTattoo ? {display:"block"} : {display:"none"}}>{photoCounter}/3</span>
                  </div>
              </div>
                <div className='right-container'>

                  <div className="custom-design-guide-text-container" style={tattoo.customDesignTattoo ? {display:'block'} : {display:'none'}}>
                    <p>
                      Tölts fel legfeljebb 3 képet olyan tetoválásokról, amelyeken megtetszett valami, vagy tölts fel legalább egy képet, amin változtatnál.
                      <br /><b>Fontos</b>: Részletesen írd le a “Tervezés” szövegdobozba, hogy hogyan gondoltad ki a tetoválást a legpontosabb árajánlathoz!
                    </p>
                  
                  
                  </div>

                  <div className="info-container">
                        <button onClick={()=> setBodypartDropdownActive(!bodypartDropdownActive)} data-name={"Testrész"} className='bodyPart-button infobutton'>
                          <p> {tattoo.bodyPart == "X" ? "" : tattoo.bodyPart} </p>
                          <img className={bodypartDropdownActive ? "rotateimage" : "img"} src={dropdown} alt="" />
                          <div className={bodypartDropdownActive ? "bodypart-dropdown active" : "bodypart-dropdown"}>
                                {
                                  bodyPartsList.map(part => (
                                    <p key={part} className='bodypart-option' onClick={()=> onChange(tattoo.id, {bodyPart:part})}>
                                        {part}
                                    </p>
                                  ) )
                                }
                          </div>
                        </button>
                        <div className="height-input-container">
                          <input 
                          value={tattoo.height}
                          onChange={(e)=> {
                            const val = Number.parseFloat(e.target.value)
                            onChange(tattoo.id, {height:val})
                          
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
                          value={tattoo.width}
                          onChange={(e)=> {
                            const val = Number.parseFloat(e.target.value)
                            onChange(tattoo.id, {width:val})
                          
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
                                onChange(tattoo.id, {customDesignTattoo:!customDesignCheck})
                                setPhotoCounter(0)
                                setImage("")
                                setUploadClicked(false)
                              }}>
                              <img style={tattoo.customDesignTattoo ? {display:"block"} : {display:"none"}} className='check-img' src={check} alt="" />
                          </button>
                          <p>Egyedi minta³</p>
                        </div>
                      </div>
                        <div className="custom-design-tattoo-text-container" style={tattoo.customDesignTattoo ? {display:'block'} : {display:'none'}}>
                              <textarea onChange={(e)=> {
                                  onChange(tattoo.id, {customDesignTattooText:e.target.value})
                                  setCustomDesingTextLength(e.target.textLength)
                                }} className='custom-design-text' maxLength={150} />
                              <span className='lengthCounter'>{customDesignTextLength}/150</span>
                        </div>
                          {   !tattoo.largeTattoo ?
                            <>
                              <div className="price-quote-response-container">
                                <img className='left-cat-ear' src={catEar} alt="" />
                                <img className='right-cat-ear' src={catEar} alt="" />
                                {/* price quote response */}
                                <p>{tattoo.tattooPrice === undefined ? formatHuf(0) : formatHuf(tattoo.tattooPrice)}</p>
                              </div>

                              <div className="ai-price-quote-button-container">
                                <button onClick={()=>{
                                  if(tattoo.tattooRefferences.length == 0){
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
                            </>             
                            : 
                            <div className="large-tattoo-text-container">
                              <p className='large-tattoo-text'>A <b>tetoválásod</b>, mérete alapján teljesen <b>egyedi árazást igényel</b>, így AI árajánlat nem kérhető rá. A konzultáció során megbeszéljük a pontos árát. </p>
                            </div>
                        }
              </div>
        </div>
   )
}

export default TattooInformation;