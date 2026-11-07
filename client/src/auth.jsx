import React,{createContext,useContext,useEffect,useState} from 'react';
const Auth=createContext(null);
export const useAuth=()=>useContext(Auth);
export async function request(path,options={}){
 const token=localStorage.getItem('portfolio_token');
 const response=await fetch('/api'+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...options.headers}});
 const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||'Request failed');return data;
}
export function AuthProvider({children}){
 const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!localStorage.getItem('portfolio_token')){setLoading(false);return}request('/auth/me').then(setUser).catch(()=>localStorage.removeItem('portfolio_token')).finally(()=>setLoading(false))},[]);
 function login(data){localStorage.setItem('portfolio_token',data.token);setUser(data.user)}
 function logout(){localStorage.removeItem('portfolio_token');setUser(null);request('/auth/signout').catch(()=>{})}
 return <Auth.Provider value={{user,loading,login,logout}}>{children}</Auth.Provider>;
}
