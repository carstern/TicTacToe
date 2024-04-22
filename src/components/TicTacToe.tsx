import React, { useState } from "react";
import { Board } from "./Board";

// Define win patterns
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

type Player = "X" | "O";
type CellValue = Player | null;
type BoardArray = CellValue[][];

const makeComputerMove = (board: BoardArray): [number, number] => {
  // Computer move logic
  const emptyCells: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCells.push([rowIndex, cellIndex]);
      }
    });
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const checkWinner = (board: BoardArray): Player | null => {
    // Check each win pattern
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      const [rowA, colA] = [Math.floor(a / 3), a % 3];
      const [rowB, colB] = [Math.floor(b / 3), b % 3];
      const [rowC, colC] = [Math.floor(c / 3), c % 3];
      if (
        board[rowA][colA] &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] === board[rowC][colC]
      ) {
        return board[rowA][colA] as Player;
      }
    }
    return null;
  };

const TicTacToe: React.FC = () => {
  const initialBoard = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);
  const [isAgainstComputer, setIsAgainstComputer] = useState<boolean>(true);

  const handleModeToggle = () => {
    setIsAgainstComputer(!isAgainstComputer);
    resetGame();
  };

  const resetGame = () => {
    setBoard(
      Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null))
    );
    setWinner(null);
    setIsNoWinner(false);
    setPlayer("X");
  };

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }
  
    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? player : cell
      )
    );
  
    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);
  
    setPlayer(player === "X" ? "O" : "X");
  
    const hasNullValue = updatedPlayerBoard.some((row) =>
      row.some((cell) => cell === null)
    );
    const isTie = !newWinner && !hasNullValue; // Check for a tie
  
    if (isTie) {
      setIsNoWinner(true); // Set isNoWinner to true if it's a tie
    }
  
    if (isAgainstComputer && !newWinner && player === "X") {
      const [computerRow, computerCol] = makeComputerMove(updatedPlayerBoard);
      const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
        newRow.map((cell, cellIndex) =>
          rowIndex === computerRow && cellIndex === computerCol ? "O" : cell
        )
      );
      setTimeout(() => {
        setBoard(updatedComputerBoard);
        setWinner(checkWinner(updatedComputerBoard));
        setPlayer("X");
      }, 300);
    }
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
  };

  return (
    <>
      <h1>Tic Tac Toe - Let's go!</h1>
      <Board board={board} handleClick={handleOnClick} backgroundColor="blue" width={300} height={300} isRounded={true}/>
      <div>
        <button onClick={handleModeToggle}>
          {isAgainstComputer
            ? "Switch to Player vs Player"
            : "Switch to Player vs Computer"}
        </button>
      </div>
      {winner && <p>{`Player ${winner} Wins!`}</p>}
      {isNoWinner && <p>No winner</p>}
      <button className="reset" type="button" onClick={() => restartGame()}>
        Reset
      </button>
    </>
  );
};

export default TicTacToe;
