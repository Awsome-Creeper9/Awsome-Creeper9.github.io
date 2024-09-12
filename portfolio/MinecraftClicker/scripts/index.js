///////////////////////////////////////
// STARTING VARIABLES / DECLARATIONS //
///////////////////////////////////////

let levelData;
fetch("scripts/levelData.json").then(response => response.json()).then(data => {levelData = data;});

let kCounter = 0;

let ClientWidth = window.innerWidth;
let ClientHeight = window.innerHeight;
const board = document.getElementById('board');
const box = document.getElementById('box');
const hitbox = document.getElementById('hitbox');
const hotbar = document.getElementById('hotbar');

let boardObj = {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
}

boardObj.left = (ClientWidth / 2) - (1500 / 2) - 5;
boardObj.right = (ClientWidth / 2) + (1500 / 2) - 5;
boardObj.top = (ClientHeight / 2) - (700 / 2) - 38;
boardObj.bottom = (ClientHeight / 2) + (700 / 2) - 40;

let boxObj = {}

let enemyHealth = 20;

let playerAttributes = {
    atkSpeed: 0, //normal
    atkDmg: 0, //normal
    atkAOE: 0, //normal
    health: 20,
    maxHealth: 20,
    xpStored: 0,
    xpLevel: 0,
    xpTotal: 0,
}

let level = 0;

let debug = {
    showHitbox: false, //F13
}

/////////////////////
// UPDATE FUNCTION //
/////////////////////

setInterval(update, 1000 / 20)
function update() {
    handleResize()

    switch (boxObj.pathType) {
        case "linear":
            boxObj.x += boxObj.speedX;
            boxObj.y += boxObj.speedY;
            break;
        case "sin":
            boxObj.x += boxObj.speedX;
            boxObj.y = (Math.sin(boxObj.x / 100) * 250) + ((ClientHeight / 2) - 90);
            break;
        case "quadratic":
            boxObj.x += boxObj.speedX;
            boxObj.y = ((boxObj.x - ((ClientWidth / 2) - 45)) ** 2) / 900 + boardObj.top;
            break;
        case "tan":
            boxObj.x += boxObj.speedX;
            boxObj.y =((Math.tan(boxObj.x / 100))/((1/20) * Math.cos(boxObj.x / 100))) + ((ClientHeight / 2) - 90);
            break;
        case "circle":
            kCounter += boxObj.speedX;
            boxObj.x = (Math.cos(kCounter / 100) * 280) + ((ClientWidth / 2) - 50);
            boxObj.y = (Math.sin(kCounter / 100) * 280) + ((ClientHeight / 2) - 90);
            break;
        case "ellipse":
            kCounter += boxObj.speedX;
            boxObj.x = (Math.cos(kCounter / 100) * 600) + ((ClientWidth / 2) - 50);
            boxObj.y = (Math.sin(kCounter / 100) * 300) + ((ClientHeight / 2) - 90);
            break;
        case "inf":
            kCounter += boxObj.speedX;
            boxObj.x = (Math.cos(kCounter / 200) * 560) + ((ClientWidth / 2) - 50);
            boxObj.y = (Math.sin(kCounter / 100) * 280) + ((ClientHeight / 2) - 90);
            break;
        case "multi-cross":
            kCounter += boxObj.speedX;
            boxObj.x = (Math.cos(kCounter / 500) * 700) + ((ClientWidth / 2) - 50);
            boxObj.y = (Math.sin(kCounter / 100) * 280) + ((ClientHeight / 2) - 90);
            break;
        default:
            boxObj.x += boxObj.speedX;
            boxObj.y += boxObj.speedY;
            console.error("Invalid path type");
            break;
    }

    box.style.left = Math.min(Math.max(boxObj.x, boardObj.left), boardObj.right - boxObj.width) + "px";
    box.style.top = Math.min(Math.max(boxObj.y, boardObj.top), boardObj.bottom - boxObj.height) + "px";

    box.style.width = boxObj.width + "px";
    box.style.height = boxObj.height + "px";

    document.getElementById("player-health").innerHTML = `Player Health: ${playerAttributes.health} / ${playerAttributes.maxHealth}`;
    document.getElementById("enemy-health").innerHTML = `Enemy Health: ${enemyHealth} / ${boxObj.maxEnemyHealth}`;

    if (enemyHealth <= 0) {
        playerAttributes.xpStored += levelData[level].xpReward;
        increaseLevel();
    }

    updateHearts();

    updateXP();

    collisionCheck();

    if (level === 0) {
        box.style.visibility = "hidden";
        hitbox.style.visibility = "hidden";
        board.style.visibility = "hidden";
        hotbar.style.visibility = "hidden";
        document.getElementById("mini-title").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "visible";
        document.getElementById("main-menu-buttons").style.visibility = "visible";
        document.getElementById("splash").style.display = "unset";
        document.getElementById("disclaimer").style.visibility = "visible";
        document.getElementById("information").style.visibility = "hidden";
        scaleSplash();
    }
    else if (level > 0) {
        box.style.visibility = "visible";
        hitbox.style.visibility = "visible";
        board.style.visibility = "visible";
        hotbar.style.visibility = "visible";
        document.getElementById("mini-title").style.visibility = "visible";
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("main-menu-buttons").style.visibility = "hidden";
        document.getElementById("splash").style.display = "none";
        document.getElementById("disclaimer").style.visibility = "hidden";
        board.style.backgroundSize = 'unset';
        document.getElementById("information").style.visibility = "hidden";

        box.style.background = boxObj.image;
        board.style.background = `url("images/backgrounds/${levelData[level].background}.png")`;

        hitbox.style.width = (boxObj.width + playerAttributes.atkAOE) + "px";
        hitbox.style.height = (boxObj.height + playerAttributes.atkAOE) + "px";
        hitbox.style.left = (boxObj.x - (playerAttributes.atkAOE / 2)) + "px";
        hitbox.style.top = (boxObj.y - (playerAttributes.atkAOE / 2)) + "px";
    }
    else if (level < 0) {
        box.style.visibility = "hidden";
        hitbox.style.visibility = "hidden";
        hotbar.style.visibility = "hidden";
        document.getElementById("title").style.visibility = "hidden";
        document.getElementById("main-menu-buttons").style.visibility = "hidden";
        document.getElementById("splash").style.display = "none";
        document.getElementById("disclaimer").style.visibility = "hidden";
        document.getElementById("information").style.visibility = "visible";
        if (level == -1) { // Settings
            board.style.visibility = "visible";
            document.getElementById("mini-title").style.visibility = "visible";
            board.style.background = 'url("images/dirt.png"), #00000088';
            board.style.backgroundSize = '75px';
            document.getElementById("settings-info").style.display = "unset";
            document.getElementById("how-to-play-info").style.display = "none";
        }
        else if (level === -2) { // How to play
            board.style.visibility = "visible";
            document.getElementById("mini-title").style.visibility = "visible";
            board.style.background = 'url("images/dirt.png"), #00000088';
            board.style.backgroundSize = '75px';
            document.getElementById("settings-info").style.display = "none";
            document.getElementById("how-to-play-info").style.display = "unset";
        }
        else if (level === -3) { // Dead

        }
        else if (level === -4) { // Win

        }
    }

    if (debug.showHitbox) {
        hitbox.style.backgroundColor = "#ff000080";
    }
    else {
        hitbox.style.backgroundColor = "transparent";
    }
}

