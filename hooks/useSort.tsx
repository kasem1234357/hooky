type types = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
const useSort =()=>{
    
    const ascendingSort =(data:(string|number)[])=>{
        return data.slice(0,data.length).sort((a,b)=>a>b?1:-1)
    }
    const descendingSort =(data:(string|number)[])=>{
        return data.slice(0,data.length).sort((a,b)=>a<b?1:-1)
    }
    const objectAscendingSort =(data:Object[],sortMethod:string[])=>{
        const sortImplement =(a:any,b:any,sortMethod:string[],current:number,type:types)=>{
            // console.log(type);
            
            const compare= (type:any)=>{
                if (type == 'string'){
                    return a[sortMethod[current]] >= b[sortMethod[current]]?1:-1
                }
                else{
                    return a[sortMethod[current]] <= b[sortMethod[current]]?1:-1 
                }
            }
            if(current >0){
                if(a[sortMethod[current-1]] == b[sortMethod[current-1]]){
                    // return a[sortMethod[current]] >= b[sortMethod[current]]?1:-1
                     return compare(type)
                    
                }else {return 0}
                
            }
            // return a[sortMethod[current]] >= b[sortMethod[current]]?1:-1
             return compare(type)
        }
        const sortFn:any=(data:any,current:number)=>{
            if(current === sortMethod.length) return data
            const t = data[0][sortMethod[current]]
            // console.log(t);
            
            const newData = data.sort((a:any,b:any)=>sortImplement(a,b,sortMethod,current,typeof(t)))
            return sortFn(newData,current+1)
        }
        return sortFn(data.slice(0,data.length),0)
     }
    const objectDescendingSort =(data:Object[],sortMethod:string[])=>{
        const sortImplement =(a:any,b:any,sortMethod:string[],current:number,type:types)=>{
            // console.log(type);
            
            const compare= (type:any)=>{
                if (type == 'string'){
                    return a[sortMethod[current]] >= b[sortMethod[current]]?-1:1
                }
                else{
                    return a[sortMethod[current]] <= b[sortMethod[current]]?-1:1 
                }
            }
            if(current >0){
                if(a[sortMethod[current-1]] == b[sortMethod[current-1]]){
                    // return a[sortMethod[current]] >= b[sortMethod[current]]?1:-1
                     return compare(type)
                    
                }else {return 0}
                
            }
            // return a[sortMethod[current]] >= b[sortMethod[current]]?1:-1
             return compare(type)
        }
        const sortFn:any=(data:any,current:number)=>{
            if(current === sortMethod.length) return data
            const t = data[0][sortMethod[current]]
            // console.log(t);
            
            const newData = data.sort((a:any,b:any)=>sortImplement(a,b,sortMethod,current,typeof(t)))
            return sortFn(newData,current+1)
        }
        return sortFn(data.slice(0,data.length),0)
    }
    return{
        ascendingSort,
        descendingSort,
        objectAscendingSort,
        objectDescendingSort
    }
}

export default useSort