import React, { useState } from 'react';

import stlyes from './Input.module.css';

const Input = ({ label, elementType, elementConfig, value, changed }) => {
  let inputEl = null;

  switch (elementType) {
    case 'input':
      inputEl = (
        <input
          className={stlyes.InputEl}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputEl = (
        <textarea
          className={stlyes.InputEl}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputEl = (
        <select className={stlyes.InputEl} value={value} onChange={changed}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={stlyes.InputEl}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={stlyes.Input}>
      <label className={stlyes.Label}>{label}</label>
      {inputEl}
    </div>
  );
};

export default Input;
