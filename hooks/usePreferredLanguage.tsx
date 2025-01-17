import { useRef } from "react"

const usePreferreLanguage = ()=>{
  let lang:React.MutableRefObject<string | undefined> = useRef()
  if(navigator.language ){
    lang.current = navigator.language
  }
  
  
  return {lang:lang.current}
}
export default usePreferreLanguage