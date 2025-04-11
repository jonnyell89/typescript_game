import "./style.scss";
// npm run dev

const GRID_SIZE = 9;
const MINE_COUNT = 10;

type Cell = {
  cellElement: HTMLButtonElement;
  yCoord: number;
  xCoord: number;
  isHidden: boolean;
  hasFlag: boolean;
  hasMine: boolean;
  adjacentMines: number;
};

// Main container
const container = document.querySelector<HTMLElement>(".container");

// Top container
const topContainer = document.querySelector<HTMLElement>(".top-container");
const counter = document.querySelector<HTMLDivElement>(
  ".top-container__counter"
);
const resetButton = document.querySelector<HTMLButtonElement>(
  ".top-container__reset-btn"
);
const timer = document.querySelector<HTMLDivElement>(".top-container__timer");

// Bottom container
const bottomContainer =
  document.querySelector<HTMLElement>(".bottom-container");
const grid = document.querySelector<HTMLDivElement>(".bottom-container__grid");

const generateCell = (y: number, x: number): Cell => {
  // Creates new button element
  const button = document.createElement("button");
  // Assigns class "grid__btn" to new button element
  button.classList.add("grid__btn");
  // Appends new button element to grid div element
  grid?.appendChild(button);
  // Creates new Cell object
  return {
    cellElement: button,
    yCoord: y,
    xCoord: x,
    isHidden: true,
    hasFlag: false,
    hasMine: false,
    adjacentMines: 0,
  };
};

const generateGrid = (gridSize: number): Cell[][] => {
  // y-axis array
  const minesweeperGrid: Cell[][] = [];
  for (let y = 0; y < gridSize; y++) {
    // x-axis array
    const row: Cell[] = [];
    for (let x = 0; x < gridSize; x++) {
      // Calls helper function
      const cell: Cell = generateCell(y, x);
      // Pushes new Cell object to x-axis array
      row.push(cell);
    }
    // Pushes x-axis array to y-axis array
    minesweeperGrid.push(row);
  }
  // Returns two-dimensional array of Cell objects
  return minesweeperGrid;
};

const minesweeperGrid = generateGrid(GRID_SIZE);

const assignMines = (grid: Cell[][], numberOfMines: number) => {
  const mineCoordinates = [];
  let assignedMines = 0;

  while (assignedMines < numberOfMines) {
    const yRandom = Math.floor(Math.random() * grid.length);
    const xRandom = Math.floor(Math.random() * grid.length);

    if (grid[yRandom][xRandom].hasMine) continue;
    else {
      grid[yRandom][xRandom].hasMine = true;
      // Defines mine coordinates as inline object literals and pushes them to the mineCoordinates array
      mineCoordinates.push({ yCoord: yRandom, xCoord: xRandom });
      assignedMines++;
    }
  }
  // Returns an array of successful placement coordinates
  return mineCoordinates;
};

const mineCoordinates = assignMines(minesweeperGrid, MINE_COUNT);

console.log(minesweeperGrid);

console.log(mineCoordinates);

const centralAdjacentCells = (
  grid: Cell[][],
  yCoord: number,
  xCoord: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 3x3 subgrid with the given coordinate at the central cell
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const ySubgrid = yCoord + y;
      const xSubgrid = xCoord + x;
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

const topLeftCornerAdjacentCells = (
  grid: Cell[][],
  yCoord: number,
  xCoord: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the top left cell
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      const ySubgrid = yCoord + y;
      const xSubgrid = xCoord + x;
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

const topRightCornerAdjacentCells = (
  grid: Cell[][],
  yCoord: number,
  xCoord: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the top right cell
  for (let y = -1; y < 1; y++) {
    for (let x = 0; x < 2; x++) {
      const ySubgrid = yCoord + y;
      const xSubgrid = xCoord + x;
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

const bottomRightCornerAdjacentCells = (
  grid: Cell[][],
  yCoord: number,
  xCoord: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the bottom right cell
  for (let y = -1; y < 1; y++) {
    for (let x = -1; x < 1; x++) {
      const ySubgrid = yCoord + y;
      const xSubgrid = xCoord + x;
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

const bottomLeftCornerAdjacentCells = (
  grid: Cell[][],
  yCoord: number,
  xCoord: number
) => {
  let incrementationCount = 0; // Debugging
  // Iterates over a 2x2 subgrid with the given coordinate at the bottom left cell
  for (let y = 0; y < 2; y++) {
    for (let x = -1; x < 1; x++) {
      const ySubgrid = yCoord + y;
      const xSubgrid = xCoord + x;
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

const assignNumbers = (
  grid: Cell[][],
  mineCoordinates: { yCoord: number; xCoord: number }[]
) => {
  for (let i = 0; i < mineCoordinates.length; i++) {
    const x = mineCoordinates[i].xCoord;
    const y = mineCoordinates[i].yCoord;
    // Ensures the cell is not an edge or corner case
    if (y > 0 && y < grid.length - 1 && x > 0 && x < grid.length - 1) {
      centralAdjacentCells(grid, y, x);
    }
    // (0, 0)
    else if (y === 0 && x === 0) {
      topLeftCornerAdjacentCells(grid, y, x);
    }
    // (8, 0)
    else if (y === grid.length - 1 && x === 0) {
      topRightCornerAdjacentCells(grid, y, x);
    }
    // (8, 8)
    else if (y === grid.length - 1 && x === grid.length - 1) {
      bottomRightCornerAdjacentCells(grid, y, x);
    }
    // (0, 8)
    else if (y === 0 && x === grid.length - 1) {
      bottomLeftCornerAdjacentCells(grid, y, x);
    }
  }
};

const assignedNumbers = assignNumbers(minesweeperGrid, mineCoordinates);

console.log(minesweeperGrid);
