let width = 50,
height = 50,
deadCellColor = '#000000',
livingCellColor = '#ffffff',
gridColor = '#555555',
started = false,
cells = Array.from({ length: width });

//////////////////////
// Helper Functions //
//////////////////////

function createBoard() {
    let board = document.getElementById("board");
    board.innerHTML = '';
    for (let i = 0; i < cells.length; i++) {
        cells[i] = [];
        for (let j = 0; j < height; j++) {
            cells[i][j] = document.createElement("div");
            cells[i][j].setAttribute("class", "dead");
            cells[i][j].style.left = (i * 15) + "px";
            cells[i][j].style.top = (j * 15) + "px";
            board.appendChild(cells[i][j]);

            cells[i][j].addEventListener("click", () => {
                (cells[i][j].className === "dead") ? cells[i][j].setAttribute("class", "living") : cells[i][j].setAttribute("class", "dead");
            });
        }
    }
    board.style.width = (width * 15) + "px";
    board.style.height = (height * 15) + "px";
}

function countLivingNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newX = x + i;
            let newY = y + j;
            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                if (i !== 0 || j !== 0) {
                    count += cells[newX][newY].className === "living" ? 1 : 0;
                }
            }
        }
    }
    return count;
}

/////////////
// Buttons //
/////////////

document.getElementById("start").addEventListener("click", () => {
    started = true;
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("stop").style.visibility = "visible";
})

document.getElementById("stop").addEventListener("click", () => {
    started = false;
    document.getElementById("stop").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
})

document.getElementById("reset").addEventListener("click", () => {
    started = false;
    document.getElementById("stop").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
    createBoard();
})

document.getElementById("settings").addEventListener("click", () => {
    started = false;
    document.getElementById("stop").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("options").style.visibility = "visible";
})

document.getElementById("apply").addEventListener("click", () => {
    width = document.getElementById("width").value;
    height = document.getElementById("height").value;
    deadCellColor = document.getElementById("deadCell").value;
    livingCellColor = document.getElementById("LivingCell").value;
    gridColor = document.getElementById("grid").value;
    document.getElementById("options").style.visibility = "hidden";
    cells = Array.from({ length: width });

    createBoard()

    document.querySelectorAll(".dead, .living").forEach(element => {
        element.style.background = (element.className === "living") ? livingCellColor : deadCellColor;
        element.style.border = gridColor + " 1px solid"
    })
})

///////////////////////
// Intervals/Updates //
///////////////////////

function updateGame() {
    if (started) {
        let newCells = Array.from({ length: width }, () => Array(height).fill(0));
        for (let a = 0; a < cells.length; a++) {
            for (let b = 0; b < cells[a].length; b++) {
                let neighbors = countLivingNeighbors(a, b);
                if (cells[a][b].className === "living") {
                    (neighbors < 2 || neighbors > 3) ? newCells[a][b] = 0 : newCells[a][b] = 1;
                } else {
                    (neighbors === 3) ? newCells[a][b] = 1 : newCells[a][b] = 0
                }
            }
        }
        for (let a = 0; a < cells.length; a++) {
            for (let b = 0; b < cells[a].length; b++) {
                cells[a][b].setAttribute("class", newCells[a][b] ? "living" : "dead");
            }
        }
    }
}

setInterval(updateGame, 200);

setInterval(() => {
    document.querySelectorAll(".dead, .living").forEach(element => {
        element.style.background = (element.className === "living") ? livingCellColor : deadCellColor;
        element.style.border = gridColor + " 1px solid"
    })
    document.getElementById("board").style.left = `calc(50% - ${(width * 15) / 2}px)`;
}, 20)

createBoard() // Initializes Board