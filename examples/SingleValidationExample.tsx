"use client"
import useValidate from '@/hooks/useValidate';
import React, { useState } from 'react';

function SingleValidationExample() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { validate } = useValidate({
    onSuccess: () => console.log('Valid input!'),
    onError: () => console.log('Invalid input!')
  });

  const handleValidation = (value: string) => {
    const { isValid, error } = validate('userName', value);
    setError(error || null);
    return isValid;
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          handleValidation(e.target.value);
        }}
        placeholder="Enter username"
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}
export default SingleValidationExample;