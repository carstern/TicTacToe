import React from "react";
import Cell from "./Cell"; // Import the Cell component

type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
  backgroundColor: string;
  width: number;
  height: number;
  isRounded: boolean;
};

export const Board: React.FC<BoardProps> = ({ board, handleClick, backgroundColor, width, height, isRounded }) => {
  return (
    <div className="board" style={{backgroundColor: backgroundColor, width: `${width}px`,height: `${height}px`, borderRadius: isRounded ? "20px" : 0 }}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, cellIndex) => (
            <Cell key={cellIndex} value={cell} onClick={() => handleClick(rowIndex, cellIndex)} width={70} height={70}/> // Skapade en komponent för Cell istället för button element, för att typeProppa
          ))}
        </div>
      ))}
    </div>
  );
};
