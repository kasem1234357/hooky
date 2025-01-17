"use client"
import useOutsideClick from '@/hooks/useOutsideClick'
import React from 'react'

type Props = {}

function OutsideClickExample({}: Props) {
    const divRef = React.useRef<HTMLDivElement>(null)
    const [model,setModel] = React.useState(false)
    useOutsideClick(divRef,()=>{
        setModel(false)
        
    })
  return (
    <div className='p-5'>
        <p>click outside of the div to hide the message</p>
        <div className='w-full h-[300px] bg-blue-700 text-white text-2xl flex justify-center items-center rounded-lg' ref={divRef} onClick={()=>setModel(true)}>
            <p>click on the dev to see massage</p>
        </div>
        {model && <p className='p-2 text-white bg-green-600'>i hope you have a nice day :)</p>}
    </div>
  )
}

export default OutsideClickExample