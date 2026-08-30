import React, { useEffect, useState } from 'react'
import "./ConsultationFinal.css"
import { Form, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import mail from "../../../public/email.png"
import phone from "../../../public/telephone.png"
import { IMaskInput } from 'react-imask'
import person from "../../../public/person.png"
import check from "../../../public/check.png"
import catFinal from "../../../public/szfinxBirizgál.svg"
import { PulseLoader } from 'react-spinners'
import axios from 'axios'
import bambinoSleepFinal from "../../../public/bambinoAlszik.svg"

type bodyPart = "Teljes Kar" |"Alkar" | "Felkar" | "Váll" | "Hát" | "Has" | "Nyak" | "Comb" | "Vádli" | "Boka" | "Lábfej" | "Kézfej" | "Mellkas" | "X" ;
type tattooStyle = "black" | "colored" 
type Tattoo = {
  id: number;
  width:number;
  height:number;
  style:tattooStyle;
  bodyPart: bodyPart;
  tattooPrice:number;
  tattooRefferences:File[];
  largeTattoo:boolean;
  customDesignTattoo:boolean;
  customDesignTattooText:string;
}

const ConsultationFinal = () => {
    const [tattoos, setTattoos] = useState<Tattoo[]>([])
    const [email, setEmail] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [finalPrice, setFinalPrice] = useState<string>(0)
    const [searchParams] = useSearchParams()
    const [checked, setChecked] = useState<boolean>(false)
    const [loading,  setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const location = useLocation();

  const formatHuf = (value: number): string => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(value);
  };
    useEffect(()=>{
     const price = Number.parseInt(searchParams.get("p")); 
     setFinalPrice(formatHuf(price))
     const tats = location.state?.tattoos
     setTattoos(tats)
     console.log(tats)

      if (!tats) {
          alert("Ácsi, még nincs is kiválasztva tetoválás!")
          navigate("/createConsultation", { replace: true });
      }else{
      }
         setTattoos(tats)
    },[])
  async function handleCreateConsultation(){
      try {
        setLoading(true)
        if(!checked) {
          alert("Nem fogadtad el az Adatkezelési Tájékoztatót és az Általános Szerződési Feltételeket!")
          return;
        }
        if (email.length == 0) {
          alert("Üres az email!")
          return;
        }
        if(phoneNumber.includes("_")){
          alert("Hibás telefonszám!")
          return;
        }
        if(firstName == "" || lastName == ""){
          alert("Kérlek add meg a nevedet!")
          return;
        }
        const formData = new FormData()

        const tats = tattoos;
        
        formData.append(`email`, email)
        formData.append(`phoneNumber`, phoneNumber)
        formData.append(`lastName`, lastName)
        formData.append(`firstName`, firstName)
        
        tats.forEach((tattoo, index) =>{
        formData.append(`tattooData[${index}].width`, tats[index].width.toString())
        formData.append(`tattooData[${index}].height`, tats[index].height.toString())
        formData.append(`tattooData[${index}].style`, tats[index].style.toString())
        formData.append(`tattooData[${index}].bodyPart`, tats[index].bodyPart.toString())
        formData.append(`tattooData[${index}].tattooPrice`, tats[index].tattooPrice.toString())
        formData.append(`tattooData[${index}].largeTattoo`, tats[index].largeTattoo.toString())
        formData.append(`tattooData[${index}].customDesignTattoo`, tats[index].customDesignTattoo.toString())
        formData.append(`tattooData[${index}].customDesignTattooText`, tats[index].customDesignTattooText.toString())
        tattoo.tattooRefferences.forEach((image)=>{
            formData.append(`tattooData[${index}].tattooRefferences`, image)
          })
        })
        
        const res = await axios.post("http://localhost:8099/api/saveAppointment", formData, {withCredentials:true})
        if (res.status == axios.HttpStatusCode.Created) {
          alert("Sikeresen elmentettem a Konzultáció iránti kérelmed!")
          navigate("/köszönöm", {replace:true})
        }
      } catch (error) {
        alert("Hiba történt a folyamat során! Kérlek probáld újra")
        return;
      }finally{
        
        setLoading(false)
      }
  }
  return (
    <>
      <div className="consultationfinal-background-container">
   
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleCreateConsultation()
          }} className="consultation-final-container">
          <div className="pricequote-header-container finalconsultation">
            <p>KONZULTÁCIÓ RÉSZLETEI</p>
          </div>
          <div className="guide-text-container">
            <p>Az alábbi mezők kitöltése kötelező, kérlek add meg az elérhetőségeidet!</p>
          </div>
          
          <div className="user-data-inputs-container">
            <div  data-label="E-mail" className="input-container ">
              <img  src={mail} className='mailIcon' />
              <input  type="email" 
                      placeholder='gipszjakab@gmail.com'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}/>
            </div>
             <div  data-label="Telefonszám" className="input-container ">
              <img  src={phone} className='phoneIcon' />
             <IMaskInput
                  mask="+36 00 000 0000"
                  className='phone-input'
                  lazy={false}
                  value={phoneNumber}
                  onAccept={value => setPhoneNumber(value)}
              />
            </div>
             <div  data-label="Vezetéknév" className="input-container ">
               <img src={person} className='personIcon'/>
              <input  type="text" 
                      placeholder='Gipsz'
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}/>
            </div>
             <div  data-label="Keresztnév" className="input-container ">
              <img src={person} className='personIcon'/>
              <input  type="text" 
                      placeholder='Jakab'
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
          </div>
          <section>
            <div className="price-quote-information-container">
              <div className="price-quote-container">
                <p  className="price-quote">{finalPrice}</p>
              </div>
            </div>
          </section>
          <section>
            <div className="gdpr-aszf-container">
              <button 
                type='button'
                className="gdpr-aszf-check-button" onClick={()=>setChecked(!checked)}> 
                <img style={checked ? {display:'block'} : {display:'none'} } src={check}  />
              </button>
              <p className="gdpr-aszf-text">Elfogadom az <b>Adatkezelési tájékoztatót</b>  és az <b>Általános Szerződési Feltételeket</b>.</p>
            </div>
          </section>
          <section>
            <div className="create-consultation-button-container">
              <img src={catFinal}  className="szfinx-absolute" />
              <img style={window.innerWidth <= 1000 ? {display:"block"} : {display:"none"}} src={bambinoSleepFinal} className='bambino-sleep-absolute'  />
              <button 
                type='submit' 
                className="create-consultation-button" style={loading ? {pointerEvents:'none'} : {pointerEvents:"all"}}>
                {loading ? <PulseLoader/> : "KONZULTÁCIÓ KÉRÉSE" }
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default ConsultationFinal