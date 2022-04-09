import React from "react";
import { Cell, CellState } from "./Cell";
import "./Board.scss";

interface IProps {
  numRows: number;
  numCols: number;
  toggleCellState: (rowIdx: number, colIdx: number) => void;
  cells: CellState[][];
  startGame: (superspeed: boolean) => void;
  stopGame: () => void;
  getNextGeneration: () => void;
}

export const Board: React.FC<IProps> = ({
  numRows,
  numCols,
  toggleCellState,
  cells,
  startGame,
  stopGame,
  getNextGeneration,
}) => (
  <div className="board-container">
    <div className="board-controls-container">
      <button className="start-button" onClick={() => startGame(false)}>
        Start
      </button>
      <button className="stop-button" onClick={stopGame}>
        Stop
      </button>
      <button className="next-button" onClick={getNextGeneration}>
        Next
      </button>
      <button className="superspeed-button" onClick={() => startGame(true)}>
        ?
      </button>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplate: `repeat(${numRows}, 24px) / repeat(${numCols}, 24px`,
      }}
    >
      {cells.map((row, rowIdx) =>
        row.map((_, colIdx) => (
          <Cell
            cellState={cells[rowIdx][colIdx]}
            toggleCellState={() => toggleCellState(rowIdx, colIdx)}
          />
        ))
      )}
    </div>
  </div>
);
