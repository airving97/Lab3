import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {request,useAuth} from '../auth';
export default function AuthPage({signup=false}){
 const [form,setForm]=useState({name:'',email:'',password:''});const [error,setError]=useState('');const [busy,setBusy]=useState(false);const {login}=useAuth();const navigate=useNavigate();
 async function submit(e){e.preventDefault();setBusy(true);setError('');try{const data=await request(signup?'/auth/signup':'/auth/signin',{method:'POST',body:JSON.stringify(form)});login(data);navigate('/')}catch(e){setError(e.message)}finally{setBusy(false)}}
 return <section className="editor"><h1>{signup?'Sign Up':'Sign In'}</h1><form onSubmit={submit} className="stack">{signup&&<input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input required type="password" minLength={signup?8:undefined} placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button disabled={busy}>{busy?'Please wait...':signup?'Create Account':'Sign In'}</button></form><p role="alert">{error}</p><Link to={signup?'/signin':'/signup'}>{signup?'Already have an account? Sign in':'Create an account'}</Link></section>
}
