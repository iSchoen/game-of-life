import React, { useEffect, useReducer } from "react";
import "./App.scss";
import { Board, BoardConfig, CellState } from "./components";
import { deepCloneArray, getAliveCellSiblings, getEmptyBoard } from "./lib";

const initialSize = 10;

interface BoardState {
  numRows: number;
  numCols: number;
  cells: CellState[][];
  gameStarted: boolean;
  superspeed: boolean;
}

type BoardAction =
  | { type: "toggleCell"; payload: { rowIdx: number; colIdx: number } }
  | { type: "setRows"; payload: { newNumRows: number } }
  | { type: "setCols"; payload: { newNumCols: number } }
  | { type: "nextGeneration" }
  | { type: "startGame"; payload: { superspeed: boolean } }
  | { type: "stopGame" };

const boardReducer = (state: BoardState, action: BoardAction) => {
  const { numRows, numCols, cells } = state;

  switch (action.type) {
    case "toggleCell":
      const { rowIdx, colIdx } = action.payload;

      const newCells = deepCloneArray(cells);

      newCells[rowIdx][colIdx] =
        newCells[rowIdx][colIdx] === "alive" ? "dead" : "alive";

      return { ...state, cells: newCells };

    case "setRows":
      const { newNumRows } = action.payload;

      return {
        ...state,
        numRows: newNumRows,
        cells: getEmptyBoard(newNumRows, numCols),
      };

    case "setCols":
      const { newNumCols } = action.payload;

      return {
        ...state,
        numCols: newNumCols,
        cells: getEmptyBoard(numRows, newNumCols),
      };

    case "nextGeneration":
      const nextGeneration = deepCloneArray(cells).map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          const aliveSiblings = getAliveCellSiblings(
            cells,
            numRows,
            numCols,
            rowIdx,
            colIdx
          );

          if (cell === "alive") {
            return aliveSiblings === 2 || aliveSiblings === 3
              ? "alive"
              : "dead";
          } else {
            return aliveSiblings === 3 ? "alive" : "dead";
          }
        })
      );

      return { ...state, cells: nextGeneration };

    case "startGame":
      const { superspeed } = action.payload;

      return { ...state, gameStarted: true, superspeed };

    case "stopGame":
      return { ...state, gameStarted: false };

    default:
      return state;
  }
};

const App: React.FC = () => {
  const [boardState, boardDispatch] = useReducer(boardReducer, {
    numRows: initialSize,
    numCols: initialSize,
    cells: getEmptyBoard(initialSize, initialSize),
    gameStarted: false,
    superspeed: false,
  });

  const { numRows, numCols, cells, gameStarted, superspeed } = boardState;

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(
        () => {
          boardDispatch({ type: "nextGeneration" });
        },
        superspeed ? 100 : 1000
      );

      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const setNumRows = (newNumRows: number) => {
    boardDispatch({
      type: "setRows",
      payload: { newNumRows },
    });
  };

  const setNumCols = (newNumCols: number) =>
    boardDispatch({
      type: "setCols",
      payload: { newNumCols },
    });

  const toggleCellState = (rowIdx: number, colIdx: number) =>
    boardDispatch({
      type: "toggleCell",
      payload: { rowIdx, colIdx },
    });

  const getNextGeneration = () =>
    boardDispatch({
      type: "nextGeneration",
    });

  const startGame = (superspeed: boolean) =>
    boardDispatch({
      type: "startGame",
      payload: { superspeed },
    });

  const stopGame = () =>
    boardDispatch({
      type: "stopGame",
    });

  return (
    <div className="app-container">
      <BoardConfig
        numRows={numRows}
        numCols={numCols}
        setNumRows={setNumRows}
        setNumCols={setNumCols}
      />

      <Board
        numRows={numRows}
        numCols={numCols}
        toggleCellState={toggleCellState}
        cells={cells}
        startGame={startGame}
        stopGame={stopGame}
        getNextGeneration={getNextGeneration}
      />
    </div>
  );
};

export default App;
