"use client"
import useTimeout from '@/hooks/useTimeout';
import React, { useState } from 'react'

type Props = {}

function TimeoutExample({}: Props) {
    const [notification, setNotification] = useState('');
  
    const { reset, clear } = useTimeout(
      () => setNotification('Payment processed!'),
      5000,
      [],
      true,
      ()=>setNotification('') // Start timeout immediately
    );
  
    return (
      <div>
        <h2>Transaction Status</h2>
        <p>{notification || 'Waiting for confirmation...'}</p>
        <button onClick={reset}>Retry Payment</button>
        <button onClick={clear}>Cancel Notification</button>
      </div>
    );
}

export default TimeoutExample