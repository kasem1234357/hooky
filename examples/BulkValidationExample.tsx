"use client"
import useValidate from '@/hooks/useValidate';
import React, { useState } from 'react';
interface ValidationResult {
    isValid: boolean;
    error?: string;
  }
  
function BulkValidationExample() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formResults, setResults] = useState<Record<string, ValidationResult>>({});
  const { bulkValidate } = useValidate({
    onSuccess: () => alert('All fields valid!'),
    onError: () => alert('Validation errors!')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = bulkValidate(formData);
    setResults(results);
    console.log('Validation results:', results);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
        <label htmlFor="email">Email:</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
        </div>
        <div className="flex flex-col gap-2">
        <label htmlFor="password">Password:</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
      />
        </div>
    
      <button type="submit" className='p-2 bg-green-500 text-white rounded-md my-2 '>Submit</button>
      <div className='p-2 bg-neutral-800 text-white'>
        {JSON.stringify(formResults)}
      </div>
    </form>
   
  );
}
  export default BulkValidationExample;