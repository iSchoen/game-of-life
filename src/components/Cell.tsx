import React from "react";
import "./Cell.scss";

export type CellState = "alive" | "dead";

interface IProps {
  cellState: CellState;
  toggleCellState: () => void;
}

export const Cell: React.FC<IProps> = ({ cellState, toggleCellState }) => {
  const classNames = ["cell"];

  cellState === "alive" ? classNames.push("alive") : classNames.push("dead");

  return <div className={classNames.join(" ")} onClick={toggleCellState} />;
};
