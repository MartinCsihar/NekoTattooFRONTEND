import React, { useEffect } from 'react'
import "./Faq.css"
import roseBody from "../../../public/roseBodyNew.svg"
import roseLeft from "../../../public/roseLeftNew.svg"
import roseRight from "../../../public/roseRight.svg"
import { useNavigate } from 'react-router-dom'
import FAQbox from '../SubComponent/FAQbox'
import { useState } from 'react'
const Faq = () => {
    const navigate = useNavigate()
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);

    const FAQ = {
        "Fájdalmas a tetoválás?": <p>A <b>fájdalom mértéke egyéni</b>, és nagyban <b>függ a testtájtól</b>. <b>Vékonyabb bőrű területeken</b> (bordák, boka, csukló) <b>intenzívebb</b>, míg izmosabb, <b>húsosabb részeken</b> (felkar, comb) általában <b>enyhébb</b>. A fájdalom folyamatos, de jól tolerálható.</p>,
        "Hogyan készüljek a tetoválásra?":<p><b>A bőr legyen hidratált</b>, <b>kipihent</b> és <b>tiszta</b>. <b>Kerüld az alkoholt és a vérhígító</b>  hatású gyógyszereket <b>24 órával a tetoválás előtt</b>. <b>Javasolt könnyű étkezés és megfelelő folyadékbevitel az alkalom előtt</b>.</p>,
        "Mit vigyek magammal a tetoválásra?":<p>Kényelmes, <b>könnyen hozzáférést biztosító ruházatot</b>, <b>vizet</b>, és ha hosszabb az tetoválás, <b>könnyű harapnivalót</b>. Érdemes telefontöltőt és szükség esetén fülhallgatót hozni.</p>,
        "Hogyan kell ápolni a friss tetoválást?":<p onClick={()=>navigate("/crucialtoknow")} style={{color:"#680E14", fontWeight:"bold",textDecoration:"underline"}}>Fontos tudnivalók</p>,
        "Sportolhatok tetoválás után?":<p><b>Igen</b>, de az <b>első 3–5 napban kerülni kell az intenzív izzadást</b>, <b>súrlódást</b> és a <b>bőrt irritáló mozgásformákat</b>. A fertőzésveszély miatt a <b>közösségi sporthelyiségek</b> (edzőterem, öltöző) <b>fokozott óvatosságot igényelnek</b>.</p>,
        "Meddig gyógyul a tetoválás?": <p>A <b>felső bőrréteg 7–14 nap alatt regenerálódik</b>, a <b>teljes gyógyulás 4–6 hét</b>. A színek és vonalak végleges állapota a teljes gyógyulás után látható.</p>,
        "Napozhatok vagy mehetek szoláriumba?": <p>Friss tetoválást legalább <b>4 hétig nem érhet közvetlen napfény vagy UV‑sugárzás</b>. A gyógyulás után is <b>ajánlott magas (50 SPF) fényvédő használata</b> a <b>fakulás megelőzésére</b>.</p>,
        "Mit tegyek, ha irritációt vagy gyulladást tapasztalok?": <p><b>Enyhe pirosság</b> és <b>hámlás normális</b>. <b>Ha erős duzzanat</b>, <b>váladékozás</b> <b>tartós fájdalom</b> vagy <b>kiütés jelentkezik</b>, <b>azonnal jelezd a tetoválónak</b>, és szükség esetén <b>fordulj bőrgyógyászhoz</b>.</p>,
        "Mennyibe kerül egy tetoválás?": <p>A tetoválás ára a <b>mérettől</b>, <b>stílustól</b>, <b>részletességtől</b> is függ, melyet ártáblázatom alapján határozok meg. Beépített <b>AI árajánlat rendszeremmel kaphatsz egy lehetséges, becsült árat a kívánt tetoválásodról.</b> </p>,
        "Milyen fizetési módok vannak, és hogyan lehet fizetni?": <p>Miután végeztem a tetoválással <b>készpénzel</b> vagy <b>fizetési kérelemmel</b> (díj mentes utalás) <b>lehet fizetni</b> </p>
    }
   
  return (
    <>
        <main className='main-faq-container'>
            <img className="roseDesignLeft faqrose" src={roseLeft} alt=""  />
            <img className="roseDesignRight faqrose" src={roseRight} alt=""  />
            <img src={roseBody} className='roseBody bottom' alt="" />
            <img src={roseBody} className='roseBody left' alt="" />
            <img src={roseBody} className='roseBody right' alt="" />
            <img src={roseBody} className='roseBody top' alt="" />
            <section className="faq-container">
                {
                    Object.entries(FAQ).map(([key, value], index) => (
                        <FAQbox
                            question={key}
                            answer={value}
                            key={index}
                            isOpened={openedIndex === index}
                            onToggle={() =>
                            setOpenedIndex(openedIndex === index ? null : index)
                            }
                        />
                        ))

                }
            </section>
        </main>
    </>
  )
}

export default Faq