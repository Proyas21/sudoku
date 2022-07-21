import './style.css';

class SudokuCell {
  constructor(value, permanent, possibilities, row, column) {
    this.value = value;
    this.permanent = permanent;
    this.possibilities = new Set(possibilities);
    this.row = row;
    this.column = column;

  }

  selectRandomFromPossibilities() {
    const poss_arr = Array.from(this.possibilities)
    this.setValue(poss_arr[Math.floor(Math.random() * poss_arr.length)]);
    return this.value;
  }

  setValue(value) {
    this.value = value;
    const myHost = document.querySelector(`#sudoku-board [data-row = "${this.row}"][data-column = "${this.column}"] input`)

    myHost.value = this.value;

    myHost.setAttribute("value", myHost.value);

  }

  static setPossibilities = (board) => {
    board.forEach((row, r) => {
      row.forEach((cell, c) => {

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
            // console.log((subBoxR - 1) * 3 + indexR, (subBoxC - 1) * 3 + indexC, cell.value)
            possibilities.delete(board[(subBoxR - 1) * 3 + indexR][(subBoxC - 1) * 3 + indexC].value);
          }
        }

        cell.possibilities = possibilities;

      })
    });

    return board;
  }
  static updatePossibilities = (board, boardElement) => {
    board.forEach((row, r) => {
      const rowElement = boardElement.querySelectorAll(`[data-row="${r + 1}"]`);
      row.forEach((cell, c) => {
        const cellElement = rowElement[c]
        console.log(cellElement);
        // .querySelector(`[data-column="${c + 1}"]`);


        // //row
        // for (let index = 0; index < 9; index++) {
        //   possibilities.delete(row[index].value);
        // }
        // //column
        // for (let index = 0; index < 9; index++) {
        //   possibilities.delete(board[index][c].value);
        // }
        // //sub box
        // const subBoxR = Math.ceil((r + 1) / 3);
        // const subBoxC = Math.ceil((c + 1) / 3);

        // for (let indexR = 0; indexR < 3; indexR++) {
        //   for (let indexC = 0; indexC < 3; indexC++) {
        //     // console.log((subBoxR - 1) * 3 + indexR, (subBoxC - 1) * 3 + indexC, cell.value)
        //     possibilities.delete(board[(subBoxR - 1) * 3 + indexR][(subBoxC - 1) * 3 + indexC].value);
        //   }
        // }


      })
    });
  }

  static createBoardFromArray = (sudoku) => {
    const board = [];
    sudoku.forEach((row, r) => {
      const row_new = []
      row.forEach((cell, c) => {
        row_new.push(new SudokuCell(cell, false, [], r + 1, c + 1));
      });
      board.push(row_new)
    });
    return board;
  }
}



const cell_html = `<div class="sudoku-cell">
<input type="number" class="sudoku-cell-input" min="1" max="9"/>
</div>`


const sudoku = [
  [1, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, 9],
];
// const sudokuBoard = SudokuCell.setPossibilities([
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
//   [new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, []), new SudokuCell(null, false, [])],
// ]);
let sudokuBoard = SudokuCell.setPossibilities(SudokuCell.createBoardFromArray(sudoku));

let board_html = sudokuBoard.map(row => row.map(cell => cellFromValue(cell)).join('\n')).join('\n');

document.getElementById("sudoku-board").innerHTML = board_html;

// console.log(document.getElementById("sudoku-board").innerHTML.replace("null", "1"));
// var test = document.querySelector("[data-column = \"2\"][data-row = \"2\"]");
// document.getElementById("sudoku-board").children[0].children[0].value = 9;




function cellFromValue(cell) {

  const possibilities_html = [];
  // Array.from(cell.possibilities).map(possibility => `<span>${possibility}</span>`).join('\n');

  for (let index = 0; index < 9; index++) {
    possibilities_html.push(`<span ${cell.possibilities.has(index + 1) ? "" : "class=hide"} >${index + 1}</span>`)
  }

  return `<div class="sudoku-cell" data-row=${cell.row} data-column=${cell.column}  >
  <input type="number" class="sudoku-cell-input" min="1" max="9" ${cell.value ? "value=" + cell.value : ""} />
  <div class="sudoku-cell-possibilities" >${possibilities_html.join('\n')}</div>
  </div>`
}


window.randomCell = (e) => {
  const targ = sudokuBoard[Math.floor(Math.random() * sudokuBoard.length)][Math.floor(Math.random() * sudokuBoard.length)];
  targ.selectRandomFromPossibilities();

  SudokuCell.updatePossibilities(sudokuBoard, document.getElementById("sudoku-board"));

  // console.log(targ);
  // console.log(sudokuBoard);

}


document.querySelectorAll("#sudoku-board .sudoku-cell input").forEach(input => {
  input.addEventListener("input", (e) => {
    if (e.target.value > 9 || !Number(e.target.value)) {
      e.target.value = e.target.value[0];
    } else {
      e.target.setAttribute("value", e.target.value);
      const [r, c] = [e.target.parentElement.dataset.row, e.target.parentElement.dataset.column];

      sudokuBoard[r - 1][c - 1].value = e.target.value;
    }
  });
})