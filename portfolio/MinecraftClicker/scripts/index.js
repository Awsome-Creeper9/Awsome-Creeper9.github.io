///////////////////////////////////////
// STARTING VARIABLES / DECLARATIONS //
///////////////////////////////////////

let levelData;
let itemData;
let itemIds;
fetch("scripts/levelData.json").then(response => response.json()).then(data => {levelData = data;});
fetch("scripts/items.json").then(response => response.json()).then(data => {
    itemData = data;
    itemIds = [itemData["melee"]["swords"]["wood"], itemData["melee"]["swords"]["stone"], itemData["melee"]["swords"]["iron"], itemData["melee"]["swords"]["diamond"], itemData["melee"]["swords"]["netherite"], itemData["melee"]["axes"]["wood"], itemData["melee"]["axes"]["stone"], itemData["melee"]["axes"]["iron"], itemData["melee"]["axes"]["diamond"], itemData["melee"]["axes"]["netherite"], itemData["melee"]["pickaxes"]["wood"], itemData["melee"]["pickaxes"]["stone"], itemData["melee"]["pickaxes"]["iron"], itemData["melee"]["pickaxes"]["diamond"], itemData["melee"]["pickaxes"]["netherite"]]
});

// itemIds = [itemData["melee"]["swords"]["wood"], itemData["melee"]["swords"]["stone"], itemData["melee"]["swords"]["iron"], itemData["melee"]["swords"]["diamond"], itemData["melee"]["swords"]["netherite"], itemData["melee"]["axes"]["wood"], itemData["melee"]["axes"]["stone"], itemData["melee"]["axes"]["iron"], itemData["melee"]["axes"]["diamond"], itemData["melee"]["axes"]["netherite"], itemData["melee"]["pickaxes"]["wood"], itemData["melee"]["pickaxes"]["stone"], itemData["melee"]["pickaxes"]["iron"], itemData["melee"]["pickaxes"]["diamond"], itemData["melee"]["pickaxes"]["netherite"]]

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

boardObj.left = (ClientWidth / 2) - (1500 / 2);
boardObj.right = (ClientWidth / 2) + (1500 / 2);
boardObj.top = (ClientHeight / 2) - (700 / 2) - 38;
boardObj.bottom = (ClientHeight / 2) + (700 / 2) - 40;

let boxObj = {}

let enemyHealth = 20;

let tpTimer = 60;

let playerAttributes = {
    atkSpeed: 0, //normal (larger num == worse)
    atkDmg: 0, //normal (larger num == better)
    atkAOE: 0, //normal (larger num == better)
    currentCooldown: 0,
    health: 20,
    maxHealth: 20,
    xpStored: 0,
    xpLevel: 0,
    xpTotal: 0,
    selectedSlot: 0,
    emeralds: 0,
    inventory: new Array(9).fill("air")
}

let level = 0;

let debug = {
    showHitbox: false, //F13
}

let mousePos = [0, 0];

document.addEventListener("mousemove", (e) => {
    mousePos = [e.clientX, e.clientY];
})

/////////////////////
// UPDATE FUNCTION //
/////////////////////

