export function matricesAreEqual(matrixA, matrixB) {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    return false;
  }
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixA[0].length; j++) {
      if (matrixA[i][j] !== matrixB[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export function maxMinComposition(matrix) {
  let composition = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let minimumValues = [];
      for (let k = 0; k < matrix[i].length; k++) {
        minimumValues.push(Math.min(matrix[i][k], matrix[k][j]));
      }
      composition.push(Math.max(...minimumValues));
    }
  }
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  return composition.reduce((acc, _, i) => {
    if (i % numCols === 0) {
      acc.push([composition[i]]);
    } else {
      acc[acc.length - 1].push(composition[i]);
    }
    return acc;
  }, []);
}

// Receives a string and returns a number or null
// Example: "1,2" -> 1.2
// Example: "1" -> 1
// Example: "1." -> 1
export function parseValue(value) {
  if (!value) {
    return null;
  }
  const parsedValue = parseFloat(value.replace(",", "."));
  return isNaN(parsedValue) ? null : parsedValue;
}
