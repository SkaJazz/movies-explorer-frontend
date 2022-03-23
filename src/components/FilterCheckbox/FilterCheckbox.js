import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShortsOnly, toggleIsShortsOnly }) {
  return (
    <label htmlFor="toggler" className="switch">
      <input
        type="checkbox"
        role="switch"
        id="toggler"
        checked={!!isShortsOnly}
        onChange={toggleIsShortsOnly}
      />
      Короткометражки
    </label>
  );
}
