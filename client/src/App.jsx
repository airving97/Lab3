import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {AuthProvider} from './auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';import About from './pages/About';import Projects from './pages/Projects';import Education from './pages/Education';import Services from './pages/Services';import Contact from './pages/Contact';import AuthPage from './pages/AuthPage';import Manage from './pages/Manage';
export default function App(){return <AuthProvider><BrowserRouter><Navbar/><main style={{padding:'2rem'}}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/education" element={<Education/>}/><Route path="/services" element={<Services/>}/><Route path="/contact" element={<Contact/>}/><Route path="/signin" element={<AuthPage/>}/><Route path="/signup" element={<AuthPage signup/>}/><Route path="/manage" element={<Manage/>}/></Routes></main></BrowserRouter></AuthProvider>}
