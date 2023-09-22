let timeElapsed = 0,
    timeMinutes = 0,
    timeSeconds = 0,
    tagCooldown = 0;

let player1Info = {
    x: 0 + 10,
    y: 0 + 10,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false
}
let player2Info = {
    x: 1263 + 10,
    y: 625 + 10,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false
}

let startingPlayer = Math.round(Math.random())
if (startingPlayer === 0) {
    player1Info.tagged = true
}
else if (startingPlayer === 1) {
    player2Info.tagged = true
}

document.addEventListener("keydown", (e) => {
    if (e.key === 'w' && player1Info.direction !== "down") {
        player1Info.speedy = -10;
        player1Info.direction = "up";
    }
    if (e.key === 's' && player1Info.direction !== "up") {
        player1Info.speedy = 10;
        player1Info.direction = "down";
    }
    if (e.key === 'a' && player1Info.direction !== "right") {
        player1Info.speedx = -10;
        player1Info.direction = "left";
    }
    if (e.key === 'd' && player1Info.direction !== "left") {
        player1Info.speedx = 10;
        player1Info.direction = "right";
    }
    if (e.code=== 'ShiftLeft' && player1Info.dashCooldown === 0) {
        if (player1Info.direction === "up") {
            player1Info.speedy -= 10;
            player1Info.dashCooldown = 10;
            setTimeout(() => {player1Info.speedy += 10;}, 500)
        }
        if (player1Info.direction === "down") {
            player1Info.speedy += 10;
            player1Info.dashCooldown = 10;
            setTimeout(() => {player1Info.speedy -= 10;}, 500)
        }
        if (player1Info.direction === "left") {
            player1Info.speedx -= 10;
            player1Info.dashCooldown = 10;
            setTimeout(() => {player1Info.speedx += 10;}, 500)
        }
        if (player1Info.direction === "right") {
            player1Info.speedx += 10;
            player1Info.dashCooldown = 10;
            setTimeout(() => {player1Info.speedx -= 10;}, 500)
        }
    }

    if (e.key === 'ArrowUp' && player2Info.direction !== "down") {
        player2Info.speedy = -10;
        player2Info.direction = "up";
    }
    if (e.key === 'ArrowDown' && player2Info.direction !== "up") {
        player2Info.speedy = 10;
        player2Info.direction = "down";
    }
    if (e.key === 'ArrowLeft' && player2Info.direction !== "right") {
        player2Info.speedx = -10;
        player2Info.direction = "left";
    }
    if (e.key === 'ArrowRight' && player2Info.direction !== "left") {
        player2Info.speedx = 10;
        player2Info.direction = "right";
    }
    if (e.code=== 'ShiftRight' && player2Info.dashCooldown === 0) {
        if (player2Info.direction === "up") {
            player2Info.speedy -= 10;
            player2Info.dashCooldown = 10;
            setTimeout(() => {player2Info.speedy += 10;}, 500)
        }
        if (player2Info.direction === "down") {
            player2Info.speedy += 10;
            player2Info.dashCooldown = 10;
            setTimeout(() => {player2Info.speedy -= 10;}, 500)
        }
        if (player2Info.direction === "left") {
            player2Info.speedx -= 10;
            player2Info.dashCooldown = 10;
            setTimeout(() => {player2Info.speedx += 10;}, 500)
        }
        if (player2Info.direction === "right") {
            player2Info.speedx += 10;
            player2Info.dashCooldown = 10;
            setTimeout(() => {player2Info.speedx -= 10;}, 500)
        }
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key === 'w') {
        player1Info.speedy = 0;
        setTimeout(() => {player1Info.direction = ""}, 2000)
    }
    if (e.key === 's') {
        player1Info.speedy = 0;
        setTimeout(() => {player1Info.direction = ""}, 2000)
    }
    if (e.key === 'a') {
        player1Info.speedx = 0;
        setTimeout(() => {player1Info.direction = ""}, 2000)
    }
    if (e.key === 'd') {
        player1Info.speedx = 0;
        setTimeout(() => {player1Info.direction = ""}, 2000)
    }

    if (e.key === 'ArrowUp') {
        player2Info.speedy = 0;
        setTimeout(() => {player2Info.direction = ""}, 2000)
    }
    if (e.key === 'ArrowDown') {
        player2Info.speedy = 0;
        setTimeout(() => {player2Info.direction = ""}, 2000)
    }
    if (e.key === 'ArrowLeft') {
        player2Info.speedx = 0;
        setTimeout(() => {player2Info.direction = ""}, 2000)
    }
    if (e.key === 'ArrowRight') {
        player2Info.speedx = 0;
        setTimeout(() => {player2Info.direction = ""}, 2000)
    }
})

