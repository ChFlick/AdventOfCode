import { readFileSync } from "fs";

export const loadFile = () => readFileSync(new URL("input.txt", import.meta.url))
  .toString()
  .trim();


const [input, ...boardsInput] = loadFile()
  .split("\n\n");

const numbers = input.split(",")
  .map(Number);
const boards = boardsInput.map(
  board => board.split("\n")
    .map(row => row.trim().split(/ +/)
      .map(Number)));

/**
 * @param {number[][]} board
 * @param {number[]} numbers
 * @returns {number}
 */
function calculateBoardWinnigRowValue(board, numbers) {
  for (const row of board) {
    if (row.every(n => numbers.includes(n))) {
      return row.reduce((a, b) => a + b, 0);
    }
  }

  for (let i = 0; i < board[0].length; i++) {
    const column = board.map(row => row[i]);
    if (column.every(n => numbers.includes(n))) {
      return column.reduce((a, b) => a + b, 0);
    }
  }

  return 0;
}

let remainingBoards = [...boards];
let currentNumbers = [];
let lastBoard = [];
// play as long as all boards are eleminated
for (let i = 5; remainingBoards.length > 0; i++) {
  currentNumbers = numbers.slice(0, i);
  lastBoard = remainingBoards[0];
  remainingBoards = boards.filter(board => calculateBoardWinnigRowValue(board, currentNumbers) <= 0);
}

const valueOfNonMarkedNumbers = lastBoard.flat().filter(n => !currentNumbers.includes(n)).reduce((a, b) => a + b, 0);
console.log(valueOfNonMarkedNumbers * currentNumbers.pop());
