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
    // Generates random coordinates
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
  // Returns an array of mine placement coordinates
  return mineCoordinates;
};

export const assignNumbers = (
  grid: Cell[][],
  mineCoordinates: { rowIndex: number; colIndex: number }[]
) => {
  for (let i = 0; i < mineCoordinates.length; i++) {
    // Accesses each mine placement coordinate
    const y = mineCoordinates[i].rowIndex;
    const x = mineCoordinates[i].colIndex;
    // Calls helper function
    incrementAdjacentCells(grid, y, x);
  }
};

// DRY general function for incrementing adjacentMines property
export const incrementAdjacentCells = (
  grid: Cell[][],
  rowIndex: number,
  colIndex: number
) => {
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
      else grid[ySubgrid][xSubgrid].adjacentMines++;
    }
  }
};

export const revealCells = (grid: Cell[][], y: number, x: number) => {
  // Returns if y or x are out of bounds
  if (y < 0 || y >= grid.length || x < 0 || x >= grid.length) return;
  // Returns if the Cell type object has already been revealed
  if (!grid[y][x].isHidden) return;
  // Returns if the Cell type object has a mine
  if (grid[y][x].hasMine) return;
  // Ensures that only the current Cell type object is revealed if it has one or more adjacent mines.
  if (grid[y][x].adjacentMines > 0) return revealCell(grid[y][x]);
  // Calls itself recursively, revealing all connected Cell type objects.
  else if (!grid[y][x].hasMine && grid[y][x].isHidden) {
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
    // Adjusts styling of pressed buttons
    cell.cellElement.style.backgroundColor = "#384048";
    cell.cellElement.style.borderTop = "none";
    cell.cellElement.style.borderRight = "none";
    cell.cellElement.style.borderBottom = "none";
    cell.cellElement.style.borderLeft = "none";

    if (cell.hasMine) {
      cell.cellElement.textContent = "💣";
      cell.cellElement.style.color = "black";
    }

    if (cell.adjacentMines === 1) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#0000ff";
    } else if (cell.adjacentMines === 2) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#008200";
    } else if (cell.adjacentMines === 3) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#ff0000";
    } else if (cell.adjacentMines === 4) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#000084";
    } else if (cell.adjacentMines === 5) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#840000";
    } else if (cell.adjacentMines === 6) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#008284";
    } else if (cell.adjacentMines === 7) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#840084";
    } else if (cell.adjacentMines === 8) {
      cell.cellElement.textContent = `${cell.adjacentMines}`;
      cell.cellElement.style.color = "#757575";
    }
  }
};
