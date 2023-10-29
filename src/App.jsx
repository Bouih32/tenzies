import "./App.css";
import Dice from "./Components/Dice";
import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allIsHeld = dice.every((die) => die.isHeld);
    const firstVal = dice[0].value;
    const allSame = dice.every((die) => die.value === firstVal);
    if (allIsHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function random() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function allNewDice() {
    const myArr = [];
    for (let i = 0; i < 10; i++) {
      myArr.push(random());
    }
    return myArr;
  }

  function rollDice() {
    setDice((prev) =>
      prev.map((die) => {
        return die.isHeld ? die : random();
      })
    );
  }

  function holdDice(id) {
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function won() {
    setDice(allNewDice());
    setTenzies(false);
  }

  let myArrayOfNums = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="text">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="nums">{myArrayOfNums}</div>
      <button onClick={tenzies ? won : rollDice}>
        {tenzies ? "Replay" : "Roll"}
      </button>
    </main>
  );
}

export default App;
