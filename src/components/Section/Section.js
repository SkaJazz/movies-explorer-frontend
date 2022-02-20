import React from 'react';
import './Section.css';

export default function Section({ className, refProp, children }) {
  return <section ref={refProp} className={`section ${className || ''}`}>{children}</section>;
}
