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

const pieceIDs = [["yellow", "#ff0"], ["purple", "#a0a"], ["blue", "#00f"], ["orange", "#ffa000"], ["green", "#0f0"], ["red", "#f00"], ["cyan", "#0ff"]];

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
    let color, pieceType;
    let randomInt = Math.floor(Math.random() * 6.99);
    switch (randomInt) {
        case 0:
            color = "#ff0";
            pieceType = "yellow";
            break;
        case 1:
            color = "#a0a";
            pieceType = "purple";
            break;
        case 2:
            color = "#00f";
            pieceType = "blue";
            break;
        case 3:
            color = "#ffa000";
            pieceType = "orange";
            break;
        case 4:
            color = "#0f0";
            pieceType = "green";
            break;
        case 5:
            color = "#f00";
            pieceType = "red";
            break;
        case 6:
            color = "#0ff";
            pieceType = "cyan";
            break;
    }
    let piece = pieces[randomInt];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            if (piece[i][j] === 1) {
                console.log(`#${j+3},${i}`);
                document.getElementById(`${j+3},${i}`).style.background = color;
                document.getElementById(`${j+3},${i}`).classList.remove("yellow", "purple", "blue", "orange", "green", "red", "cyan");
                document.getElementById(`${j+3},${i}`).classList.add(pieceType);
            }
            else {
                document.getElementById(`${j+3},${i}`).style.background = "#000";
                document.getElementById(`${j+3},${i}`).classList.remove("yellow", "purple", "blue", "orange", "green", "red", "cyan");
            }
        }
    }
})

setInterval(() => {
    for (let k = 0; k < pieceIDs.length; k++) {
        let keep = [];
        document.querySelectorAll(`.${pieceIDs[k][0]}`).forEach((element) => {
            let cellID = element.getAttribute("id");
            let xCoord = cellID.split(",")[0];
            let yCoord = cellID.split(",")[1];
            keep.push(document.getElementById(`${xCoord},${parseInt(yCoord) + 1}`));
            document.getElementById(`${xCoord},${parseInt(yCoord) + 1}`).classList.add(pieceIDs[k][0]);
            document.getElementById(`${xCoord},${parseInt(yCoord) + 1}`).style.background = pieceIDs[k][1];
        })
        document.querySelectorAll(`.${pieceIDs[k][0]}`).forEach((element) => {
            let inKeep = false;
            for (let i = 0; i < keep.length; i++) {
                if (element === keep[i]) {
                    inKeep = true;
                }
            }
            if (!inKeep) {
                element.classList.remove(pieceIDs[k][0]);
            }
        })
    }
    document.querySelectorAll(".cell").forEach((element) => {
        if (element.classList[1] !== "yellow" && element.classList[1] !== "purple" && element.classList[1] !== "blue" && element.classList[1] !== "orange" && element.classList[1] !== "green" && element.classList[1] !== "red" && element.classList[1] !== "cyan") {
            element.style.background = "#000";
        }
    })
}, 1000)