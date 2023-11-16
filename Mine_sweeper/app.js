const boardEle = document.querySelector(".board");
console.log(boardEle);

const board = [];
// create a board
function grid() {}

function createBoard(row, coloum) {
  for (let i = 0; i < row; i++) {
    const tile = document.createElement("div");
    boardEle.append(tile);
  }
}
createBoard(5);
