import React, { useState } from "react";
import "./BoardConfig.scss";

interface IProps {
  numRows: number;
  numCols: number;
  setNumRows: (newNumRows: number) => void;
  setNumCols: (newNumRows: number) => void;
}

export const BoardConfig: React.FC<IProps> = ({
  numRows,
  numCols,
  setNumRows,
  setNumCols,
}) => {
  const [rowInputValue, setRowInputValue] = useState(numRows);
  const [colInputValue, setColInputValue] = useState(numCols);
  const [rowInputValid, setRowInputValid] = useState(true);
  const [colInputValid, setColInputValid] = useState(true);

  const validateInput = (value: number) => value >= 5 && value < 100;

  const handleSetNumRows = (newNumRows: number) => {
    setRowInputValue(newNumRows);

    const valid = validateInput(newNumRows);

    setRowInputValid(valid);
    valid && setNumRows(newNumRows);
  };

  const handleSetNumCols = (newNumCols: number) => {
    setColInputValue(newNumCols);

    const valid = validateInput(newNumCols);

    setColInputValid(valid);
    valid && setNumCols(newNumCols);
  };

  const configurationValid = rowInputValid && colInputValid;

  return (
    <div className="board-config-container">
      <div className="board-config-inputs-container">
        <input
          type="number"
          value={colInputValue}
          onChange={(e) => handleSetNumCols(parseInt(e.target.value))}
        />
        x
        <input
          type="number"
          value={rowInputValue}
          onChange={(e) => handleSetNumRows(parseInt(e.target.value))}
        />
      </div>

      <p
        className={`board-size-error ${
          configurationValid ? "hide-error" : "show-error"
        }`}
      >
        Number of rows/columns must be greater than 5 and less than 100.
      </p>
    </div>
  );
};
