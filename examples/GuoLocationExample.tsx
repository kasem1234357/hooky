"use client"
import useGuoLocation from '@/hooks/useGuoLocation';
import React from 'react';

function GuoLocationExample() {
  const { latitude, longitude, geolocationSupported, isPremmisionAllow } = useGuoLocation();

  return (
    <div className='flex flex-col gap-2'>
      <p>Geolocation Example</p>
      {geolocationSupported() ? (
        <>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Permission Allowed: {isPremmisionAllow ? 'Yes' : 'No'}</p>
        </>
      ) : (
        <p>Geolocation is not supported by your browser.</p>
      )}
    </div>
  );
}

export default GuoLocationExample;