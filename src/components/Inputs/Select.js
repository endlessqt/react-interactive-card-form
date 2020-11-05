import React, { forwardRef } from "react";
import "./Inputs.scss";

const Select = forwardRef(
  ({ id, defaultValue, defaultText, name, onFocus, onBlur, children }, ref) => {
    return (
      <>
        <select
          name={name}
          ref={ref}
          defaultValue={defaultValue}
          id={id}
          className="card-form__input-select"
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <option value={defaultValue} disabled>
            {defaultText}
          </option>
          {children}
        </select>
      </>
    );
  }
);

export default Select;
