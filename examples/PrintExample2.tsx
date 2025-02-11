"use client"
import usePrint from '@/hooks/usePrint';
import React from 'react'

type Props = {}

function PrintExample2({}: Props) {
    const { convertToPDF } = usePrint();

    return (
      <button
        onClick={() => convertToPDF(null, {
          fullWindow: true,
          pageMargin: '10mm',
          documentTitle: 'Complete Page Export'
        })}
      >
        Print Current Page
      </button>
    );
}

export default PrintExample2