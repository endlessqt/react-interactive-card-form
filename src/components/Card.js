import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
const Card = () => {
  const { control } = useFormContext();
  const cardNum = useWatch({
    control,
    name: "cardNum",
    defaultValue: "########",
  });
  const cardHolder = useWatch({
    control,
    name: "cardHolder",
    defaultValue: "John Doe",
  });
  return (
    <div>
      Here Card Image With Values
      <div>Card Number is {cardNum}</div>
      <div>Card Holder is {cardHolder}</div>
    </div>
  );
};

export default Card;
