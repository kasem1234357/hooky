"use client"
import { useRef } from 'react';
import usePrint from '@/hooks/usePrint';

const PrintExample = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { convertToPDF } = usePrint();

  return (
    <div>
      <div ref={contentRef} className="print-section">
        <h1>Annual Report</h1>
        <p>Confidential financial data...</p>
      </div>

      <button
        onClick={() =>{ 
            if(!contentRef.current) return;
            if(contentRef){
            convertToPDF(contentRef, {
          documentTitle: 'Financial Report 2023',
          pageMargin: '15mm',
          copyStyles: true,
          onBeforePrint: () => console.log('Generating PDF...'),
          onAfterPrint: () => console.log('PDF saved')
        })}
    
    }}
      >
        Export as PDF
      </button>
    </div>
  );
};
export default PrintExample;