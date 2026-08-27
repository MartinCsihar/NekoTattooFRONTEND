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

type bodyPart = "Kar" | "Alkar" | "Felkar" | "Váll" | "Hát" | "Has" | "Nyak" | "Comb" | "Vádli" | "Boka" | "Lábfej" | "Kézfej" | "Mellkas" |"X" ;
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
  const [photoCounter, setPhotoCounter] = useState<number|undefined>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const [photoList, setPhotoList] = useState<string[]>([])
  const [image, setImage] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null);

  const bodyPartsList: bodyPart[] = [
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

  async function handlePriceQuoteForCustomDesignTattoo(){
    try{
     
      setLoading(true)
      const formData = new FormData()
      tattoo.tattooRefferences?.forEach(file => {
        formData.append("tattooRefference", file)
      })
      formData.append("customTattooText", tattoo.customDesignTattooText)
      formData.append("sizeWidth", tattoo.width == undefined ? "" : tattoo.width.toString())
      formData.append("sizeHeight", tattoo.height == undefined ? "" : tattoo.height.toString())
      formData.append("tattooStyle", tattoo.style)

       const res = 
         await axios.post("http://localhost:8099/api/getPriceQuoteForCustomTattoo", formData ,{withCredentials:true} )

       onChange(tattoo.id, {tattooPrice:res.data.price})

      if (res.data.wrongCustomText) {
          alert("Kérlek adj meg egy normális szöveget!")
          onChange(tattoo.id, {customDesignTattooText:""})
       }
       if(res.data.price === 0){
         onChange(tattoo.id, {largeTattoo:true})
       }
       
        if (res.data.notRealMeasure) {
          if (tattoo.width !== undefined && tattoo.height !== undefined && res.data.notRealMeasure) {
            alert("Az általad megadott méretek valószínüleg nem helyesek, ezért lecseréltem őket egy becsült értékre")
          }else{
            alert("Mivel nem adtál meg méreteket, így a helyükre egy becsült érték kerül!")
          }
        }
       let noMeasuresGivenAndNotLargeTatt = (!tattoo.largeTattoo &&  (tattoo.width == undefined || isNaN(tattoo.width)) && (tattoo.height == undefined || isNaN(tattoo.height)))
      let noMeasuresGivenAndLargeTatt = (tattoo.largeTattoo &&  (tattoo.width == undefined || isNaN(tattoo.width)) && (tattoo.height == undefined || isNaN(tattoo.height)))
     
       if (res.data.notRealMeasure || noMeasuresGivenAndLargeTatt || noMeasuresGivenAndNotLargeTatt) {
         onChange(tattoo.id, {width:res.data.estimatedWidth})
         onChange(tattoo.id, {height:res.data.estimatedHeight})
        }
      
    }catch(err){
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
      formData.append("sizeWidth", tattoo.width == undefined ? "" : tattoo.width.toString())
      formData.append("sizeHeight", tattoo.height == undefined ? "" : tattoo.height.toString())
      
      const res = 
        await axios.post("http://localhost:8099/api/getPriceQuote", formData , {withCredentials:true})
      if (res.data.wrongCustomText) {
        alert("Kérlek adj meg egy normális szöveget. Ez egy árajánlatba került!")
        onChange(tattoo.id, {customDesignTattooText:""})
      }else{
        onChange(tattoo.id, {tattooPrice:res.data.price})
        if(res.data.price === 0){
          onChange(tattoo.id, {largeTattoo:true})
        }
      
         let noMeasuresGivenAndNotLargeTatt = (!tattoo.largeTattoo &&  (tattoo.width == undefined || isNaN(tattoo.width)) && (tattoo.height == undefined || isNaN(tattoo.height)))
         let noMeasuresGivenAndLargeTatt = (tattoo.largeTattoo &&  (tattoo.width == undefined || isNaN(tattoo.width)) && (tattoo.height == undefined || isNaN(tattoo.height)))
          if (res.data.notRealMeasure) {
            if (tattoo.width !== undefined && tattoo.height !== undefined && res.data.notRealMeasure) {
              alert("Az általad megadott méretek valószínüleg nem helyesek, ezért lecseréltem őket egy becsült értékre")
            }else{
              alert("Mivel nem adtál meg méreteket, így a helyükre egy becsült érték kerül!")
        }
        }
        if (res.data.notRealMeasure || noMeasuresGivenAndLargeTatt || noMeasuresGivenAndNotLargeTatt) {
          onChange(tattoo.id, {width:res.data.estimatedWidth})
          onChange(tattoo.id, {height:res.data.estimatedHeight})
          }
    
      }
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
      if ((indexOfImage == 1 && photoList.length == 2 )||( indexOfImage == 2 && photoList.length == 3)) {
          setImage(photoList[0])
          
        }else{
          setImage(photoList[indexOfImage+1])
          
        }
      }
    else if(direction === "prev"){
        if (indexOfImage === 0 && photoList.length == 3) {
          setImage(photoList[2])
        }else if(indexOfImage === 0 && photoList.length == 2){
          setImage(photoList[1])
        }
        else{
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
                      maxLength={3}
                      type="file" 
                      ref={fileInputRef}
                      id='photo-selector'
                      accept='image/*'
                      onChange={(e) => {
                          const files = e.target.files;

                          if (!files || files.length === 0) return;
                          if (files.length > 3) {
                            alert("Legfeljebb 3 képet válassz ki!")
                            return;
                          }
                          const filesArray = Array.from(files);
                          onChange(tattoo.id, {tattooPrice:0})
                          if (tattoo.customDesignTattoo) {
                            onChange(tattoo.id, {tattooPrice:0})
    
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
                    <span className='photoCounter' style={tattoo.customDesignTattoo ? {display:"block"} : {display:"none"}}> <p>{photoCounter}/3</p></span>
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
                            const val =  e.target.value
                            onChange(tattoo.id, {
                              height: val === "" ? undefined : Number.parseFloat(val)
                            });
                          
                          }}
                          className='tattooHeight-input' 
                          placeholder='pl.: 10,5' 
                          type="number" 
                          min={0} 
                          step={0.1} />
                          <img className='widthHeight height' src={widthHeight} alt="" />
                        </div>
                        <div className="width-input-container">
                          <input 
                          value={tattoo.width}
                          onChange={(e)=> {
                            const val =  e.target.value
                            onChange(tattoo.id, {
                              width: val === "" ? undefined : Number.parseFloat(val)
                            });
                          
                          }}
                          className='tattooWidth-input' 
                          placeholder='pl.: 5,5' 
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
                                onChange(tattoo.id, {tattooPrice:0})
                                setPhotoCounter(0)
                                setImage("")
                                setUploadClicked(false)
                              }}>
                              <img style={tattoo.customDesignTattoo ? {display:"block"} : {display:"none"}} className='check-img' src={check} alt="" />
                          </button>
                          <p>Egyedi minta</p>
                        </div>
                      </div>
                        <div className="custom-design-tattoo-text-container" style={tattoo.customDesignTattoo ? {display:'block'} : {display:'none'}}>
                              <textarea onChange={(e)=> {
                                  onChange(tattoo.id, {customDesignTattooText:e.target.value})
                                  setCustomDesingTextLength(e.target.textLength)
                                }} className='custom-design-text' maxLength={200} />
                              <span className='lengthCounter'>{customDesignTextLength}/200</span>
                        </div>
                          {   !tattoo.largeTattoo ?
                            <>
                              <div className="price-quote-response-container">
                                <img className={loading ? 'left-cat-ear rotate-ear' : 'left-cat-ear'} src={catEar} alt="" />
                            <img className={loading ? 'right-cat-ear rotate-ear' : 'right-cat-ear'} src={catEar} alt="" />
                                {/* price quote response */}
                                <p>{tattoo.tattooPrice === 0 ? undefined : formatHuf(tattoo.tattooPrice)}</p>
                              </div>

                              <div className="ai-price-quote-button-container">
                                <button onClick={()=>{
                                  if(tattoo.tattooPrice !== 0) {
                                    alert("Erre a tetoválásra már kértél egy árajánlatot!")
                                  }else{

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
                              <p className='large-tattoo-text'>A <b>tetoválásod</b> mérete alapján teljesen <b>egyedi árazást igényel</b>, így erre nem kérhető AI árajánlat. A konzultáció során megbeszéljük a pontos árat. </p>
                            </div>
                        }
              </div>
        </div>
   )
}

export default TattooInformation;