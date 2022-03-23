import React from 'react';
import './ComponentHeader.css';

export default function ComponentHeader({ title }) {
  return <h2 className="component-header">{title}</h2>;
}
