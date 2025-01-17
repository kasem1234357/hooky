import { useState } from "react"
interface UseSearchResult<T> {
    isEmpty: boolean | null;
    filteredItemNumber: number;
    filterBy: (data: T[], filterMethod: keyof T, filterText: string) => T[];
    filteredData: T[];
  }
const useSearch =()=>{
    const [isEmpty,setIsEmpty] = useState<boolean |null>(null)
    const [filteredItemNumber,setFilteredItemNumber] = useState<number>(0)
    const [filteredData,setFilteredData]=useState({})
    
    const filterBy =(data:Object[],filterMethod:string,filterText:string)=>{
         const newData =data.slice(0,data.length).filter((dt) => typeof dt[filterMethod].includes(filterText))
         if(data !== newData){
            setFilteredItemNumber(newData.length);
            setIsEmpty(!(newData.length > 0));
            setFilteredData(newData);
        }
        return newData
    }
    
    
    return{
        isEmpty,
        filteredItemNumber,
        filterBy,
        filteredData
    }
}
export default useSearch