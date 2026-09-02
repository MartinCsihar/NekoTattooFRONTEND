import React, { useState } from 'react'
import "./FAQbox.css"
import plus from "../../../public/plus.png"
import minus from "../../../public/minus.png"
type Props = {
  question: string;
  answer: string | React.JSX.Element;
  isOpened: boolean;
  onToggle: () => void;
};

const FAQbox = ({ question, answer, isOpened, onToggle }: Props) => {
  return (
    <div
      onClick={onToggle}
      className={isOpened ? "faq-box-container opened" : "faq-box-container"}
    >
      {!isOpened ? (
        <img src={plus} className="plusIcon faq-icon" />
      ) : (
        <img src={minus} className="minusIcon faq-icon" />
      )}

      {!isOpened && (
        <div className="question-container">
          <p className="question-text">{question}</p>
        </div>
      )}

      {isOpened && <div className="answer-container">{answer}</div>}

      <span className="blur-design"></span>
    </div>
  );
};


export default FAQbox