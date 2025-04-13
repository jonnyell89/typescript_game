export type Cell = {
  cellElement: HTMLButtonElement;
  rowIndex: number;
  colIndex: number;
  isHidden: boolean;
  hasFlag: boolean;
  hasMine: boolean;
  adjacentMines: number;
};
