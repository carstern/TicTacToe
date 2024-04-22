import React from "react";

type CellProps = {
  value: string | null;
  onClick: () => void;
  height: number;
  width: number;
};

const Cell: React.FC<CellProps> = ({ value, onClick, height, width }) => {
  return (
    <button className="cell" onClick={onClick} style={{
        height: height, width: width
    }}>
      {value || ''}
    </button>
  );
};

export default Cell;
