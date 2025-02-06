 export const setToken = (token)=>{
    localStorage.setItem('ecommerse_token', token)
 }

 export const getToken = ()=>{
   return localStorage.getItem('ecommerse_token')
 }