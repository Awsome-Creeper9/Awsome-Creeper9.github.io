const cellSize = 45
const leftBuffer = (document.documentElement.clientWidth / 2) - (5 * cellSize) //possibly unneeded

const pieces = {
    0: [[0, 1, 1, 0], //Yellow (Block)
        [0, 1, 1, 0]],
    1: [[0, 1, 0, 0], //Purple (T)
        [1, 1, 1, 0]],
    2: [[1, 0, 0, 0], //Blue (J)
        [1, 1, 1, 0]],
    3: [[0, 0, 1, 0], //Orange (L)
        [1, 1, 1, 0]],
    4: [[0, 1, 1, 0], //Green (S)
        [1, 1, 0, 0]],
    5: [[1, 1, 0, 0], //Red (Z)
        [0, 1, 1, 0]],
    6: [[0, 0, 0, 0],
        [1, 1, 1, 1]] //Cyan (Line)
}

let boardCells = [];

for (let i = 0; i < 10; i++) {
    let column = [];
    for (let j = 0; j < 20; j++) {
        cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("Id", `${i},${j}`);
        column.push(cell);
    }
    boardCells.push(column);
}

for (let i = 0; i < boardCells.length; i++) {
    for (let j = 0; j < boardCells[i].length; j++) {
        document.getElementById("board").appendChild(boardCells[i][j]);
        boardCells[i][j].style.left = (i * cellSize) + "px";
        boardCells[i][j].style.top = (j * cellSize) + "px";
    }
}

// TEMP (Random Piece Button) (TRUE RANDOM; NOT 7-BAG)
document.getElementById("rando").addEventListener("click", () => {
    let randomInt = Math.floor(Math.random() * 6.99);
    let piece = pieces[randomInt];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            if (piece[i][j] === 1) {
                console.log(`#${j+3},${i}`);
                document.getElementById(`${j+3},${i}`).style.background = "#fff";
            }
            else {
                document.getElementById(`${j+3},${i}`).style.background = "#000";
            }
        }
    }
})