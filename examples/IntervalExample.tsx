"use client"
import useDebounce from '@/hooks/useDebounce';
import React, { useState } from 'react'

type Props = {}

function IntervalExample({}: Props) {
    const [count, setCount] = useState(0);
    const {reset, clear} = useDebounce(() => {
        setCount(count + 1);
    }, 1000, [],false);
    return (
        <div>
            <h2 className='bg-blue-700 text-white p-2 rounded-lg'>
                Press the button to see the count change every second
            </h2>
            <button onClick={reset} className='bg-green-500 text-white p-2 rounded-lg mr-5'>
                step
            </button>
            <button onClick={clear} className='bg-red-500 text-white p-2 rounded-lg'>
                stop
            </button>
            <p className='p-2 rounded-lg bg-gray-100 text-black'>Count: {count}</p>
        </div>
    )
}

export default IntervalExample