// type options = {

// }

const useCookies = ()=>{
   const setCookies = (key: string, value: any, options?: {} | null, expireByDays?: number): void => {
  let opt = ``;
  let expires: string | undefined;

  if (options) {
    Object.keys(options).forEach((k) => {
      opt += `${k}=${options[k as keyof typeof options]};`;
    });
  }

  if (expireByDays) {
    const expirationDate = new Date(Date.now() + expireByDays * 86400000);
    expires = 'expires=' + expirationDate.toUTCString();
  }

  document.cookie = `${key}=${value}; ${opt} ${expires ? expires : ""}`;
};
  const getCookies = (key:string):string=>{
    let name = key;
  let decodedCookie = decodeURIComponent(document.cookie);

  let ca = decodedCookie.split(';');
  return ca[0].indexOf(name) >-1 ? ca[0].substring(name.length+1):''
  }
  const deleteCookies =(name:string)=>{
    document.cookie = name +'=';
  }
  const clearCookies =()=>{
    document.cookie = ''
  }
  return {
    clearCookies,
    deleteCookies,
    getCookies,
    setCookies
  }
}
export default useCookies