"use client"
import useStorage from '@/hooks/useStorage'
import React from 'react'

type Props = {}

function StorageExample({}: Props) {
    const {setStorageData,getStorageData,clearStorageData,removeStorageItem,isEmptyStorage,getAllStorageItem} = useStorage()
    const [StorageData,setStorageDataItem] = React.useState('[]')
  return (
    <div className='flex flex-col gap-2'>
        <p>Storage Example</p>
        <p className='p-2 bg-neutral-700'>Set Storage Data theme = dark</p>
        <button className='bg-blue-700 p-2 w-fit cursor-pointer' onClick={()=>setStorageData('theme','dark')}>Set Storage Data</button>
        <p className='p-2 bg-neutral-700'>Set Storage Data username = test</p>
        <button className='bg-blue-700 p-2  w-fit cursor-pointer' onClick={()=>setStorageData('username','test')}>Set Storage Data</button>
        
        <p className='p-2 bg-neutral-700'>Clear Storage Data</p>
        <button className='bg-blue-700 p-2  w-fit cursor-pointer' onClick={()=>{
            setStorageDataItem('[]')
            clearStorageData()}}>Clear Storage Data</button>
        <p className='p-2 bg-neutral-700'>Remove Storage Data theme</p>
        <button className='bg-blue-700 p-2  w-fit cursor-pointer' onClick={()=>removeStorageItem('theme')}>Remove Storage Data</button>
        <button className='bg-blue-700 p-2  w-fit cursor-pointer' onClick={()=>{
            setStorageDataItem(JSON.stringify(getAllStorageItem()))
        }}>Get All Storage Data</button>
        <p className='p-2 bg-neutral-700'>{StorageData}</p>
    </div>
  )
}

export default StorageExample