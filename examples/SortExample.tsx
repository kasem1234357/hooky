'use client'
import useSort from "@/hooks/useSort";
import React, { useState } from "react";

type Props = {};
const data = ["nour", "laith", "mustafa", "kasem", "ahmad"];
const objectData = [
  {
    name: "test",
    price: 90,
    desc: "test description",
  },
  {
    name: "test",
    price: 100,
    desc: "test description",
  },
  {
    name: "lolo",
    price: 90,
    desc: "test description",
  },
  {
    name: "final",
    price: 120,
    desc: "test description",
  },
];
function SortExample({}: Props) {
    const [result,setRersult] = useState<any>()
  const {
    ascendingSort,
    descendingSort,
    objectAscendingSort,
    objectDescendingSort,
  } = useSort();
  return (
    <div>
      <h2>SortExample</h2>
      <div className="original">
        <h3>simple data</h3>
      <div className="text-wrap bg-neutral-800 my-2 p-2">
         
         {JSON.stringify(data)}
        </div>
        <h3>object data</h3>
        <div className="text-wrap bg-neutral-800 my-2 p-2">
         
         {JSON.stringify(objectData)}
        </div>
      </div>
      <div className="btns flex gap-2">
        <button className="px-4 py-2 rounded-md bg-blue-600" onClick={()=>{
            setRersult(ascendingSort(data))
        }}>ascending Sort</button>
        <button className="px-4 py-2 rounded-md bg-red-600" onClick={()=>{
            setRersult(descendingSort(data))
        }}>descending Sort</button>
        <button className="px-4 py-2 rounded-md bg-blue-600" onClick={()=>{
             setRersult(objectAscendingSort(objectData,['name','price']))
        }}>object Ascending Sort</button>
        <button className="px-4 py-2 rounded-md bg-red-600" onClick={()=>{
             setRersult(objectDescendingSort(objectData,['name','price']))
        }}>object Descending Sort</button>
      </div>
      <div className="text-wrap bg-neutral-800 my-2 p-2">
         
              {JSON.stringify(result)}
             </div>
    </div>
  );
}

export default SortExample;