function boxClick() {
    console.log("clicked")
    enemyHealth--
    boxObj.image = boxObj.image + ", #ff000060";
    let rotation = (Math.random() * 60) - 30;
    if (Math.abs(rotation) < 15) {
        if (rotation > 0) {
            rotation = 15
        }
        else {
            rotation = -15
        }
    }
    box.style.rotate = rotation + "deg";
    setTimeout(() => {
        boxObj.image = boxObj.image.replace(", #ff000060", "");
        box.style.rotate = "0deg";
    }, 100);
}

function boardClick() {
    if (level > 0) {
        console.log("misclicked")
        playerAttributes.health--
    }
}

function handleResize() {
    ClientWidth = window.innerWidth;
    ClientHeight = window.innerHeight;
    boardObj.left = (ClientWidth / 2) - (1500 / 2) - 5;
    boardObj.right = (ClientWidth / 2) + (1500 / 2) - 5;
    boardObj.top = (ClientHeight / 2) - (700 / 2) - 38;
    boardObj.bottom = (ClientHeight / 2) + (700 / 2) - 40;
}

function collisionCheck() {
    if (boxObj.x + boxObj.width > boardObj.right) {
        boxObj.x = boardObj.right - boxObj.width;
        boxObj.speedX *= -1;
    }
    else if (boxObj.x < boardObj.left) {
        boxObj.x = boardObj.left;
        boxObj.speedX *= -1;
    }
    if (boxObj.y + boxObj.height > boardObj.bottom) {
        boxObj.y = boardObj.bottom - boxObj.height;
        boxObj.speedY *= -1;
    }
    else if (boxObj.y < boardObj.top) {
        boxObj.y = boardObj.top;
        boxObj.speedY *= -1;
        if (levelData[level].pathType === "tan") {
            tanDirection *= -1;
        }
    }
}

function updateHearts() {
    if (playerAttributes.health % 2 === 0) {
        for (let i = playerAttributes.health / 2; i <= 9; i++) {
            document.getElementById(`heart${i}`).style.background = "url('images/empty_heart.png')";
        }
    }
    else {
        document.getElementById(`heart${(playerAttributes.health - 1) / 2}`).style.background = "url('images/half_heart.png')";
        for (let i = ((playerAttributes.health - 1) / 2) + 1; i <= 9; i++) {
            document.getElementById(`heart${i}`).style.background = "url('images/empty_heart.png')";
        }
    }
}

function updateXP() {
    if (playerAttributes.xpLevel === 0) {
        document.getElementById('xp-level').style.visibility = "hidden";
    }
    else {
        document.getElementById('xp-level').style.visibility = "visible";
        document.getElementById('xp-level').innerHTML = `${playerAttributes.xpLevel}`
    }

    if (playerAttributes.xpStored >= 18) {
        playerAttributes.xpLevel++;
        playerAttributes.xpStored -= 18;
    }

    playerAttributes.xpTotal = playerAttributes.xpStored + (playerAttributes.xpLevel * 18);

    document.getElementById('xp-filling').style.width = `${75 * 9 * 10/181 * playerAttributes.xpStored}px`;
}

function increaseLevel() {
    level++

    boxObj = levelData[level];
    enemyHealth = boxObj.maxEnemyHealth;
}

function setLevel(num) {
    level = num;
    if (level > 0) {
        boxObj = levelData[level];
        enemyHealth = boxObj.maxEnemyHealth;
    }
}

function setXpLevel(num) {
    playerAttributes.xpLevel = num;
}

document.addEventListener("keydown", (e) => {
    if (e.code === "F13") {
        debug.showHitbox = !debug.showHitbox;
    }
})