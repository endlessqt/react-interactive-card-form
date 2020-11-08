import React, { forwardRef } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import './Inputs.scss';

const Select = forwardRef(
  (
    {
      id,
      defaultValue,
      defaultText,
      name,
      onFocus,
      onBlur,
      children,
      errorHidden,
    },
    ref
  ) => {
    return (
      <>
        <select
          name={name}
          ref={ref}
          defaultValue={defaultValue}
          id={id}
          className="card-form__input-select"
          onFocus={onFocus}
          onBlur={onBlur}>
          <option value={defaultValue} disabled>
            {defaultText}
          </option>
          {children}
        </select>
        <ErrorMessage
          name={name}
          as={'div'}
          className="error"
          hidden={errorHidden}
        />
      </>
    );
  }
);

export default Select;
