import "./style.scss";
// npm run dev

const GRID_WIDTH = 9;
const GRID_HEIGHT = 9;
const MINE_COUNT = 10;

type Cell = {
  cellElement: HTMLButtonElement;
  x_coord: number;
  y_coord: number;
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

const generateGrid = (GRID_WIDTH: number, GRID_HEIGHT: number): Cell[][] => {
  // y-axis array
  const cells: Cell[][] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    // x-axis array
    const row: Cell[] = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      // Creates new button element
      const button = document.createElement("button");
      // Assigns class "grid__btn" to new button element
      button.classList.add("grid__btn");
      // Appends new button element to grid div element
      grid?.appendChild(button);
      // Creates new Cell object
      const cell: Cell = {
        cellElement: button,
        x_coord: x,
        y_coord: y,
        isHidden: true,
        hasNumber: false,
        hasFlag: false,
        hasMine: false,
        adjacentMines: 0,
      };
      // Pushes new Cell object to x-axis array
      row.push(cell);
    }
    // Pushes x-axis array to y-axis array
    cells.push(row);
  }
  // Returns two-dimensional array of Cell objects
  return cells;
};

generateGrid(GRID_WIDTH, GRID_HEIGHT);
