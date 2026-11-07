import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1>Welcome to My Personal Portfolio</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto' }}>
        <strong>Mission Statement:</strong> Dedicated to building accessible, high-performance web solutions and full-stack software applications through clean code and modern design practices.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/about" style={{ padding: '0.75rem 1.5rem', background: '#4A90E2', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
          About Me
        </Link>
        <Link to="/projects" style={{ padding: '0.75rem 1.5rem', background: '#333', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
          View Projects
        </Link>
      </div>
    </div>
  );
}