import { Cell } from "./types";

export const assignNumbers = (
  grid: Cell[][],
  mineCoordinates: { rowIndex: number; colIndex: number }[]
) => {
  for (let i = 0; i < mineCoordinates.length; i++) {
    const y = mineCoordinates[i].rowIndex;
    const x = mineCoordinates[i].colIndex;
    // Ensures the cell is not an edge or corner case
    if (y > 0 && y < grid.length - 1 && x > 0 && x < grid.length - 1) {
      centralAdjacentCells(grid, y, x);
    }
    // (0, 0)
    if (y === 0 && x === 0) {
      topLeftCornerAdjacentCells(grid, y, x);
    }
    // (0, 8)
    if (y === 0 && x === grid.length - 1) {
      topRightCornerAdjacentCells(grid, y, x);
    }
    // (8, 8)
    if (y === grid.length - 1 && x === grid.length - 1) {
      bottomRightCornerAdjacentCells(grid, y, x);
    }
    // (8, 0)
    if (y === grid.length - 1 && x === 0) {
      bottomLeftCornerAdjacentCells(grid, y, x);
    }
    // (0, _)
    if (y === 0 && x > 0 && x < grid.length - 1) {
      topEdgeAdjacentCells(grid, y, x);
    }
    // (_, 8)
    if (y > 0 && y < grid.length - 1 && x === grid.length - 1) {
      rightEdgeAdjacentCells(grid, y, x);
    }
    // (8, _)
    if (y === grid.length - 1 && x > 0 && x < grid.length - 1) {
      bottomEdgeAdjacentCells(grid, y, x);
    }
    // (_, 0)
    if (y > 0 && y < grid.length - 1 && x === 0) {
      leftEdgeAdjacentCells(grid, y, x);
    }
  }
};

export const centralAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 3x3 subgrid with the given coordinate at the central cell
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Central square: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in central grid: ${incrementationCount}`); // Debugging
};

export const topLeftCornerAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the top left cell
  for (let y = 0; y <= 1; y++) {
    for (let x = 0; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Top-left corner (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in top-left corner: ${incrementationCount}`); // Debugging
};

export const topRightCornerAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the top right cell
  for (let y = 0; y <= 1; y++) {
    for (let x = -1; x <= 0; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Top-right corner: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in top-right corner: ${incrementationCount}`); // Debugging
};

export const bottomRightCornerAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the bottom right cell
  for (let y = -1; y <= 0; y++) {
    for (let x = -1; x <= 0; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Bottom-right corner: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in bottom-right corner: ${incrementationCount}`); // Debugging
};

export const bottomLeftCornerAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the bottom left cell
  for (let y = -1; y <= 0; y++) {
    for (let x = 0; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Bottom-left corner: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in bottom-left corner: ${incrementationCount}`); // Debugging
};

export const topEdgeAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x3 subgrid with the given coordinate at the top-centre cell
  for (let y = 0; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Top-edge: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in top-edge: ${incrementationCount}`); // Debugging
};

export const rightEdgeAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 3x2 subgrid with the given coordinate at the right-centre cell
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 0; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Right-edge: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in right-edge: ${incrementationCount}`); // Debugging
};

export const bottomEdgeAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x3 subgrid with the given coordinate at the bottom-centre cell
  for (let y = -1; y <= 0; y++) {
    for (let x = -1; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Bottom-edge: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in bottom-edge: ${incrementationCount}`); // Debugging
};

export const leftEdgeAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 3x2 subgrid with the given coordinate at the left-centre cell
  for (let y = -1; y <= 1; y++) {
    for (let x = 0; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Left-edge: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations in left-edge: ${incrementationCount}`); // Debugging
};
