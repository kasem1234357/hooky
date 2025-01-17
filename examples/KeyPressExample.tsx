"use client"
import useKeyPress from '@/hooks/useKeyPress';
import React, { useEffect } from 'react'

type Props = {}

function KeyPressExample({}: Props) {
    const {addKeyPressEvent} = useKeyPress();
    useEffect(() => {
    addKeyPressEvent({
        keyCode:'R',
        shiftKey: true,
        ctrlKey: true,
        callback: () => alert('hi from useKeyPress'),
    })
}, [])
  return (
    <div>
        <h2 className='bg-blue-700 text-white p-2 rounded-lg'>press Ctrl + Shift + R to show alert</h2>
    </div>
  )
}

export default KeyPressExample