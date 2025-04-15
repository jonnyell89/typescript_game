import "./style.scss";
import { Cell } from "./types";
import {
  generateCell,
  generateGrid,
  assignMines,
  assignNumbers,
  // centralAdjacentCells,
  // topLeftCornerAdjacentCells,
  // topRightCornerAdjacentCells,
  // bottomRightCornerAdjacentCells,
  // bottomLeftCornerAdjacentCells,
  // topEdgeAdjacentCells,
  // rightEdgeAdjacentCells,
  // bottomEdgeAdjacentCells,
  // leftEdgeAdjacentCells,
  incrementAdjacentCells,
  revealCell,
  revealCells,
} from "./utils";
// npm run dev

// Global Variables
const GRID_SIZE = 9;
const MINE_COUNT = 10;

// DOM Elements
const container = document.querySelector<HTMLElement>(".container");
const topContainer = document.querySelector<HTMLElement>(".top-container");
const counter = document.querySelector<HTMLDivElement>(
  ".top-container__counter"
);
const resetButton = document.querySelector<HTMLButtonElement>(
  ".top-container__reset-btn"
);
const timer = document.querySelector<HTMLDivElement>(".top-container__timer");
const bottomContainer =
  document.querySelector<HTMLElement>(".bottom-container");
const grid = document.querySelector<HTMLDivElement>(".bottom-container__grid");

if (
  !container ||
  !topContainer ||
  !counter ||
  !resetButton ||
  !timer ||
  !bottomContainer
) {
  throw new Error("The Minesweeper GUI has failed to load.");
}

if (!grid) {
  throw new Error("The 'grid' element has failed to load.");
}

// Game Logic
const minesweeperGrid = generateGrid(grid, GRID_SIZE);
const mineCoordinates = assignMines(minesweeperGrid, MINE_COUNT);
const assignedNumbers = assignNumbers(minesweeperGrid, mineCoordinates);

let gameBegins = false;

for (let row of minesweeperGrid) {
  for (let cell of row) {
    cell.cellElement.addEventListener("click", () => {
      if (!gameBegins) {
        gameBegins = true;
      }
      revealCells(minesweeperGrid, cell.rowIndex, cell.colIndex);
    });
  }
}

for (let row of minesweeperGrid) {
  for (let cell of row) {
    if (cell.hasMine) {
      cell.cellElement.textContent = "💣";
      cell.cellElement.style.color = "black";
    }
  }
}

resetButton.textContent = "😀";

// for (let row of minesweeperGrid) {
//   for (let cell of row) {
//     if (cell.adjacentMines === 1) {
//       cell.cellElement.setAttribute("style", "background-color: #0000ff;");
//     } else if (cell.adjacentMines === 2) {
//       cell.cellElement.setAttribute("style", "background-color: #008200;");
//     } else if (cell.adjacentMines === 3) {
//       cell.cellElement.setAttribute("style", "background-color: #ff0000;");
//     } else if (cell.adjacentMines === 4) {
//       cell.cellElement.setAttribute("style", "background-color: #000084;");
//     } else if (cell.adjacentMines === 5) {
//       cell.cellElement.setAttribute("style", "background-color: #840000;");
//     } else if (cell.adjacentMines === 6) {
//       cell.cellElement.setAttribute("style", "background-color: #008284;");
//     } else if (cell.adjacentMines === 7) {
//       cell.cellElement.setAttribute("style", "background-color: #840084;");
//     } else if (cell.adjacentMines === 8) {
//       cell.cellElement.setAttribute("style", "background-color: #757575;");
//     }
//   }
// }
