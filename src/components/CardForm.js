import React from "react";
import { useFormContext } from "react-hook-form";
import "./CardForm.scss";

const CardForm = () => {
  const { register, handleSubmit } = useFormContext();

  const normalizeCreditNumber = (value) => {
    value = value.replace(/\s+/g, "");
    const reg = /\d{4,16}/g;
    const matches = value.match(reg);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const onSubmit = (data) => {
    // console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card-form">
        <div className="card-form__input">
          <label className="card-form__input-label" htmlFor="cardNum">
            Card Number
          </label>
          <input
            className="card-form__input-input"
            id="cardNum"
            name="cardNum"
            ref={register}
            onBeforeInput={(e) => {
              //allow to input only digits in card number field && disallow to input more than 16 chars
              if (
                !/\d/.test(e.data) ||
                e.target.value.replace(/\s+/g, "").length >= 16
              ) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              e.target.value = normalizeCreditNumber(e.target.value);
            }}
          />
        </div>
        <div className="card-form__input">
          <label className="card-form__input-label" htmlFor="cardHolder">
            Card Holder
          </label>
          <input
            id="cardHolder"
            className="card-form__input-input"
            name="cardHolder"
            ref={register}
          />
        </div>

        <div className="card-form__group">
          <div className="card-form__group-col1">
            <div className="card-form__input">
              <label className="card-form__input-label" htmlFor="select-date">
                Expiration Date
              </label>
              <select
                name="expireMonth"
                ref={register}
                defaultValue=""
                id="select-date"
                className="card-form__input-select"
              >
                <option value="" disabled>
                  Month
                </option>
                {Array(12)
                  .fill(null)
                  .map((i, index) => (i = index + 1))
                  .map((month) => {
                    return (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="card-form__input">
              <select
                name="expireYear"
                ref={register}
                defaultValue=""
                className="card-form__input-select"
              >
                <option value="" disabled>
                  Year
                </option>
                {Array(12)
                  .fill(null)
                  .map((i, index) => {
                    const year = new Date().getFullYear();
                    return index === 0 ? year : year + index;
                  })
                  .map((year) => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="card-form__group-col2">
            <div className="card-form__input">
              <label className="card-form__input-label" htmlFor="cvv">
                CVV
              </label>
              <input className="card-form__input-input" id="cvv" />
            </div>
          </div>
        </div>

        <button className="card-form__button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CardForm;
