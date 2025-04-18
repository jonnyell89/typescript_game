import "./style.scss";
import {
  generateGrid,
  assignMines,
  assignNumbers,
  revealCells,
  revealMines,
  plantFlag,
  flagCounter,
  isGameWon,
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

// Game State
let gameBegins = false;
let gameEnds = false;
let timeInterval: number;
let seconds = 1;

// Timer Functions
const startTimer = () => {
  stopTimer();
  seconds = 1;
  timer.textContent = `1`;
  timeInterval = setInterval(() => {
    seconds++;
    timer.textContent = seconds.toString();
  }, 1000);
};

const clearTimer = () => {
  timer.innerHTML = "";
};

const stopTimer = () => {
  clearInterval(timeInterval);
};

// Game Logic
const startGame = () => {
  if (!grid) {
    throw new Error("The 'grid' element has failed to load.");
  }

  gameBegins = false;
  gameEnds = false;
  resetButton.textContent = "🙂";
  grid.innerHTML = "";

  // Generates a two-dimensional array of Cell objects
  const cellMatrix = generateGrid(grid, GRID_SIZE);
  // Generates an array of MineCoordinate objects
  const mineCoordinates = assignMines(cellMatrix, MINE_COUNT);
  // Modifies hasMine and adjacentMines Cell object properties
  const minesweeperGrid = assignNumbers(cellMatrix, mineCoordinates);

  for (let y = 0; y < minesweeperGrid.length; ++y) {
    for (let x = 0; x < minesweeperGrid.length; ++x) {
      // Left-click event handlers
      minesweeperGrid[y][x].cellElement.addEventListener("click", () => {
        if (gameEnds) return;

        if (!gameBegins) {
          gameBegins = true;
          startTimer();
          counter.textContent = MINE_COUNT.toString();
        }

        if (minesweeperGrid[y][x].hasFlag) return;

        if (minesweeperGrid[y][x].hasMine) {
          revealMines(minesweeperGrid, mineCoordinates);
          resetButton.textContent = "😞";
          gameEnds = true;
          stopTimer();
          return;
        }

        revealCells(
          minesweeperGrid,
          minesweeperGrid[y][x].rowIndex,
          minesweeperGrid[y][x].colIndex
        );

        if (isGameWon(minesweeperGrid)) {
          // Remaining mines are revealed
          revealMines(minesweeperGrid, mineCoordinates);
          counter.textContent = `${MINE_COUNT - flagCounter(minesweeperGrid)}`;
          resetButton.textContent = "😎";
          gameEnds = true;
          stopTimer();
          return;
        }
      });

      // Right-click event handlers
      minesweeperGrid[y][x].cellElement.addEventListener(
        "contextmenu",
        (event: MouseEvent) => {
          if (gameEnds) return;
          if (!gameBegins) {
            gameBegins = true;
          }
          // Prevents the default right-click menu
          event.preventDefault();
          plantFlag(minesweeperGrid, y, x);
          counter.textContent = `${MINE_COUNT - flagCounter(minesweeperGrid)}`;
        }
      );
    }
  }
};

// Reset Button
resetButton.addEventListener("click", () => {
  stopTimer();
  clearTimer();
  // Resets the flag counter
  counter.innerHTML = "";
  startGame();
});

// Starts the game
startGame();
