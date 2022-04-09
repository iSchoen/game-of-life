import { CellState } from "../components";
import { rangeMap } from "./range";

export const getAliveCellSiblings = (
  cells: CellState[][],
  numRows: number,
  numCols: number,
  rowIdx: number,
  colIdx: number
) => {
  const topLeft =
    rowIdx > 0 && colIdx > 0 ? cells[rowIdx - 1][colIdx - 1] : "dead";

  const top = rowIdx > 0 ? cells[rowIdx - 1][colIdx] : "dead";

  const topRight =
    rowIdx > 0 && colIdx < numCols - 1 ? cells[rowIdx - 1][colIdx + 1] : "dead";

  const left = colIdx > 0 ? cells[rowIdx][colIdx - 1] : "dead";

  const right = colIdx < numCols - 1 ? cells[rowIdx][colIdx + 1] : "dead";

  const bottomLeft =
    rowIdx < numRows - 1 && colIdx > 0 ? cells[rowIdx + 1][colIdx - 1] : "dead";

  const bottom = rowIdx < numRows - 1 ? cells[rowIdx + 1][colIdx] : "dead";

  const bottomRight =
    rowIdx < numRows - 1 && colIdx < numCols - 1
      ? cells[rowIdx + 1][colIdx + 1]
      : "dead";

  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  ].filter((cell) => cell === "alive").length;
};

export const getEmptyBoard = (
  numRows: number,
  numCols: number
): CellState[][] => rangeMap(numRows, () => rangeMap(numCols, () => "dead"));
