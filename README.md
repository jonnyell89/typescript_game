# typescript_game

# Minesweeper

Minesweeper is a logic puzzle game. The game features a grid of cells that contain hidden values. The hidden values can either be empty, a number or a mine. The aim of the game is to plant a flag on all cells that contain a mine. This is done by revealing the hidden value of all other cells. If the user selects an empty cell, all connected empty cells and their adjacent numbered cells are revealed. If the user selects a cell containing a number, the number refers to the number of mines immediately adjacent to that cell. If the user selects a cell containing a mine, the game is over, and the user has lost. The user must use the cells that contain numbers to determine which cells contain mines and which cells can be safely selected. The game ends when all cells that do not contain a mine have been revealed, or when the user accidentally selects a mine, and loses the game.

# HTML

- [x] GUI

  - [x] Container

    - [x] Top container

      - [ ] Display containing the number of remaining mines.
      - [ ] Display containing the time.
      - [ ] Reset button

    - [x] Bottom container

      - [x] Grid (9 x 9)

        - [x] Buttons

          - [] Empty cells
          - [ ] Cells containing a reference to the number of adjacent mines.
          - [ ] 10 cells containing mines.

# SCSS

- [ ] Responsive Design

  - [ ] Mobile-first design
  - [ ] Rescale for different screen dimensions.

- [ ] GUI

  - [ ] All cells start hidden from the user.

  - [ ] Cell types:

    - [ ] Empty cells contain no value, but are connected to all adjacent empty cells.

    - [ ] Cells containing reference numbers:

      - [ ] 1: Blue
      - [ ] 2: Green
      - [ ] 3: Yellow
      - [ ] 4: Purple
      - [ ] 5: Light Red
      - [ ] 6: Dark Red
      - [ ] 7: Orange
      - [ ] 8: Black

    - [ ] Cells containing mines:

      - [ ] Mine: Red
      - [ ] Remaining mines: Black.

  - [ ] Button hover feedback

  - [ ] Grid interaction disables when the game is won or lost.

# TypeScript

- [ ] Functionality

  - [ ] Top container

    - [ ] Display containing the number of remaining mines.

      - [ ] Counts down from 10 to zero with each flag planted.

    - [ ] Display containing the time.

      - [ ] Counts up from zero.

    - [ ] Reset button resets:

      - [ ] Mine display
      - [ ] Time display
      - [ ] Grid

        - [ ] Mine configuration
        - [ ] Reference number configuration
        - [ ] All revealed cells back to initial state.

  - [ ] Bottom container

    - [ ] Grid

      - [ ] Start timer on first grid interaction.

      - [ ] Ensure that the first cell is never a mine.

      - [ ] Left click, or short press, on a cell to reveal its value.

        - [ ] If cell is empty, reveals all connected empty cells.

        - [ ] If cell contains a reference number, no other cells are revealed.

        - [ ] If cell contains a mine, all remaining mines are revealed.

      - [ ] Right click, or long press, on a cell to plant a flag.

      - [ ] Detect when all cells that do not contain a mine have been revealed.

# Pseudocode

Global variables:

GRID_WIDTH = 9
GRID_HEIGHT = 9
MINE_COUNT = 10

Requirements:

Game Logic:

The game requires a grid of cells, represented as a two-dimensional array.

Each cell of the grid is to be a Cell type object, containing all necessary information:

    cellElement: button;
    x coordinate: number;
    y coordinate: number;
    isHidden: boolean;
    hasNumber: boolean;
    hasFlag: boolean;
    hasMine: boolean;
    adjacentMines: number;

A generateCell(x: number, y: number) function that generates Cell type objects.

    Input values are x and y coordinates, generated by a nested for loop.

    Properties of type boolean are set to default values.

    This function is called as a helper function to the generateGrid function.

A generateGrid(GRID_WIDTH: number, GRID_HEIGHT: number) function to generate a two-dimensional list of Cell type objects, representing the minesweeper grid.

A function that uses pseudo random numbers to generate grid coordinates for mine placements.

A function that counts the number of adjacent mines and assigns that value to each cell in the grid.

A function that detects when the user has won or lost.

A function that counts down from MINE_COUNT.

A function that resets the game.

A function that counts up from zero.

Interactivity:

A function that hover styles the cells of the grid.

Computer Interactivity:

A function that reveals the hidden value of a cell when the cell is left-clicked.

A function that plants a flag on a cell when the cell is right-clicked.

Mobile Interativity:

A function that reveals the hidden value of a cell when the cell is short pressed.

A function that plants a flag on a cell when the cell is long pressed.
