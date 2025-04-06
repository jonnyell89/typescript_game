# typescript_game

# Minesweeper

Minesweeper is a logic puzzle game. The game features a grid of cells that contain hidden values. The hidden values can be either empty, a number or a mine. If the user selects an empty cell, all connected empty cells and their adjacent numbered cells are revealed. If the user selects a cell containing a number, the number refers to the number of mines immediately adjacent to that cell. If the user selects a cell containing a mine, the game is over, and the user has lost. The aim of the game is to plant a flag on all cells that contain a mine. This is done by revealing the hidden value of all other cells. The user must use the cells that contain numbers to determine which cells contain mines and which cells can be safely selected. The game ends when all cells that do not contain a mine have been revealed, or when the user accidentally selects a mine, and loses the game.

# HTML

- [ ] GUI

  - [ ] Container

    - [ ] Top container

      - [ ] Display containing the number of remaining mines.
      - [ ] Display containing the time.
      - [ ] Reset button

    - [ ] Bottom container

      - [ ] Grid (9 x 9)

        - [ ] Buttons

          - [ ] Empty cells
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
