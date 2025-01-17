import React from 'react'
import useTime from '@/hooks/useTime'
type Props = {}

function TimeExample({}: Props) {
    const {getDateinLang,getTimeInLang,getTime} = useTime()
  return (
    <div>
        <p>Time Example</p>
        <p className='p-2 bg-neutral-700'>Current Date with timeZone in 12 format: {getTimeInLang('en-US',{hour12:true,hour:"2-digit",minute:"2-digit",timeZoneName:"short",formatMatcher:"basic",})}</p>
        <p className='p-2 bg-neutral-700'>Current Date with timeZone in 24 format: {getTimeInLang('en-US',{hour12:false,hour:"2-digit",minute:"2-digit",timeZoneName:"short",formatMatcher:"basic",})}</p>
        <p className='p-2 bg-neutral-700'>Current Date with timeZone in 12 format with date: {getTimeInLang('en-US',{hour12:false,hour:"2-digit",minute:"2-digit",timeZoneName:"short",formatMatcher:"basic",day:"2-digit",month:"2-digit",year:"numeric",})}</p>
        <p className='p-2 bg-neutral-700'>get full date with names: {getDateinLang('en-US',{timeZoneName:"short",formatMatcher:"best fit",day:"numeric",month:"long",year:"numeric",})}</p>
        <p className='p-2 bg-neutral-700'>get full date in arabic: {getDateinLang('ar-SA',{timeZoneName:"short",formatMatcher:"best fit",day:"2-digit",month:"2-digit",year:"numeric",})}</p>
        <p className='p-2 bg-neutral-700'>get full date in arabic with names: {getDateinLang('ar-SA',{timeZoneName:"short",formatMatcher:"best fit",day:"numeric",month:"long",year:"numeric",})}</p>
        
    </div>
  )
}

export default TimeExample