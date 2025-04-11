import "./style.scss";
// npm run dev

const GRID_SIZE = 9;
const MINE_COUNT = 10;

type Cell = {
  cellElement: HTMLButtonElement;
  xCoord: number;
  yCoord: number;
  isHidden: boolean;
  hasNumber: boolean;
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

const generateCell = (x: number, y: number): Cell => {
  // Creates new button element
  const button = document.createElement("button");
  // Assigns class "grid__btn" to new button element
  button.classList.add("grid__btn");
  // Appends new button element to grid div element
  grid?.appendChild(button);
  // Creates new Cell object
  return {
    cellElement: button,
    xCoord: x,
    yCoord: y,
    isHidden: true,
    hasNumber: false,
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
      const cell: Cell = generateCell(x, y);
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
    const xRandom = Math.floor(Math.random() * grid.length);
    const yRandom = Math.floor(Math.random() * grid.length);

    if (grid[yRandom][xRandom].hasMine) continue;
    else {
      grid[yRandom][xRandom].hasMine = true;
      // Defines mine coordinates as inline object literals and pushes them to the mineCoordinates array
      mineCoordinates.push({ xCoord: xRandom, yCoord: yRandom });
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
  xCoord: number,
  yCoord: number
) => {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const xSubgrid = xCoord + i;
      const ySubgrid = yCoord + j;
      if (grid[ySubgrid][xSubgrid].hasMine) continue;
      else {
        grid[ySubgrid][xSubgrid].adjacentMines++;
        console.log(`Incrementing adjacentMines at (${ySubgrid}, ${xSubgrid})`);
      }
    }
  }
};

const assignNumbers = (
  grid: Cell[][],
  mineCoordinates: { xCoord: number; yCoord: number }[]
) => {
  for (let i = 0; i < mineCoordinates.length; i++) {
    const x = mineCoordinates[i].xCoord;
    const y = mineCoordinates[i].yCoord;
    if (x > 0 && x < grid.length - 1 && y > 0 && y < grid.length - 1) {
      centralAdjacentCells(grid, x, y);
    }
  }
};

const assignedNumbers = assignNumbers(minesweeperGrid, mineCoordinates);

console.log(minesweeperGrid);
