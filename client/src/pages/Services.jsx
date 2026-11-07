import React from 'react';

export default function Services() {
  const services = [
    {
      title: "Web Application Development",
      desc: "Custom interactive web platforms engineered using modern React components, HTML5, and CSS architecture."
    },
    {
      title: "Database Design & SQL",
      desc: "Relational database modeling, complex SQL queries, and schema optimizations using Oracle SQL Developer."
    },
    {
      title: "UI/UX & Visual Prototyping",
      desc: "Low and high-fidelity interface wireframes and interactive prototypes built for responsive web standards."
    }
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Services Offered</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {services.map((srv, idx) => (
          <div key={idx} style={{ border: '1px solid #e0e0e0', padding: '1.5rem', borderRadius: '6px', background: '#fdfdfd' }}>
            <h3 style={{ color: '#4A90E2' }}>{srv.title}</h3>
            <p style={{ color: '#555', lineHeight: '1.5' }}>{srv.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}