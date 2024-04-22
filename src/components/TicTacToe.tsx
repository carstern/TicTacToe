import {useState} from "react";
import {Board} from "./Board";

type BoardArray = Array<Array<string | null>>;

const makeComputerMove = (board: BoardArray): [number, number] => {
  //hitta alla tomma celler
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

const checkWinner = (board: BoardArray) => {
  const lines = [
    // Möjliga wins
    //rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    //columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    //diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<BoardArray>(
    Array.from({length: 3}, () => Array.from({length: 3}, () => null))
  );
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);

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
    setPlayer("X");

    // No winner - om några celler har null-värde
    const hasNullValue = updatedPlayerBoard.some((row) => row.some((cell => cell === null)))
    if(!winner && !hasNullValue) {
        setIsNoWinner(true)
        return; 
    }

    // Datorns (O) val
    if (!newWinner) {
      const [computerRow, computerCol] = makeComputerMove(updatedPlayerBoard);
      const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
        newRow.map((cell, cellIndex) =>
          rowIndex === computerRow && cellIndex === computerCol ? "O" : cell
        )
      );
// delay för mer "mänsklig" betänketid från datorn
      setTimeout(() => {
        setBoard(updatedComputerBoard);
        setWinner(checkWinner(updatedComputerBoard));
      }, 300) 

    }
  };
  return (
    <>
      <h1>Tic Tac Toe - Lets go!</h1>
      <Board board={board} handleClick={handleOnClick} />
      {/* Paragraferna innuti för att slippa tomma paragrafer innan de behövs */}
      {winner &&<p>{ `${winner === "X" ? "You Win!" : "Computer Wins"}`}</p>}
      {isNoWinner && <p>No winner</p>}
      
    </>
  );
};

export default TicTacToe;
