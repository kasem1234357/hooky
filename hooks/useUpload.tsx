import { useState } from "react";
function getType(name:string){
   return name.slice(name.lastIndexOf('.')+1,name.length)
}
const useUpload = () => {
  const [path, setPath] = useState<string>("");
  const [fileData, setData] = useState("");
  const [ext,setExt] = useState<string>('');
  const [name,setName] = useState<string>('');
  const [type,setType] = useState<string>('');
  const [size,setSize] = useState<number>(0)
  const reset = ()=>{
    setData('')
    setExt('')
    setName('')
    setSize(0)
    setPath('')
    setType('')
  }
  //@ts-ignore
  const uploadData = (e,callBack:(result:string)=>void) => {
    e.preventDefault();
    //@ts-ignore
    const reader = (readFile) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });
    if (e.target.files) {
        setName(e.target.files[0].name)
       reader(e.target.files[0]).then((result) => {
        console.log(e.target.files[0],result);
        console.log(typeof(result));
        //@ts-ignore
        callBack && callBack(result)
        //@ts-ignore
        setData(result)
        setSize(parseFloat(((e.target.files[0].size)/(1024*1024)).toFixed(2)))
        setType(e.target.files[0].type)
        setExt(getType(e.target.files[0].name))

      });
    }
    return ({})
  };
  
  return {
    path,
    fileData,
    name,
    type,
    size,
    ext,
    uploadData,
    reset
  };
};
export default useUpload