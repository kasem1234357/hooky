import { useState } from "react"

const useValidate = ()=>{
    const [regex,setRegex] = useState<Object>({
        userName:"^[A-Za-z0-9]{3,16}$",
        email:"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
        password:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    })
    const [validate,setValidate] =useState<boolean | null>(null)
    const [errorMassege,setErrorMassege] =useState<Object>({
        userName:"Username should be 3-16 characters and shouldn't include any special character!",
        email:"It should be a valid email address!",
        password:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    })
    const isValidate =(data:string,type:string):boolean =>{
        //@ts-ignore
        const result = new RegExp(regex[type as keyof typeof regex]).test(data)
        setValidate(result)
        return result
    }
    const updateErrorMassege =(msg:Object)=>{
       Object.keys(msg).length?setErrorMassege(prev =>({...prev,...msg})):console.error("you cant send empty object") 
        
    }
    const onSuccess = (callback:Function)=>{validate !== null && validate && callback()}
    const onError = (callback:Function)=>{validate !== null && !validate && callback()}
    const getValidateRegex = (type:string)=>{
        return (regex[type as keyof typeof regex] ?? '')
    }
    const setValidateRegex = (data:{})=>{
        Object.keys(data).length?setRegex(prev => ({...prev,...data})):console.error("you cant send empty object") 
    }
    return{
        isValidate,
        errorMassege,
        updateErrorMassege,
        onError,
        onSuccess,
        getValidateRegex,
        setValidateRegex,
        regex
    }
}
export default useValidate