setInterval( () => {
    player1Info.dashCooldown = (player1Info.dashCooldown > 0) ? player1Info.dashCooldown - 1 : 0;
    player2Info.dashCooldown = (player2Info.dashCooldown > 0) ? player2Info.dashCooldown - 1 : 0;
    tagCooldown = (tagCooldown > 0) ? tagCooldown - 1 : 0;
    document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds";
    document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds";
    document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

    timeElapsed += 1;
    if (timeElapsed > 60) {
        timeMinutes = Math.floor(timeElapsed / 60);
        timeSeconds = timeElapsed % 60;
    }
    else {
        timeSeconds = timeElapsed;
    }

    if (timeSeconds < 10) {
        timeSeconds = "0" + timeSeconds;
    }

    document.getElementById("time").innerHTML = "Time Elapsed: " + timeMinutes + ":" + timeSeconds

}, 1000)

setInterval(update, 1000/50)

function update() {
    player1Info.x += player1Info.speedx;
    player1Info.y += player1Info.speedy;
    player2Info.x += player2Info.speedx;
    player2Info.y += player2Info.speedy;

    document.getElementById("player1").style.top = player1Info.y + "px";
    document.getElementById("player1").style.left = player1Info.x + "px";
    document.getElementById("player2").style.left = player2Info.x + "px";
    document.getElementById("player2").style.top = player2Info.y + "px";

    if (player1Info.x < 0 + 10) {
        player1Info.x = 0 + 10;
    }
    if (player1Info.x > 1313 - 50 + 10) {
        player1Info.x = 1313 - 50 + 10;
    }
    if (player1Info.y < 0 + 10) {
        player1Info.y = 0 + 10;
    }
    if (player1Info.y > 675 - 50 + 10) {
        player1Info.y = 675 - 50 + 10;
    }

    if (player2Info.x < 0 + 10) {
        player2Info.x = 0 + 10;
    }
    if (player2Info.x > 1313 - 50 + 10) {
        player2Info.x = 1313 - 50 + 10;
    }
    if (player2Info.y < 0 + 10) {
        player2Info.y = 0 + 10;
    }
    if (player2Info.y > 675 - 50 + 10) {
        player2Info.y = 675 - 50 + 10;
    }

    if ((player1Info.x < player2Info.x + 50) && (player1Info.x + 50 > player2Info.x) && (player1Info.y < player2Info.y + 50) && (player1Info.y + 50 > player2Info.y)) {
        if (player1Info.tagged && tagCooldown === 0) {
            player2Info.tagged = true;
            player1Info.tagged = false;
            tagCooldown = 5;
        }
        else if (player2Info.tagged && tagCooldown === 0) {
            player1Info.tagged = true;
            player2Info.tagged = false;
            tagCooldown = 5;
        }
    }

    if (player1Info.tagged) {
        document.getElementById("player1Info").innerHTML = "Player 1 (Tagged):";
        document.getElementById("player2Info").innerHTML = "Player 2:";
        document.getElementById('player1').style.background = '#ff0000';
        document.getElementById('player2').style.background = '#ff8000';
    }
    if (player2Info.tagged) {
        document.getElementById("player2Info").innerHTML = "Player 2 (Tagged):";
        document.getElementById("player1Info").innerHTML = "Player 1:";
        document.getElementById('player2').style.background = '#ff0000';
        document.getElementById('player1').style.background = '#0000ff';
    }
}