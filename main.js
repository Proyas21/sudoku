import './style.css';

class SudokuCell {
  constructor(value, permanent, possibilities) {
    this.value = value;
    this.permanent = permanent;
    this.possibilities = new Set(possibilities);
  }

  static setPossibilities = (board) => {
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.value) { }
        let possibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        // row
        for (let index = 0; index < 9; index++) {
          possibilities.delete(row[index].value);
        }
        //column
        for (let index = 0; index < 9; index++) {
          possibilities.delete(board[index][c].value);
        }
        //sub box
        const subBoxR = Math.ceil((r + 1) / 3);
        const subBoxC = Math.ceil((c + 1) / 3);

        for (let indexR = 0; indexR < 3; indexR++) {
          for (let indexC = 0; indexC < 3; indexC++) {
            console.log(subBoxR + indexR, subBoxC + indexC, cell.value)
            possibilities.delete(board[subBoxR + indexR][subBoxC + indexC].value);
          }
        }

        cell.possibilities = possibilities;
      })
    });

    return board;
  }

}



const cell_html = `<div class="sudoku-cell">
<input type="number" class="sudoku-cell-input" min="1" max="9"/>
</div>`

const sudokuBoard = SudokuCell.setPossibilities([
  [new SudokuCell(1, false, []), new SudokuCell(8, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(5, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
  [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
]);

const board_html = sudokuBoard.map(
  (row, r) => row.map((cell, c) => cellFromValue(cell, r + 1, c + 1)).join('\n')).join('\n');


// console.log(document.getElementById("sudoku-board").innerHTML.replace("null", "1"));
// var test = document.querySelector("[data-column = \"2\"][data-row = \"2\"]");
// document.getElementById("sudoku-board").children[0].children[0].value = 9;


document.getElementById("sudoku-board").innerHTML = board_html;


function cellFromValue(cell, row, column) {

  const possibilities_html = Array.from(cell.possibilities).map(possibility => `<span>${possibility}</span>`).join('\n');

  return `<div class="sudoku-cell" data-row=${row} data-column=${column}  >
  <input type="number" class="sudoku-cell-input" min="1" max="9" value=${cell.value ?? "\"\""} />
  <div class="sudoku-cell-possibilities ${cell.value ? "hide" : ""}" >${possibilities_html}</div>
  </div>`
}