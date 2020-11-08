import React from 'react';
import Input from './Inputs/Input';
import Select from './Inputs/Select';
import { useFormContext } from 'react-hook-form';
import './CardForm.scss';
import { ErrorMessage } from '@hookform/error-message';

const CardForm = ({
  cardNumIsFocused,
  setCardNumFocused,
  cardHolderIsFocused,
  setCardHolderFocused,
  expireDateIsFocused,
  setExpireDateFocused,
  cvvIsFocused,
  setCvvFocused,
}) => {
  const { register, handleSubmit, errors, reset } = useFormContext();

  const normalizeCreditNumber = value => {
    value = value.replace(/\s+/g, '');
    const reg = /\d{4,16}/g;
    const matches = value.match(reg);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  const creditCardIsValid = value => {
    // validation logic according to https://github.com/TravelXML/credit-cards-validation
    // to check if the value is 16 digits is redundant because function before is validating length of the value
    value = value.replace(/\s+/g, '');
    const arr = [...value].map(n => Number(n));

    const checkNum =
      arr
        .filter((_num, index) => index !== arr.length - 1)
        .reverse()
        .map((num, index) => {
          if (index % 2 === 0) num = num * 2;
          if (num > 9) num = num - 9;
          return num;
        })
        .reduce((total, curr) => total + curr) + arr[arr.length - 1];
    return checkNum % 10 === 0;
  };
  const errorsGroup = Object.keys(errors).find(
    f => f === 'cvv' || f === 'expireMonth' || f === 'expireYear'
  );

  const onSubmit = data => {
    /* 
      post request logic here
    */
    //check console if form is submitted
    console.log(data);
    // reset form after data sended to the server
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-form"
        autoComplete="off">
        <div className="card-form__input">
          <Input
            defaultValue=""
            ref={register({
              required: 'This field is required',
              validate: {
                length: value =>
                  value.replace(/\s+/g, '').length === 16 ||
                  'Card number length must be 16 digits',
                validCardNum: value =>
                  creditCardIsValid(value) || 'Invalid credit card number',
              },
            })}
            label="Card Number"
            htmlFor="cardNum"
            name="cardNum"
            onChange={e => {
              e.target.value = normalizeCreditNumber(e.target.value);
            }}
            onBeforeInput={e => {
              //allow to input only digits in card number field && disallow to input more than 16 chars
              if (
                !/\d/.test(e.data) ||
                e.target.value.replace(/\s+/g, '').length >= 16
              ) {
                e.preventDefault();
              }
            }}
            onFocus={() => {
              if (!cardNumIsFocused) {
                setCardNumFocused(true);
              }
            }}
            onBlur={() => {
              setCardNumFocused(false);
            }}
          />
        </div>
        <div className="card-form__input">
          <Input
            label="Card Holder"
            htmlFor="cardHolder"
            name="cardHolder"
            defaultValue=""
            ref={register({
              required: 'This field is required',
            })}
            onFocus={() => {
              if (!cardHolderIsFocused) {
                setCardHolderFocused(true);
              }
            }}
            onBeforeInput={e => {
              if (
                e.target.value.length === 30 ||
                !/^[a-z_\s]+$/gi.test(e.data)
              ) {
                e.preventDefault();
              }
            }}
            onBlur={() => {
              setCardHolderFocused(false);
            }}
          />
        </div>
        <div className="card-form__group">
          <div className="card-form__group-col1">
            <div className="card-form__input">
              <label className="card-form__input-label" htmlFor="select-date">
                Expiration Date
              </label>
              <Select
                name="expireMonth"
                ref={register({
                  required: 'Expiration Date is required',
                })}
                defaultValue=""
                defaultText="Month"
                id="select-date"
                errorHidden
                onFocus={() => {
                  if (!expireDateIsFocused) {
                    setExpireDateFocused(true);
                  }
                }}
                onBlur={() => {
                  setExpireDateFocused(false);
                }}>
                {Array(12)
                  .fill(null)
                  .map((item, index) => (item = index + 1))
                  .map(month => {
                    return (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    );
                  })}
              </Select>
            </div>
            <div className="card-form__input">
              <Select
                name="expireYear"
                ref={register({
                  required: 'Expiration Date is required',
                })}
                defaultValue=""
                defaultText="Year"
                id="select-date"
                errorHidden
                onFocus={() => {
                  if (!expireDateIsFocused) {
                    setExpireDateFocused(true);
                  }
                }}
                onBlur={() => {
                  setExpireDateFocused(false);
                }}>
                {Array(12)
                  .fill(null)
                  .map((i, index) => {
                    const year = new Date().getFullYear();
                    return index === 0 ? year : year + index;
                  })
                  .map(year => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
              </Select>
            </div>
          </div>
          <div className="card-form__group-col2">
            <div className="card-form__input">
              <Input
                type="password"
                label="CVV"
                ref={register({
                  required: 'CVV is required',
                })}
                errorHidden
                htmlFor="cvv"
                name="cvv"
                defaultValue=""
                onBeforeInput={e => {
                  if (e.target.value.length >= 4 || !/\d/g.test(e.data)) {
                    e.preventDefault();
                  }
                }}
                onFocus={() => {
                  if (!cvvIsFocused) {
                    setCvvFocused(true);
                  }
                }}
                onBlur={() => {
                  setCvvFocused(false);
                }}
              />
            </div>
          </div>
        </div>
        {errorsGroup ? (
          <ErrorMessage
            name={errorsGroup}
            errors={errors}
            as="div"
            className="error"
          />
        ) : null}
        <button className="card-form__button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CardForm;
