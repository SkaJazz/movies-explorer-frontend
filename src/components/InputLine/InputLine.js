import React from 'react';
import './InputLine.css';

export default function InputLine({
  label,
  inputName,
  type,
  value,
  onChange,
  errorMessage,
  name,
  required,
  minLength,
  maxLength,
  pattern
}) {
  return (
    <p className="input__container">
      <label htmlFor={inputName} className="input__label">
        {label}
      </label>
      <input
        minLength={minLength}
        pattern={pattern}
        maxLength={maxLength}
        required={required}
        autoComplete="off"
        onChange={onChange}
        type={type}
        name={name}
        className={`input ${errorMessage ? 'input_error' : ''}`}
        value={value || ''}
      />
      {errorMessage && (
        <span className="input__error-message">{errorMessage}</span>
      )}
    </p>
  );
}
