import { useState } from "react";
import TicTacToe from "./TicTacToe";
import "../App.css";

const StartButton = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <>
    <div className="transition-container">
      <div className={`transition-item ${gameStarted ? "transition-enter" : ""}`}>
        {!gameStarted && (
          <button onClick={startGame}>Start new game!</button>
        )}
        {gameStarted && <TicTacToe />}
      </div>
    </div>
    </>
  );
};

export default StartButton;
