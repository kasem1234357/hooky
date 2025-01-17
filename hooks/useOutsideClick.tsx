import { useEffect } from "react"

const useOutsideClick = (Ref,handler,eventType='mousedown')=>{
    // useEventListener(eventType, event => {
    const outsideClickHandler = (event) =>{
      const target = event.target 
      if (!target || !target.isConnected) {
               return
              
              }
              const isOutside = Array.isArray(Ref)
              ? Ref.every(r => r.current && !r.current.contains(target))
              : Ref.current && !Ref.current.contains(target)
        
            if (isOutside) {
              handler(event)
            }
    
  }
    useEffect(()=>{
      window.addEventListener(eventType,(event)=>outsideClickHandler(event))
    return window.removeEventListener(eventType,outsideClickHandler)
    },[])
    //     // Do nothing if the target is not connected element with document
    //     if (!target || !target.isConnected) {
    //       return
    //     }
  
}

export default useOutsideClick