setInterval(update, 1000 / 20)
function update() {
    handleResize()
    updateAtkAttributes()
    if (playerAttributes.currentCooldown > 0) {playerAttributes.currentCooldown--;}
    updateCooldownProgress()

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
            if (((Math.tan(boxObj.x / 100))/((1/20) * Math.cos(boxObj.x / 100))) + ((ClientHeight / 2) - 90) < boardObj.top) {
                boxObj.y = boardObj.top;
            }
            else if (((Math.tan(boxObj.x / 100))/((1/20) * Math.cos(boxObj.x / 100))) + ((ClientHeight / 2) - 90) > boardObj.bottom) {
                boxObj.y = boardObj.bottom - boxObj.height;
            }
            else if (!((Math.tan(boxObj.x / 100))/((1/20) * Math.cos(boxObj.x / 100))) + ((ClientHeight / 2) - 90)) {
                boxObj.y = ((Math.tan((boxObj.x-1) / 100))/((1/20) * Math.cos((boxObj.x-1) / 100))) + ((ClientHeight / 2) - 90)
            }
            else {
                boxObj.y = ((Math.tan(boxObj.x / 100))/((1/20) * Math.cos(boxObj.x / 100))) + ((ClientHeight / 2) - 90);
            }
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
            boxObj.x = (Math.cos(kCounter / 500) * 650) + ((ClientWidth / 2) - 50);
            boxObj.y = (Math.sin(kCounter / 100) * 280) + ((ClientHeight / 2) - 90);
            break;
        case "tp":
            boxObj.x += boxObj.speedX;
            boxObj.y += boxObj.speedY;
            tpTimer -= 1;
            if (tpTimer <= 0) {
                for (let i = 0; i < 10; i++) {
                    let element = document.createElement("div");
                    element.classList.add("tpParticle");
                    element.style.position = "absolute";
                    element.style.width = "25px";
                    element.style.height = "25px";
                    element.style.zIndex = "1000";
                    element.style.left = (Math.floor(Math.random() * boxObj.width) + boxObj.x - 12) + "px";
                    element.style.top = (Math.floor(Math.random() * boxObj.height) + boxObj.y - 12) + "px";
                    document.querySelector("body").appendChild(element);
                    element.style.background = "url('images/tp_particles/generic_7.png')";
                    element.style.backgroundSize = "100%";
                    element.style.backgroundRepeat = "no-repeat";

                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_6.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 100);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_5.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 200);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_4.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 300);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_3.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 400);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_2.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 500);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_1.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 600);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_0.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 700);
                    setTimeout(() => {element.remove();}, 800);
                }

                boxObj.x = Math.floor(Math.random() * (boardObj.right - boardObj.left)) + boardObj.left;
                boxObj.y = Math.floor(Math.random() * (boardObj.bottom - boardObj.top)) + boardObj.top;

                for (let i = 0; i < 10; i++) {
                    let element = document.createElement("div");
                    element.classList.add("tpParticle");
                    element.style.position = "absolute";
                    element.style.width = "25px";
                    element.style.height = "25px";
                    element.style.zIndex = "1000";
                    element.style.left = (Math.floor(Math.random() * boxObj.width) + boxObj.x - 12) + "px";
                    element.style.top = (Math.floor(Math.random() * boxObj.height) + boxObj.y - 12) + "px";
                    document.querySelector("body").appendChild(element);
                    element.style.background = "url('images/tp_particles/generic_7.png')";
                    element.style.backgroundSize = "100%";
                    element.style.backgroundRepeat = "no-repeat";

                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_6.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 100);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_5.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 200);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_4.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 300);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_3.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 400);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_2.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 500);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_1.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 600);
                    setTimeout(() => {element.style.background = "url('images/tp_particles/generic_0.png')"; element.style.backgroundSize = "100%"; element.style.backgroundRepeat = "no-repeat";}, 700);
                    setTimeout(() => {element.remove();}, 800);
                }

                tpTimer = Math.floor(Math.random() * 60) + 60; //3 - 6 seconds
            }
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
        playerAttributes.xpStored += boxObj.xpReward;
        playerAttributes.emeralds += boxObj.emeraldReward;
        increaseLevel();
    }

    if (boxObj.hasAutoAttack) {
        autoAttack();
    }

    updateHearts();

    updateEmeralds();

    updateXP();

    collisionCheck();

    if (level > 3) {
        document.getElementById("trade").style.visibility = "visible";
    }
    else {
        document.getElementById("trade").style.visibility = "hidden";
    }
    if (level > 12) {
        document.getElementById("enchant").style.visibility = "visible";
    }
    else {
        document.getElementById("enchant").style.visibility = "hidden";
    }

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
        board.style.background = `url("images/backgrounds/${boxObj.background}.png")`;

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
        if (level === -1) { // Settings
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
    if (playerAttributes.currentCooldown <= 0) {
        console.log("clicked")
        enemyHealth -= (playerAttributes.atkDmg == 0) ? 1 : playerAttributes.atkDmg;
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

        playerAttributes.currentCooldown = playerAttributes.atkSpeed;
    }
}

function boardClick() {
    if (playerAttributes.currentCooldown <= 0) {
        if (level > 0) {
            console.log("misclicked")
            playerAttributes.health -= boxObj.damage;
            playerAttributes.currentCooldown = playerAttributes.atkSpeed;
        }
    }
}

function autoAttack() {
    boxObj.currentAutoCooldown--;
    if (boxObj.currentAutoCooldown <= 0) {
        playerAttributes.health -= boxObj.autoDmg;
        boxObj.currentAutoCooldown = boxObj.autoAtkCooldown;
    }
}

function handleResize() {
    ClientWidth = window.innerWidth;
    ClientHeight = window.innerHeight;
    boardObj.left = (ClientWidth / 2) - (1500 / 2);
    boardObj.right = (ClientWidth / 2) + (1500 / 2);
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
        if (boxObj.pathType === "tan") {
            tanDirection *= -1;
        }
    }
}

function updateAtkAttributes() {
    let selectedItem = playerAttributes.inventory[playerAttributes.selectedSlot];
    playerAttributes.atkAOE = (selectedItem.atkAOE) ? selectedItem.atkAOE : 0;
    playerAttributes.atkDmg = (selectedItem.atkDmg) ? selectedItem.atkDmg : 0;
    playerAttributes.atkSpeed = (selectedItem.atkSpeed) ? selectedItem.atkSpeed : 0;
}

function updateCooldownProgress() {
    let bar = document.getElementById("cooldownProgress");
    bar.max = playerAttributes.atkSpeed;
    bar.value = playerAttributes.currentCooldown;
    if (playerAttributes.currentCooldown > 0) {
        bar.style.visibility = "visible";
        bar.style.left = (mousePos[0] + 15) + "px";
        bar.style.top = (mousePos[1] + 15) + "px";
    }
    else {
        bar.style.visibility = "hidden";
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

function updateEmeralds() {
    document.querySelector('#emerald-count > p').textContent = `${playerAttributes.emeralds}`

}

function hotbarSlotClick(num) {
    document.querySelectorAll(".hotbar-slot").forEach((element) => {
        element.style.background = "url('images/hotbar_slot.png')";
        element.style.scale = "100%";
        element.style.zIndex = "0";
    })
    document.getElementById(`slot${num}`).style.background = "url('images/selected_hotbar_slot.png')";
    document.getElementById(`slot${num}`).style.scale = "125%";
    document.getElementById(`slot${num}`).style.zIndex = "1";
    playerAttributes.selectedSlot = num;
}
hotbarSlotClick(0) //initial

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

function setItem(item, slot) {
    playerAttributes.inventory[slot] = itemIds[item];
    document.querySelector(`#slot${slot} > .item`).style.background = itemIds[item].sprite;
}

document.addEventListener("keydown", (e) => {
    if (e.code === "F13") {
        debug.showHitbox = !debug.showHitbox;
    }
})