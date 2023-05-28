"use client";
import { useState } from "react";

import { parseValue, maxMinComposition } from "@/utils/operations";

// empty = null
const emptyMatrix = Array(8).fill(Array(8).fill(""));

const allowedValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export default function Matrix({ className }) {
  const [matrix, setMatrix] = useState(emptyMatrix);
  const [composition, setComposition] = useState(null);

  const handleCellChange = (rowIndex, colIndex, value) => {
    // Value only allows numbers, commas and dots
    if (!/^[0-9.,]*$/.test(value)) {
      return;
    }
    const newMatrix = matrix.map((row, i) =>
      i === rowIndex ? row.map((col, j) => (j === colIndex ? value : col)) : row
    );
    setMatrix(newMatrix);
  };

  const handleReset = () => {
    setMatrix(emptyMatrix);
    setComposition(null);
  };

  const handleComposition = () => {
    const parsedMatrix = matrix.map((row) => row.map((col) => parseValue(col)));
    const isComplete = parsedMatrix.flat().every((value) => value !== null);
    if (!isComplete) {
      alert("Debe completar todos los valores de la matriz");
      return;
    }
    const invalidValues = parsedMatrix.flat().filter((value) => {
      return value !== null && !allowedValues.includes(value);
    });
    if (invalidValues.length > 0) {
      alert(
        `Los valores de la matriz deben ser números entre ${allowedValues.join(
          ", "
        )}`
      );
      return;
    }
    const composition = maxMinComposition(parsedMatrix);
    setComposition(composition);
  };

  const renderMatrix = (matrix, editable = true) => {
    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((col, colIndex) => (
          <input
            key={colIndex}
            type="text"
            disabled={!editable}
            className={`border border-gray-300 w-14 h-14 text-center focus:outline-none focus:bg-slate-200 hover:bg-slate-200 ${
              !editable && "bg-slate-200"
            }`}
            value={col}
            onChange={(e) =>
              handleCellChange(rowIndex, colIndex, e.target.value)
            }
          />
        ))}
      </div>
    ));
  };

  return (
    <div className={className}>
      <div className="flex gap-4  justify-center flex-wrap items-center">
        <div>
          <h2>Ingrese los valores de la matriz:</h2>
          {renderMatrix(matrix)}
        </div>
        {composition && (
          <div>
            <h2>La composición max-min con si misma es la siguiente:</h2>
            {renderMatrix(composition, false)}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={handleComposition}
          className="hover:underline focus:underline"
        >
          Calcular
        </button>
        <button
          onClick={handleReset}
          className="hover:underline focus:underline"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
