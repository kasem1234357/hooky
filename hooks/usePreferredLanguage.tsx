import { useRef } from "react"

const usePreferreLanguage = ()=>{
  let lang:React.RefObject<string | null> = useRef(null)
  if(navigator.language ){
    lang.current = navigator.language
  }
  
  
  return {lang:lang.current}
}
export default usePreferreLanguage