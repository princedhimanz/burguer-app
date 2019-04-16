import React from 'react';

import stlyes from './Input.module.css';

const Input = ({
  label,
  elementType,
  elementConfig,
  value,
  changed,
  invalid,
  shouldValidate,
  touched,
}) => {
  let inputEl = null;

  const inputClasses = [
    stlyes.InputEl,
    invalid && shouldValidate && touched ? stlyes.Invalid : null,
  ].join(' ');

  switch (elementType) {
    case 'input':
      inputEl = (
        <input
          className={inputClasses}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputEl = (
        <textarea
          className={inputClasses}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputEl = (
        <select className={inputClasses} value={value} onChange={changed}>
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
          className={`${stlyes.InputEl} ${
            invalid && shouldValidate ? stlyes.Invalid : null
          }`}
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
