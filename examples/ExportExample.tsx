"use client";
import useExport from "@/hooks/useExport";
import { useState } from "react";

const ExportExample = () => {
    const {generateExcelFile,importExcelFile,importedExcelFile,reset} = useExport();
    const limitFields =['name','age',"category"]
    const [importedData,setImportedData] = useState({})
    const data = [
        {
            id:0,
            name:'john',
            age:30,
            gender:'male'

        },
        {
            id:0,
            name:"jane",
            age:25,
            gender:'female'
        }
    ]
    const data2 =[
        {
            id:0,
            title:"product 1",
            price:100,
            description:"this is product 1",
            category:["apple","banana"],
            photo:{
                url:"test.com",
                title:"test"
            }
        },
        {
            id:2,
            title:"product 2",
            price:200,
            description:"this is product 2",
            category:["apple","banana"],
            photo:{
                url:"test.com",
                title:"test",
            }
        }
    ]
    return (
        <div>
            <h2>useExport Hook Example</h2>
            <p>Export Data </p>
            <div className="flex gap-2 flex-wrap pb-4">
            <button className="p-2 px-4 bg-blue-700 rounded-lg "  onClick={()=>{
                generateExcelFile(data,"exportData-demo")
            }}>
                Export data to Excel
                </button>
                <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
                generateExcelFile(data2,"exportData2-demo")
            }}>
                Export data2 
                </button>
                <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
                generateExcelFile(data,"exportData3-demo",{limitFields})
            }}>export Data with limit fields </button>
             <button className="p-2 px-4 bg-blue-700 rounded-lg " onClick={()=>{
                generateExcelFile(data2,"exportData4-demo",{limitFields})
            }}>export Data2 with limit fields </button>
            </div>
            <div className="flex gap-2 relative pt-5 border-t-4 border-t-gray-800">
            <input className="absolute top-0 left-0 w-0 h-0" name="excelFile" id="excelFile" type="file" accept=".xlsx" onChange={(e)=>{
              importExcelFile(e)
             }} placeholder="Upload Excel File"/>
             <label htmlFor="excelFile" className="p-2 px-4 bg-green-700 rounded-lg ">
                Upload
             </label>
                <button className="p-2 px-4 bg-gray-700 rounded-lg " onClick={()=>{
               reset()
            }}>
                Reset
                </button>
            </div>
             <div className="text-wrap bg-neutral-800 my-2 p-2">
              {JSON.stringify(importedExcelFile)}
             </div>
                </div>
                );
                };


                export default ExportExample;