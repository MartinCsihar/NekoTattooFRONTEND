import React, { useEffect, useState } from 'react'
import "./ConsultationFinal.css"
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const ConsultationFinal = () => {
    const [tattoos, setTattoos] = useState([])
    
    const navigate = useNavigate()
    const location = useLocation();
   useEffect(()=>{
    const tats = location.state?.tattoos
    // if (!tats) {
    //     alert("Ácsi, még nincs is kiválasztva tetoválás!")
    //     navigate("/createConsultation", { replace: true });
    // }else{
    // }
        setTattoos(tats)
   },[])
    
  return (
    <div>ConsultationFinal</div>
  )
}

export default ConsultationFinal