import { useCallback, RefObject } from 'react';

type PrintOptions = {
  documentTitle?: string;
  removeAfterPrint?: boolean;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  copyStyles?: boolean;
  targetStyles?: string[];
  pageMargin?: string;
  timeout?: number;
  fullWindow?: boolean;
};

const usePrint = () => {
  const convertToPDF = useCallback(
    async (
      contentRef: RefObject<HTMLElement | null> | null,
      options?: PrintOptions
    ): Promise<void> => {
      const {
        documentTitle = document.title,
        removeAfterPrint = true,
        fullWindow = false,
        onBeforePrint,
        onAfterPrint,
        copyStyles = true,
        targetStyles = [],
        pageMargin = '20mm',
        timeout = 500
      } = options || {};
      if (fullWindow) {
        // Create temporary print styles
        
        const style = document.createElement('style');
        style.setAttribute('media', 'print');
        style.innerHTML = `
          @page {
            margin: ${pageMargin}; /* Custom margin value */
            size: auto;
          }
          
          @media print {
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        `;
      
        // Add to document
        document.head.appendChild(style);
      
        // Set up cleanup after printing
        const cleanup = () => {
          document.head.removeChild(style);
          window.onafterprint = null;
        };
      
        // Handle print completion/cancellation
        window.onafterprint = cleanup;
      
        // Trigger print
        window.print();
        return;
      }
      if (!contentRef ||!contentRef.current) {
        console.error('No content element found for printing');
        return;
      }
      
    // clone the content element
      const content = contentRef.current.cloneNode(true) as HTMLElement;
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        console.error('Print window was blocked by browser');
        return;
      }

      try {
        onBeforePrint?.();
      
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>${documentTitle}</title>
              
              <style>
              ${copyStyles ? copyDocumentStyles(targetStyles) : ''}
                @page {
                  size: auto;
                  margin: ${pageMargin};
                }
                @media print {
                  body { 
                    -webkit-print-color-adjust: exact; 
                    print-color-adjust: exact;
                  }
                }
              </style>
            </head>
            <body>
              ${content.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();

        // Wait for content to load
        await new Promise(resolve => 
          printWindow.addEventListener('load', resolve, { once: true })
        );

        // Trigger print
        printWindow.focus();
        printWindow.print();

        // Cleanup
        if (removeAfterPrint) {
          setTimeout(() => {
            printWindow.close();
            onAfterPrint?.();
          }, timeout);
        } else {
          printWindow.onafterprint = () => {
            printWindow.close();
            onAfterPrint?.();
          };
        }
      } catch (error) {
        printWindow.close();
        console.error('Print failed:', error);
      }
    },
    []
  );

  // Helper to copy document styles
  const copyDocumentStyles = (targetStyles: string[]): string => {
    return Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          if (targetStyles.length > 0 && styleSheet.href) {
            console.log(styleSheet);
            
            const shouldInclude = targetStyles.some(style => 
              styleSheet.href?.includes(style)
            );
            if (!shouldInclude) return '';
          }

          if (styleSheet.cssRules) {
            return Array.from(styleSheet.cssRules)
              .map(rule => rule.cssText)
              .join('');
          }
        } catch (e) {
          console.warn('Failed to access stylesheet:', e);
        }
        return '';
      }).filter(Boolean).join('<style>');
        /*
      ['body { color: red; }', '', '.header {}', ''].filter(Boolean)
// Result: ['body { color: red; }', '.header {}'].join('<style>')
*/
  };

  return { convertToPDF };
};

export default usePrint;