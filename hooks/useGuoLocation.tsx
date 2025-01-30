import { useState } from "react";
const useGuoLocation = ()=>{
    const [latitude,setLlatitude] = useState(0)
    const [longitude,setlongitude] = useState(0)
    const [isPremmisionAllow,setIsPremmisionAllow]=useState(false)
    function geolocationSupported() {
        if (navigator.geolocation) {
          console.log("Geolocation is supported by this browser :)");
          return true
        } else {
          console.log("Geolocation is NOT supported by this browser :(");
          return false
        }
      }
    function getCurrentLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(result) {
                setLlatitude(result.coords.latitude) 
                setlongitude(result.coords.longitude) 
                setIsPremmisionAllow(true)
                console.log(result);// latitude value
                 // longitude value
              },()=>setIsPremmisionAllow(false));
        }
        
      } 
      getCurrentLocation()
      return{
        latitude,
        longitude,
        geolocationSupported,
        isPremmisionAllow
      }
}
export default useGuoLocation