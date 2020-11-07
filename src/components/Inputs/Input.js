import React, { forwardRef } from 'react';
import './Inputs.scss';

const Input = forwardRef(
  (
    {
      type,
      label,
      htmlFor,
      name,
      onBeforeInput,
      onChange,
      onFocus,
      onBlur,
      defaultValue,
    },
    ref
  ) => {
    return (
      <>
        <label className="card-form__input-label" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          type={type ? type : 'text'}
          className="card-form__input-input"
          id={htmlFor}
          name={name}
          ref={ref}
          onBeforeInput={onBeforeInput}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={defaultValue}
        />
      </>
    );
  }
);

export default Input;
