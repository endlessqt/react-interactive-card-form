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
    defaultValue: "",
  });
  const cardHolder = useWatch({
    control,
    name: "cardHolder",
  });
  const [cardType, setCardType] = useState("visa");

  const imgRef = useRef(null);

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
              nodeRef={imgRef}
              timeout={300}
              addEndListener={(node, done) => {
                node = imgRef.current;
                node.addEventListener("transitionend", done, false);
              }}
              classNames="flip"
            >
              <div className="card-inner__card-label">
                <img
                  src={cardType === "visa" ? visa : masterCard}
                  className="card-inner__card-label-image"
                  alt="card-label"
                  ref={imgRef}
                />
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className="card-inner__center">
          <label htmlFor="cardNum" className="card-inner__center-label">
            {Array(16)
              .fill(null)
              .map((i, index) => {
                const joinedCardNum = cardNum.replace(/\s+/g, "");
                if (index === 3 || index === 7 || index === 11) {
                  return (
                    <React.Fragment key={index}>
                      <SwitchTransition>
                        <CSSTransition
                          key={joinedCardNum[index] ? true : false}
                          timeout={150}
                          addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                          }}
                          classNames="flip"
                        >
                          <span className="card-inner__center-item">{`${
                            joinedCardNum[index] || "#"
                          }`}</span>
                        </CSSTransition>
                      </SwitchTransition>
                      <span className="card-inner__center-item">&nbsp;</span>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <SwitchTransition key={index}>
                      <CSSTransition
                        key={joinedCardNum[index] ? true : false}
                        timeout={150}
                        addEndListener={(node, done) => {
                          node.addEventListener("transitionend", done, false);
                        }}
                        classNames="flip"
                      >
                        <span className="card-inner__center-item">
                          {joinedCardNum[index] || "#"}
                        </span>
                      </CSSTransition>
                    </SwitchTransition>
                  );
                }
              })}
          </label>
        </div>
        <div>bottom</div>
      </div>
    </div>
  );
};

export default Card;
