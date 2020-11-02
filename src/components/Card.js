import React, { useState, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import "./Card.scss";
import chip from "../assets/images/card-chip.png";
import masterCard from "../assets/images/master-card.png";
import visa from "../assets/images/visa.png";
import { SwitchTransition, CSSTransition } from "react-transition-group";
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
  const [cardType, setCardType] = useState("visa");
  let ref = useRef(null);
  useEffect(() => {
    //switch card type state based on user input to animate card-logo
    if (
      cardNum.startsWith("5") &&
      cardNum.length < 2 &&
      cardType !== "master"
    ) {
      setCardType("master");
    }
    if (cardNum.length < 2 && cardType !== "visa") {
      setCardType("visa");
    }
  }, [cardNum]);

  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-inner__top">
          <div className="card-inner__chip">
            <img className="card-inner__chip-image" src={chip} alt="chip"></img>
          </div>
          <SwitchTransition>
            <CSSTransition
              key={cardType}
              nodeRef={ref}
              timeout={300}
              addEndListener={(node, done) => {
                node = ref.current;
                node.addEventListener("transitionend", done, false);
              }}
              classNames="flip"
            >
              <div className="card-inner__card-label">
                <img
                  src={cardType === "visa" ? visa : masterCard}
                  className="card-inner__card-label-image"
                  alt="card-label"
                  ref={ref}
                />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div>center</div>
        <div>bottom</div>
      </div>
    </div>
  );
};
//<div>Card Number is {cardNum}</div>

/* <div>Card Holder is {cardHolder}</div> */

export default Card;
