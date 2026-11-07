import React from 'react';
import profilePic from '../assets/profile.jpg';
import resumePdf from '../assets/resume.pdf';

export default function About() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <h1>About Me</h1>
      <h2>Ashley Alyssa Irving</h2>
      <img 
        src={profilePic} 
        alt="Ashley Alyssa Irving" 
        style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', margin: '1rem 0' }} 
      />
      <p style={{ lineHeight: '1.6', color: '#444' }}>
        I am a Software Engineering Technology student with hands-on experience in modern web development frameworks, relational database management, and cloud architecture. I focus on developing modular, user-centric software applications.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <a 
          href={resumePdf} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ padding: '0.75rem 1.5rem', background: '#4A90E2', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}
        >
          View Full Resume (PDF)
        </a>
      </div>
    </div>
  );
}