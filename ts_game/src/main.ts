import "./style.scss";
import { Cell } from "./types";
import {
  generateCell,
  generateGrid,
  assignMines,
  assignNumbers,
  incrementAdjacentCells,
  revealCell,
  revealCells,
  revealMines,
  plantFlag,
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

// Game Logic
let gameBegins = false;
let gameEnds = false;

const startGame = () => {
  if (!grid) {
    throw new Error("The 'grid' element has failed to load.");
  }

  gameBegins = false;
  gameEnds = false;

  resetButton.textContent = "🙂";

  // Resets the grid element
  grid.innerHTML = "";
  // Generates a two-dimensional array of Cell objects
  const cellMatrix = generateGrid(grid, GRID_SIZE);
  // Generates an array of MineCoordinate objects
  const mineCoordinates = assignMines(cellMatrix, MINE_COUNT);
  // Modifies hasMine and adjacentMines Cell object properties
  const minesweeperGrid = assignNumbers(cellMatrix, mineCoordinates);

  for (let y = 0; y < minesweeperGrid.length; ++y) {
    for (let x = 0; x < minesweeperGrid.length; ++x) {
      // Adds an event listener to every button in the grid
      minesweeperGrid[y][x].cellElement.addEventListener("click", () => {
        if (gameEnds) return;
        if (!gameBegins) {
          gameBegins = true;
        }
        if (minesweeperGrid[y][x].hasMine) {
          revealMines(minesweeperGrid, mineCoordinates);
          resetButton.textContent = "😞";
          gameEnds = true;
          return;
        } else {
          revealCells(
            minesweeperGrid,
            minesweeperGrid[y][x].rowIndex,
            minesweeperGrid[y][x].colIndex
          );
        }
      });
      minesweeperGrid[y][x].cellElement.addEventListener(
        "contextmenu",
        (event: MouseEvent) => {
          // Prevents the right-click menu
          event.preventDefault();
          plantFlag(minesweeperGrid, y, x);
        }
      );
    }
  }
};

resetButton.addEventListener("click", () => {
  resetButton.innerHTML = "";
  resetButton.style.backgroundColor = "#384048";
  resetButton.style.borderTop = "none";
  resetButton.style.borderRight = "none";
  resetButton.style.borderBottom = "none";
  resetButton.style.borderLeft = "none";
  startGame();
});

startGame();
