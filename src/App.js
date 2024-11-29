import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const COLORS = ["red", "blue", "green", "yellow", "orange", "purple"];
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...COLORS, ...COLORS]
      .sort(() => Math.random() - 0.5)
      .map((color) => ({ color, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.color === choiceTwo.color) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.color === choiceOne.color ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Color Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}`}
            onClick={() => !disabled && !card.matched && handleChoice(card)}
          >
            <div
              className="front"
              style={{ backgroundColor: card.color }}
            ></div>
            <div className="back"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
