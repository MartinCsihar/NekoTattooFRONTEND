import React from 'react'
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "500px",
  border: "1px solid black"
};


const center = {
  lat: 47.605597460210674, 
  lng: 17.21019990632761
}
export const Map =({classN}:{classN:string}) =>  {
    const MAPS_API = import.meta.env.VITE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={MAPS_API}>
        <GoogleMap mapContainerClassName={classN}  center={center} zoom={15}>
            <Marker position={center}/>
        </GoogleMap>
    </LoadScript>
  )
}

