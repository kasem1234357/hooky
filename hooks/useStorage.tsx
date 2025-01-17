const useStorage = () => {
  const getStorageData = (
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    return type.getItem(key);
  };
  const setStorageData = (
    key: string,
    value: any,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    type.setItem(key, value);
  };
  const clearStorageData = (
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    type.clear();
  };
  const removeStorageItem = (
    key: string,
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    type.removeItem(key);
  };
  const isEmptyStorage = (
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    return type.length < 0;
  };
  const getAllStorageItem = (
    storageType: "localStorage" | "sessionStorage" = "localStorage"
  ) => {
    let values = [];
    let type = storageType === "localStorage" ? localStorage : sessionStorage;
    let keys = Object.keys(type);
    for (let key of keys) {
      values.push({key:type.getItem(key)});
    }
    return values;
  };

  return {
    getAllStorageItem,
    getStorageData,
    isEmptyStorage,
    setStorageData,
    clearStorageData,
    removeStorageItem
  };
};
export default useStorage;
