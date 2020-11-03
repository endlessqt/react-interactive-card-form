import React, { useState, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import "./Card.scss";
import chip from "../assets/images/card-chip.png";
import masterCard from "../assets/images/master-card.png";
import visa from "../assets/images/visa.png";
import { SwitchTransition, CSSTransition } from "react-transition-group";
const Card = ({
  cardNumIsFocused,
  cardHolderIsFocused,
  expireDateIsFocused,
}) => {
  const [cardType, setCardType] = useState("visa");
  const imgRef = useRef(null);
  const { control } = useFormContext();
  const cardNum = useWatch({
    control,
    name: "cardNum",
    defaultValue: "",
  });
  const cardHolder = useWatch({
    control,
    name: "cardHolder",
    defaultValue: "",
  });
  const expireMonth = useWatch({
    control,
    name: "expireMonth",
    defaultValue: "",
  });
  const expireYear = useWatch({
    control,
    name: "expireYear",
    defaultValue: "",
  });

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
          <label
            htmlFor="cardNum"
            className={`card-inner__label ${
              cardNumIsFocused ? "card-inner__label-isFocused" : ""
            }`}
          >
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
                          <span className="card-inner__item">{`${
                            joinedCardNum[index] || "#"
                          }`}</span>
                        </CSSTransition>
                      </SwitchTransition>
                      <span className="card-inner__item">&nbsp;</span>
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
                        <span className="card-inner__item">
                          {joinedCardNum[index] || "#"}
                        </span>
                      </CSSTransition>
                    </SwitchTransition>
                  );
                }
              })}
          </label>
        </div>

        <div className="card-inner__bottom">
          <div className="card-inner__bottom-left">
            <label
              className={`card-inner__label ${
                cardHolderIsFocused ? "card-inner__label-isFocused" : ""
              }`}
              htmlFor="cardHolder"
            >
              <div className="card-inner__label-items-wrapper">
                <div className="card-inner__label-item-1">Card Holder</div>
                <SwitchTransition>
                  <CSSTransition
                    key={cardHolder.length === 0}
                    timeout={300}
                    addEndListener={(node, done) => {
                      node.addEventListener("transitionend", done, false);
                    }}
                    classNames="flip"
                  >
                    <div className="card-inner__label-item-2">
                      {cardHolder ? cardHolder : "Full Name"}
                    </div>
                  </CSSTransition>
                </SwitchTransition>
              </div>
            </label>
          </div>
          <div className="card-inner__bottom-right">
            <label
              className={`card-inner__label ${
                expireDateIsFocused ? "card-inner__label-isFocused" : ""
              }`}
              htmlFor="select-date"
            >
              <div className="card-inner__label-items-wrapper">
                <div className="card-inner__label-item-1">Expire Date</div>
                <div className="card-inner__label-item-2">
                  <SwitchTransition>
                    <CSSTransition
                      key={expireMonth}
                      timeout={300}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="flip"
                    >
                      <div>
                        {expireMonth
                          ? expireMonth.length === 2
                            ? expireMonth
                            : `0${expireMonth}`
                          : "mm"}
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                  <SwitchTransition>
                    <CSSTransition
                      key={expireYear}
                      timeout={300}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="flip"
                    >
                      <div>/{expireYear ? expireYear.substring(2) : "yy"}</div>
                    </CSSTransition>
                  </SwitchTransition>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
