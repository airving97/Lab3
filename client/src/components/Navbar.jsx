import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';

export default function Navbar() {
  const {user,logout}=useAuth();
  const navigate=useNavigate();
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1e1e2f', color: '#fff' }}>
      <div className="logo-container">
        <Link to="/">
          <svg width="40" height="40" viewBox="0 0 100 100">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#4A90E2" />
            <text x="50" y="60" fontSize="30" fill="white" textAnchor="middle" fontWeight="bold">AI</text>
          </svg>
        </Link>
      </div>
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>About Me</Link></li>
        <li><Link to="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Projects</Link></li>
        <li><Link to="/education" style={{ color: '#fff', textDecoration: 'none' }}>Education</Link></li>
        <li><Link to="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</Link></li>
        <li><Link to="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact Me</Link></li>
        {user?.role === 'admin' && <li><Link to="/manage" style={{color:"#fff"}}>Manage</Link></li>}
        {user ? <li><button onClick={()=>{logout();navigate('/')}}>Sign Out</button></li> : <><li><Link to="/signin" style={{color:"#fff"}}>Sign In</Link></li><li><Link to="/signup" style={{color:"#fff"}}>Sign Up</Link></li></>}
      </ul>
    </nav>
  );
}