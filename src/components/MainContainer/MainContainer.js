import React from 'react';
import './MainContainer.css';

export default function MainContainer({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}
