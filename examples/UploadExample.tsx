"use client"
import React, { ChangeEvent } from "react";
import useUpload from "@/hooks/useUpload";

const UploadExample = () => {
  const {
    fileData,
    name,
    type,
    size,
    ext,
    uploadData,
    uploadDataInChunks,
    reset,
    isEmpty,
    loading,
    progress,
    chunkSize,
    setChunkSize,
  } = useUpload();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    uploadData(e, (result) => {
      console.log("File uploaded as DataURL:", result);
    });
  };

  const handleUploadInChunks = (e: ChangeEvent<HTMLInputElement>) => {
    uploadDataInChunks(e, (chunks) => {
      console.log("File uploaded in chunks:", chunks);
      // Send chunks to the server or process them further
    });
  };

  return (
    <div className="relative">
      <h1>File Upload</h1>
      <label htmlFor="upload" className="py-2 px-4 bg-green-600 text-white rounded-lg mr-5 cursor-pointer">upload</label>
      <input type="file" className="absolute top-0 left-0 h-0 w-0 opacity-0" id="upload" onChange={handleUpload} />
      <label htmlFor="uploadInChunks" className="py-2 px-4 bg-pink-600 text-white rounded-lg mr-5 cursor-pointer">uploadInChunks</label>
      <input className="absolute top-0 left-0 h-0 w-0 opacity-0" type="file" id="uploadInChunks" onChange={handleUploadInChunks} />
      <button onClick={reset} className="py-2 px-4 bg-blue-600 text-white rounded-lg mr-5 cursor-pointer">Reset</button>

      <div className="mt-5">
        <label>
          Chunk Size (bytes):
          <input
            type="number"
            value={chunkSize}
            onChange={(e) => setChunkSize(Number(e.target.value))}
          />
        </label>
      </div>

      {loading && <p>Uploading... {progress.toFixed(2)}%</p>}
      {!isEmpty && (
        <div>
          <p>File Name: {name}</p>
          <p>File Type: {type}</p>
          <p>File Size: {size} MB</p>
          <p>File Extension: {ext}</p>
          {fileData && <p>File Data: {typeof fileData === "string" ? "DataURL" : "ArrayBuffer"}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadExample;