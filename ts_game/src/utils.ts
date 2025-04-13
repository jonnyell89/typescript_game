import { Cell } from "./types";

export const generateCell = (
  gridElement: HTMLDivElement,
  y: number,
  x: number
): Cell => {
  // Creates new button element
  const button = document.createElement("button");
  // Assigns class "grid__btn" to new button element
  button.classList.add("grid__btn");
  // Appends new button element to grid div element
  gridElement?.appendChild(button);
  // Creates new Cell object
  return {
    cellElement: button,
    rowIndex: y,
    colIndex: x,
    isHidden: true,
    hasFlag: false,
    hasMine: false,
    adjacentMines: 0,
  };
};

export const generateGrid = (
  gridElement: HTMLDivElement,
  gridSize: number
): Cell[][] => {
  // y-axis array
  const minesweeperGrid: Cell[][] = [];
  for (let y = 0; y < gridSize; y++) {
    // x-axis array
    const row: Cell[] = [];
    for (let x = 0; x < gridSize; x++) {
      // Calls helper function
      const cell: Cell = generateCell(gridElement, y, x);
      // Pushes new Cell object to x-axis array
      row.push(cell);
    }
    // Pushes x-axis array to y-axis array
    minesweeperGrid.push(row);
  }
  // Returns two-dimensional array of Cell objects
  return minesweeperGrid;
};

export const assignMines = (grid: Cell[][], numberOfMines: number) => {
  const mineCoordinates = [];
  let assignedMines = 0;

  while (assignedMines < numberOfMines) {
    const yRandom = Math.floor(Math.random() * grid.length);
    const xRandom = Math.floor(Math.random() * grid.length);

    if (grid[yRandom][xRandom].hasMine) continue;
    else {
      grid[yRandom][xRandom].hasMine = true;
      // Defines mine coordinates as inline object literals and pushes them to the mineCoordinates array
      mineCoordinates.push({ rowIndex: yRandom, colIndex: xRandom });
      assignedMines++;
    }
  }
  // Returns an array of successful placement coordinates
  return mineCoordinates;
};

// export const centralAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 3x3 subgrid with the given coordinate at the central cell
//   for (let y = -1; y <= 1; y++) {
//     for (let x = -1; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Central square: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in central grid: ${incrementationCount}`); // Debugging
// };

// export const topLeftCornerAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x2 subgrid with the given coordinate at the top left cell
//   for (let y = 0; y <= 1; y++) {
//     for (let x = 0; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Top-left corner (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in top-left corner: ${incrementationCount}`); // Debugging
// };

// export const topRightCornerAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x2 subgrid with the given coordinate at the top right cell
//   for (let y = 0; y <= 1; y++) {
//     for (let x = -1; x <= 0; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Top-right corner: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in top-right corner: ${incrementationCount}`); // Debugging
// };

// export const bottomRightCornerAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x2 subgrid with the given coordinate at the bottom right cell
//   for (let y = -1; y <= 0; y++) {
//     for (let x = -1; x <= 0; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Bottom-right corner: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in bottom-right corner: ${incrementationCount}`); // Debugging
// };

// export const bottomLeftCornerAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x2 subgrid with the given coordinate at the bottom left cell
//   for (let y = -1; y <= 0; y++) {
//     for (let x = 0; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Bottom-left corner: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in bottom-left corner: ${incrementationCount}`); // Debugging
// };

// export const topEdgeAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x3 subgrid with the given coordinate at the top-centre cell
//   for (let y = 0; y <= 1; y++) {
//     for (let x = -1; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Top-edge: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in top-edge: ${incrementationCount}`); // Debugging
// };

// export const rightEdgeAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 3x2 subgrid with the given coordinate at the right-centre cell
//   for (let y = -1; y <= 1; y++) {
//     for (let x = -1; x <= 0; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Right-edge: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in right-edge: ${incrementationCount}`); // Debugging
// };

// export const bottomEdgeAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 2x3 subgrid with the given coordinate at the bottom-centre cell
//   for (let y = -1; y <= 0; y++) {
//     for (let x = -1; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Bottom-edge: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in bottom-edge: ${incrementationCount}`); // Debugging
// };

// export const leftEdgeAdjacentCells = (
//   grid: Cell[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   let incrementationCount = 0; // Debugging
//   // Iterates over a 3x2 subgrid with the given coordinate at the left-centre cell
//   for (let y = -1; y <= 1; y++) {
//     for (let x = 0; x <= 1; x++) {
//       const ySubgrid = rowIndex + y;
//       const xSubgrid = colIndex + x;
//       if (grid[ySubgrid][xSubgrid].hasMine) continue;
//       else {
//         grid[ySubgrid][xSubgrid].adjacentMines++;
//         incrementationCount++; // Debugging
//         console.log(`Left-edge: (${ySubgrid}, ${xSubgrid})`);
//       }
//     }
//   }
//   console.log(`Incrementations in left-edge: ${incrementationCount}`); // Debugging
// };

export const assignNumbers = (
  grid: Cell[][],
  mineCoordinates: { rowIndex: number; colIndex: number }[]
) => {
  for (let i = 0; i < mineCoordinates.length; i++) {
    const y = mineCoordinates[i].rowIndex;
    const x = mineCoordinates[i].colIndex;
    incrementAdjacentCells(grid, y, x);
    // // Ensures the cell is not an edge or corner case
    // if (y > 0 && y < grid.length - 1 && x > 0 && x < grid.length - 1) {
    //   centralAdjacentCells(grid, y, x);
    // }
    // // (0, 0)
    // if (y === 0 && x === 0) {
    //   topLeftCornerAdjacentCells(grid, y, x);
    // }
    // // (0, 8)
    // if (y === 0 && x === grid.length - 1) {
    //   topRightCornerAdjacentCells(grid, y, x);
    // }
    // // (8, 8)
    // if (y === grid.length - 1 && x === grid.length - 1) {
    //   bottomRightCornerAdjacentCells(grid, y, x);
    // }
    // // (8, 0)
    // if (y === grid.length - 1 && x === 0) {
    //   bottomLeftCornerAdjacentCells(grid, y, x);
    // }
    // // (0, _)
    // if (y === 0 && x > 0 && x < grid.length - 1) {
    //   topEdgeAdjacentCells(grid, y, x);
    // }
    // // (_, 8)
    // if (y > 0 && y < grid.length - 1 && x === grid.length - 1) {
    //   rightEdgeAdjacentCells(grid, y, x);
    // }
    // // (8, _)
    // if (y === grid.length - 1 && x > 0 && x < grid.length - 1) {
    //   bottomEdgeAdjacentCells(grid, y, x);
    // }
    // // (_, 0)
    // if (y > 0 && y < grid.length - 1 && x === 0) {
    //   leftEdgeAdjacentCells(grid, y, x);
    // }
  }
};

// DRY general function for incrementing adjacentMines property
export const incrementAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 3x3 subgrid with the given coordinate at the centre cell
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const ySubgrid = rowIndex + y;
      const xSubgrid = colIndex + x;
      // If the y or x coordinate is out of bounds, continue.
      if (
        ySubgrid < 0 ||
        ySubgrid >= grid.length ||
        xSubgrid < 0 ||
        xSubgrid >= grid.length
      )
        continue;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        incrementationCount++; // Debugging
        console.log(`Incrementing at: (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
  console.log(`Incrementations: ${incrementationCount}`); // Debugging
};

export const revealCells = (grid: Cell[][], y: number, x: number) => {
  // Returns if y or x are out of bounds
  if (y < 0 || y >= grid.length || x < 0 || x >= grid.length) return;
  // Returns if the Cell type object is a mine
  if (grid[y][x].hasMine) return;
  // if (grid[y][x].adjacentMines > 0) return;
  // Calls itself recursively
  else if (grid[y][x].isHidden && !grid[y][x].hasMine) {
    revealCell(grid[y][x]);
    revealCells(grid, y - 1, x - 1);
    revealCells(grid, y - 1, x);
    revealCells(grid, y - 1, x + 1);
    revealCells(grid, y, x - 1);
    revealCells(grid, y, x + 1);
    revealCells(grid, y + 1, x - 1);
    revealCells(grid, y + 1, x);
    revealCells(grid, y + 1, x + 1);
  }
};

export const revealCell = (cell: Cell) => {
  if (cell.isHidden) {
    cell.isHidden = false;
    if (cell.hasMine) {
      cell.cellElement.setAttribute("style", "background-color: black;");
    } else if (cell.adjacentMines === 1) {
      cell.cellElement.setAttribute("style", "background-color: blue;");
    } else if (cell.adjacentMines === 2) {
      cell.cellElement.setAttribute("style", "background-color: green;");
    } else if (cell.adjacentMines === 3) {
      cell.cellElement.setAttribute("style", "background-color: yellow;");
    } else if (cell.adjacentMines === 4) {
      cell.cellElement.setAttribute("style", "background-color: purple;");
    } else if (cell.adjacentMines === 5) {
      cell.cellElement.setAttribute("style", "background-color: orangered;");
    } else if (cell.adjacentMines === 6) {
      cell.cellElement.setAttribute("style", "background-color: red;");
    } else if (cell.adjacentMines === 7) {
      cell.cellElement.setAttribute("style", "background-color: orange;");
    } else if (cell.adjacentMines === 8) {
      cell.cellElement.setAttribute("style", "background-color: black;");
    } else {
      cell.cellElement.setAttribute("style", "background-color: white;");
    }
  }
};
