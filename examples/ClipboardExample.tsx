"use client";
import useClipboard from "@/hooks/useClipBoard";

const ClipboardExample = () => {
    const {copyText,coppedText,isPremmisionAllow,readTextFn} = useClipboard();
    return (
        <div>
            <h2>useClipboard Hook Example</h2>
            <p>Copy Text to Clipboard</p>
            <button className="link" onClick={()=>{
                copyText('hello world',()=>console.log('copied'))
            }}>

                Copy hello world
                </button>
                <p>Text: {coppedText}</p>
                <p>isPremmisionAllow: {isPremmisionAllow?"true":"false"}</p>
                
                </div>
                );
                };


                export default ClipboardExample;