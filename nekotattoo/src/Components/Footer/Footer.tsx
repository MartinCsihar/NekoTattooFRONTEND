import React from 'react'

const Footer = ({height}:{height:number}) => {
  return (
    <div className="footer-container"
    style={{width:"100%",
            height: `${height}px`,
            position: "absolute",
            bottom:"0",
            background:"#680E14"

    }}>
    </div>
  )
}

export default Footer