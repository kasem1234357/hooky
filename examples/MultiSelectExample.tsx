"use client"
import React, { useState } from 'react'
import useMultiSelect from '@/hooks/useMultiSelect'


type Props = {}

function MultiSelectExample({}: Props) {
    const {selectors,addItem,removeItem,searchForItem,setSelectors,addArrayItems} = useMultiSelect();
    const [isFound,setIsFound] = useState(false)
    const [searchForItemState,setSearchForItemState] = useState(false)
  return (
    <div>
        <h2>MultiSelect Example</h2>
        <div className="flex gap-2 flex-wrap pb-4">
        <button className="p-2 px-4 bg-blue-700 rounded-lg "  onClick={()=>{
            addItem({id:0,name:'john',age:30,gender:'male'})
        }}>
            Add item
            </button>
            <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
            addArrayItems([{id:0,name:'john',age:35,gender:'male'},{id:2,name:"jane",age:25,gender:'female'}])
        }}>
            Add array items
            </button>
            <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
            removeItem({id:0,name:'john',age:30,gender:'male'})
        }}>
            Remove item
            </button>
            <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
            setSelectors([{id:3,name:'john',age:35,gender:'male'},{id:4,name:"jane",age:45,gender:'female'}])
        }}>
            Set selectors
            </button>
            <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
            setIsFound(searchForItem({id:0,name:'john',age:30,gender:'male'}) >= 0 )
            setSearchForItemState(true)
        }}>
            Search for item
            </button>
            <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
            console.log(selectors)
        }}>
            Get selectors
            </button>
        </div>
       { searchForItemState && <div className="text-wrap bg-neutral-800 my-2 p-2">
        {JSON.stringify({id:0,name:'john',age:30,gender:'male'})}
            {(isFound? <div>john object  Founded</div> : <div>john object Not Founded</div>)}
            </div>}
        <div className="text-wrap bg-neutral-800 my-2 p-2">
            {JSON.stringify(selectors)}
            </div>
    </div>
  )
}

export default MultiSelectExample