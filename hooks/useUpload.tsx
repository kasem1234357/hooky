import { ChangeEvent, useState } from "react";
function getFileExtension(name: string): string {
  return name.slice(name.lastIndexOf(".") + 1);
}
const useUpload = () => {
  const [path, setPath] = useState<string>("");
  const [fileData, setFileData] = useState<ArrayBuffer | null|"">(null);
  const [ext, setExt] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [chunkSize, setChunkSize] = useState<number>(1024 * 1024); // Default chunk size: 16KB

  const reset = ()=>{
    setFileData(null);
    setExt('');
    setName('');
    setSize(0);
    setPath('');
    setType('');
    setIsEmpty(true);
    setLoading(false);
    setProgress(0);
  }
  //@ts-ignore
  const uploadData = (e,callBack:(result:string)=>void) => {
    e.preventDefault();
    //@ts-ignore
    const reader = (readFile) =>
      new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(readFile);
      });
    if (e.target.files) {
        setName(e.target.files[0].name)
       reader(e.target.files[0]).then((result) => {
        console.log(e.target.files[0],result);
        console.log(typeof(result));
        //@ts-ignore
        callBack && callBack(result)
        //@ts-ignore
        setFileData(result)
        setSize(parseFloat(((e.target.files[0].size)/(1024*1024)).toFixed(2)))
        setType(e.target.files[0].type)
        setExt(getFileExtension(e.target.files[0].name))

      });
    }
    return ({})
  };
  const uploadDataInChunks = async (
    e: ChangeEvent<HTMLInputElement>,
    callback?: (result: ArrayBuffer[]) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setName(file.name);
    setSize(file.size);
    setExt(getFileExtension(file.name));
    setType(file.type);
    setIsEmpty(false);

    const chunks: ArrayBuffer[] = [];
    let offset = 0;

    while (offset < file.size) {
      const chunk = await readChunk(file, offset, chunkSize);
      chunks.push(chunk);
      offset += chunkSize;

      // Update progress
      const percent = (offset / file.size) * 100;
      setProgress(percent);
    }

    setLoading(false);
    setProgress(100); // Set progress to 100% after all chunks are read
    callback?.(chunks);
  };

  /**
   * Reads a chunk of the file.
   * @param file - The file to read.
   * @param offset - The starting byte position.
   * @param size - The size of the chunk.
   * @returns A promise that resolves to the chunk as ArrayBuffer.
   */
  const readChunk = (file: File, offset: number, size: number): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const blob = file.slice(offset, offset + size);

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read chunk as ArrayBuffer."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file chunk."));
      };

      reader.readAsArrayBuffer(blob);
    });
  };

  return {
    path,
    fileData,
    name,
    type,
    size,
    ext,
    uploadData,
    reset,
    isEmpty,
    loading,
    progress,
    uploadDataInChunks,
    chunkSize,
    setChunkSize
  };
};
export default useUpload