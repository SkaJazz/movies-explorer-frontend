import React from 'react';
import './InputLine.css';

export default function InputLine({
  label, inputName, type, value, onChange, errorMessage, onFocus
}) {
  return (
    <p className="input__container">
      <label htmlFor={inputName} className="input__label">
        {label}
      </label>
      <input
        autoComplete="off"
        onChange={onChange}
        type={type}
        className={`input ${errorMessage ? 'input_error' : ''}`}
        value={value || ''}
        onFocus={onFocus}
      />
      {errorMessage && (
        <span className="input__error-message">{errorMessage}</span>
      )}
    </p>
  );
}
