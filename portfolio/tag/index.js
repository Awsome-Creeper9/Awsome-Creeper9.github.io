let timeElapsed = 0,
    timeMinutes = 0,
    timeSeconds = 0,
    tagCooldown = 0,
    paused = true,
    gameTimeSeconds = 0,
    gameTimeMinutes = 0,
    tagTimer = -1;

let settings = {
    gameType: "Freeplay",
    gameTimeLimit: 120,
    tagCooldown: 3,
    dashCooldown: 10,
    edgeBehavior: "Wall",
    playerSpeed: 10,
    players: ["player", "player", "off", "off"],
    totalPlayerCount: 0,
}

let player1Info = {
    x: 10 + 250,
    y: 10 + 200,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false,
    totalTagTime: 0,
    totalTagMinutes: 0,
    totalTagSeconds: 0
}
let player2Info = {
    x: 1313 - 290,
    y: 675 - 240,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false,
    totalTagTime: 0,
    totalTagMinutes: 0,
    totalTagSeconds: 0
}
let player3Info = {
    x: 1313 - 290,
    y: 10 + 200,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false,
    totalTagTime: 0,
    totalTagMinutes: 0,
    totalTagSeconds: 0
}
let player4Info = {
    x: 10 + 250,
    y: 675 - 240,
    speedx: 0,
    speedy: 0,
    direction: "",
    dashCooldown: 0,
    tagged: false,
    totalTagTime: 0,
    totalTagMinutes: 0,
    totalTagSeconds: 0
}

function startPlayer() {
    let startingPlayer;
    for (let i of settings.players) {
        settings.totalPlayerCount = (i !== "off") ? settings.totalPlayerCount + 1 : settings.totalPlayerCount
    }
    startingPlayer = Math.floor(Math.random() * settings.totalPlayerCount);
    (startingPlayer === 0) && (player1Info.tagged = true);
    (startingPlayer === 1) && (player2Info.tagged = true);
    (startingPlayer === 2) && (player3Info.tagged = true);
    (startingPlayer === 3) && (player4Info.tagged = true);
}
startPlayer()

document.addEventListener("keydown", (e) => {
    if (e.code === 'KeyW' && !paused) {
        player1Info.speedy = -1 * settings.playerSpeed;
        player1Info.direction = "up";
    }
    if (e.code === 'KeyS' && !paused) {
        player1Info.speedy = settings.playerSpeed;
        player1Info.direction = "down";
    }
    if (e.code === 'KeyA' && !paused) {
        player1Info.speedx = -1 * settings.playerSpeed;
        player1Info.direction = "left";
    }
    if (e.code === 'KeyD' && !paused) {
        player1Info.speedx = settings.playerSpeed;
        player1Info.direction = "right";
    }
    if (e.code === 'ShiftLeft' && player1Info.dashCooldown === 0 && !paused) {
        if (player1Info.direction === "up") {
            player1Info.speedy -= settings.playerSpeed;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedy += settings.playerSpeed;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "down") {
            player1Info.speedy += settings.playerSpeed;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedy -= settings.playerSpeed;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "left") {
            player1Info.speedx -= settings.playerSpeed;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedx += settings.playerSpeed;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "right") {
            player1Info.speedx += settings.playerSpeed;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedx -= settings.playerSpeed;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
    }

    if (e.code === 'ArrowUp' && !paused) {
        player2Info.speedy = -1 * settings.playerSpeed;
        player2Info.direction = "up";
    }
    if (e.code === 'ArrowDown' && !paused) {
        player2Info.speedy = settings.playerSpeed;
        player2Info.direction = "down";
    }
    if (e.code === 'ArrowLeft' && !paused) {
        player2Info.speedx = -1 * settings.playerSpeed;
        player2Info.direction = "left";
    }
    if (e.code === 'ArrowRight' && !paused) {
        player2Info.speedx = settings.playerSpeed;
        player2Info.direction = "right";
    }
    if (e.code === 'ShiftRight' && player2Info.dashCooldown === 0 && !paused) {
        if (player2Info.direction === "up") {
            player2Info.speedy -= settings.playerSpeed;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedy += settings.playerSpeed;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "down") {
            player2Info.speedy += settings.playerSpeed;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedy -= settings.playerSpeed;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "left") {
            player2Info.speedx -= settings.playerSpeed;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedx += settings.playerSpeed;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "right") {
            player2Info.speedx += settings.playerSpeed;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedx -= settings.playerSpeed;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
    }
    if (e.code === 'KeyI' && !paused) {
        player3Info.speedy = -1 * settings.playerSpeed;
        player3Info.direction = "up";
    }
    if (e.code === 'KeyK' && !paused) {
        player3Info.speedy = settings.playerSpeed;
        player3Info.direction = "down";
    }
    if (e.code === 'KeyJ' && !paused) {
        player3Info.speedx = -1 * settings.playerSpeed;
        player3Info.direction = "left";
    }
    if (e.code === 'KeyL' && !paused) {
        player3Info.speedx = settings.playerSpeed;
        player3Info.direction = "right";
    }
    if (e.code === 'Space' && player3Info.dashCooldown === 0 && !paused) {
        if (player3Info.direction === "up") {
            player3Info.speedy -= settings.playerSpeed;
            player3Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player3Info.speedy += settings.playerSpeed;}, 500)
            document.getElementById("p3Cooldown").innerHTML = "Dash Cooldown: " + player3Info.dashCooldown + " seconds"
        }
        if (player3Info.direction === "down") {
            player3Info.speedy += settings.playerSpeed;
            player3Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player3Info.speedy -= settings.playerSpeed;}, 500)
            document.getElementById("p3Cooldown").innerHTML = "Dash Cooldown: " + player3Info.dashCooldown + " seconds"
        }
        if (player3Info.direction === "left") {
            player3Info.speedx -= settings.playerSpeed;
            player3Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player3Info.speedx += settings.playerSpeed;}, 500)
            document.getElementById("p3Cooldown").innerHTML = "Dash Cooldown: " + player3Info.dashCooldown + " seconds"
        }
        if (player3Info.direction === "right") {
            player3Info.speedx += settings.playerSpeed;
            player3Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player3Info.speedx -= settings.playerSpeed;}, 500)
            document.getElementById("p3Cooldown").innerHTML = "Dash Cooldown: " + player3Info.dashCooldown + " seconds"
        }
    }
    if (e.code === 'Numpad8' && !paused) {
        player4Info.speedy = -1 * settings.playerSpeed;
        player4Info.direction = "up";
    }
    if (e.code === 'Numpad5' && !paused) {
        player4Info.speedy = settings.playerSpeed;
        player4Info.direction = "down";
    }
    if (e.code === 'Numpad4' && !paused) {
        player4Info.speedx = -1 * settings.playerSpeed;
        player4Info.direction = "left";
    }
    if (e.code === 'Numpad6' && !paused) {
        player4Info.speedx = settings.playerSpeed;
        player4Info.direction = "right";
    }
    if (e.code === 'Numpad0' && player4Info.dashCooldown === 0 && !paused) {
        if (player4Info.direction === "up") {
            player4Info.speedy -= settings.playerSpeed;
            player4Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player4Info.speedy += settings.playerSpeed;}, 500)
            document.getElementById("p4Cooldown").innerHTML = "Dash Cooldown: " + player4Info.dashCooldown + " seconds"
        }
        if (player4Info.direction === "down") {
            player4Info.speedy += settings.playerSpeed;
            player4Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player4Info.speedy -= settings.playerSpeed;}, 500)
            document.getElementById("p4Cooldown").innerHTML = "Dash Cooldown: " + player4Info.dashCooldown + " seconds"
        }
        if (player4Info.direction === "left") {
            player4Info.speedx -= settings.playerSpeed;
            player4Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player4Info.speedx += settings.playerSpeed;}, 500)
            document.getElementById("p4Cooldown").innerHTML = "Dash Cooldown: " + player4Info.dashCooldown + " seconds"
        }
        if (player4Info.direction === "right") {
            player4Info.speedx += settings.playerSpeed;
            player4Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player4Info.speedx -= settings.playerSpeed;}, 500)
            document.getElementById("p4Cooldown").innerHTML = "Dash Cooldown: " + player4Info.dashCooldown + " seconds"
        }
    }
    if (e.code === 'Escape') {
        if (!paused) {
            settingsOpen();
        }
        else {
            unpause()
        }
    }
})

document.addEventListener("keyup", (e) => {
    if (e.code === 'KeyW' && player1Info.direction !== "down") {
        player1Info.speedy = 0;
        player1Info.direction = ""
    }
    if (e.code === 'KeyS' && player1Info.direction !== "up") {
        player1Info.speedy = 0;
        player1Info.direction = ""
    }
    if (e.code === 'KeyA' && player1Info.direction !== "right") {
        player1Info.speedx = 0;
        player1Info.direction = ""
    }
    if (e.code === 'KeyD' && player1Info.direction !== "left") {
        player1Info.speedx = 0;
        player1Info.direction = ""
    }

    if (e.code === 'ArrowUp' && player2Info.direction !== "down") {
        player2Info.speedy = 0;
        player2Info.direction = ""
    }
    if (e.code === 'ArrowDown' && player2Info.direction !== "up") {
        player2Info.speedy = 0;
        player2Info.direction = ""
    }
    if (e.code === 'ArrowLeft' && player2Info.direction !== "right") {
        player2Info.speedx = 0;
        player2Info.direction = ""
    }
    if (e.code === 'ArrowRight' && player2Info.direction !== "left") {
        player2Info.speedx = 0;
        player2Info.direction = ""
    }

    if (e.code === 'KeyI' && player3Info.direction !== "down") {
        player3Info.speedy = 0;
        player3Info.direction = ""
    }
    if (e.code === 'KeyK' && player3Info.direction !== "up") {
        player3Info.speedy = 0;
        player3Info.direction = ""
    }
    if (e.code === 'KeyJ' && player3Info.direction !== "right") {
        player3Info.speedx = 0;
        player3Info.direction = ""
    }
    if (e.code === 'KeyL' && player3Info.direction !== "left") {
        player3Info.speedx = 0;
        player3Info.direction = ""
    }

    if (e.code === 'Numpad8' && player4Info.direction !== "down") {
        player4Info.speedy = 0;
        player4Info.direction = ""
    }
    if (e.code === 'Numpad5' && player4Info.direction !== "up") {
        player4Info.speedy = 0;
        player4Info.direction = ""
    }
    if (e.code === 'Numpad4' && player4Info.direction !== "right") {
        player4Info.speedx = 0;
        player4Info.direction = ""
    }
    if (e.code === 'Numpad6' && player4Info.direction !== "left") {
        player4Info.speedx = 0;
        player4Info.direction = ""
    }
})

setInterval( () => {
    if (!paused) {player1Info.dashCooldown = (player1Info.dashCooldown > 0) ? player1Info.dashCooldown - 1 : 0;}
    if (!paused) {player2Info.dashCooldown = (player2Info.dashCooldown > 0) ? player2Info.dashCooldown - 1 : 0;}
    if (!paused) {player3Info.dashCooldown = (player3Info.dashCooldown > 0) ? player3Info.dashCooldown - 1 : 0;}
    if (!paused) {player4Info.dashCooldown = (player4Info.dashCooldown > 0) ? player4Info.dashCooldown - 1 : 0;}
    if (!paused) {tagCooldown = (tagCooldown > 0) ? tagCooldown - 1 : 0;}
    document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds";
    document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds";
    document.getElementById("p3Cooldown").innerHTML = "Dash Cooldown: " + player3Info.dashCooldown + " seconds";
    document.getElementById("p4Cooldown").innerHTML = "Dash Cooldown: " + player4Info.dashCooldown + " seconds";
    document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

    if (!paused) {
        timeElapsed += 1;
    }
    if (timeElapsed >= 60) {
        timeMinutes = Math.floor(timeElapsed / 60);
        timeSeconds = timeElapsed % 60;
    }
    else {
        timeMinutes = 0;
        timeSeconds = timeElapsed;
    }

    if (timeSeconds < 10) {
        timeSeconds = "0" + timeSeconds;
    }

    document.getElementById("time").innerHTML = "Time Elapsed: " + timeMinutes + ":" + timeSeconds

    if (player1Info.tagged === true && !paused) {
        player1Info.totalTagTime++
    }

    if (player1Info.totalTagTime >= 60) {
        player1Info.totalTagMinutes = Math.floor(player1Info.totalTagTime / 60);
        player1Info.totalTagSeconds = player1Info.totalTagTime % 60;
    }
    else {
        player1Info.totalTagMinutes = 0;
        player1Info.totalTagSeconds = player1Info.totalTagTime;
    }

    if (player1Info.totalTagSeconds < 10) {
        player1Info.totalTagSeconds = "0" + player1Info.totalTagSeconds;
    }

    if (player2Info.tagged === true && !paused) {
        player2Info.totalTagTime++
    }

    if (player2Info.totalTagTime >= 60) {
        player2Info.totalTagMinutes = Math.floor(player2Info.totalTagTime / 60);
        player2Info.totalTagSeconds = player2Info.totalTagTime % 60;
    }
    else {
        player2Info.totalTagMinutes = 0;
        player2Info.totalTagSeconds = player2Info.totalTagTime;
    }

    if (player2Info.totalTagSeconds < 10) {
        player2Info.totalTagSeconds = "0" + player2Info.totalTagSeconds;
    }

    if (player3Info.tagged === true && !paused) {
        player3Info.totalTagTime++
    }

    if (player3Info.totalTagTime >= 60) {
        player3Info.totalTagMinutes = Math.floor(player3Info.totalTagTime / 60);
        player3Info.totalTagSeconds = player3Info.totalTagTime % 60;
    }
    else {
        player3Info.totalTagMinutes = 0;
        player3Info.totalTagSeconds = player3Info.totalTagTime;
    }

    if (player3Info.totalTagSeconds < 10) {
        player3Info.totalTagSeconds = "0" + player3Info.totalTagSeconds;
    }

    if (player4Info.tagged === true && !paused) {
        player4Info.totalTagTime++
    }

    if (player4Info.totalTagTime >= 60) {
        player4Info.totalTagMinutes = Math.floor(player4Info.totalTagTime / 60);
        player4Info.totalTagSeconds = player4Info.totalTagTime % 60;
    }
    else {
        player4Info.totalTagMinutes = 0;
        player4Info.totalTagSeconds = player4Info.totalTagTime;
    }

    if (player4Info.totalTagSeconds < 10) {
        player4Info.totalTagSeconds = "0" + player4Info.totalTagSeconds;
    }

    document.getElementById('p1TagTime').innerHTML = "Total Time Tagged: " + player1Info.totalTagMinutes + ":" + player1Info.totalTagSeconds;
    document.getElementById('p2TagTime').innerHTML = "Total Time Tagged: " + player2Info.totalTagMinutes + ":" + player2Info.totalTagSeconds;
    document.getElementById('p3TagTime').innerHTML = "Total Time Tagged: " + player3Info.totalTagMinutes + ":" + player3Info.totalTagSeconds;
    document.getElementById('p4TagTime').innerHTML = "Total Time Tagged: " + player4Info.totalTagMinutes + ":" + player4Info.totalTagSeconds;

    if (settings.gameType === "Time Limited") {
        if (timeElapsed >= settings.gameTimeLimit) {
            if(player1Info.tagged) {
                alert(`Game Over!\nPlayer 1 Loses!`)
            }
            else if (player2Info.tagged) {
                alert(`Game Over!\nPlayer 2 Loses!`)
            }
            else if (player3Info.tagged) {
                alert(`Game Over!\nPlayer 3 Loses!`)
            }
            else if (player4Info.tagged) {
                alert(`Game Over!\nPlayer 4 Loses!`)
            }
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            document.getElementById("menu").style.visibility = "visible";
        }
        if (settings.gameTimeLimit >= 60) {
            gameTimeMinutes = Math.floor(settings.gameTimeLimit / 60);
            gameTimeSeconds = settings.gameTimeLimit % 60;
        }
        else {
            gameTimeMinutes = 0;
            gameTimeSeconds = settings.gameTimeLimit;
        }
        if (gameTimeSeconds < 10) {
            gameTimeSeconds = "0" + gameTimeSeconds;
        }
        document.getElementById("time").innerHTML = "Time Elapsed: " + timeMinutes + ":" + timeSeconds + "/" + gameTimeMinutes + ":" + gameTimeSeconds;
    }

    if (settings.gameType === "Tag Time Limited") {

        if (player1Info.totalTagTime >= settings.gameTimeLimit) {
            alert(`Game Over!\nPlayer 1 Loses!`)
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            document.getElementById("menu").style.visibility = "visible";
        }
        if (player2Info.totalTagTime >= settings.gameTimeLimit) {
            alert(`Game Over!\nPlayer 2 Loses!`)
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            document.getElementById("menu").style.visibility = "visible";
        }
        if (player3Info.totalTagTime >= settings.gameTimeLimit) {
            alert(`Game Over!\nPlayer 3 Loses!`)
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            document.getElementById("menu").style.visibility = "visible";
        }
        if (player4Info.totalTagTime >= settings.gameTimeLimit) {
            alert(`Game Over!\nPlayer 4 Loses!`)
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            document.getElementById("menu").style.visibility = "visible";
        }
        if (settings.gameTimeLimit >= 60) {
            gameTimeMinutes = Math.floor(settings.gameTimeLimit / 60);
            gameTimeSeconds = settings.gameTimeLimit % 60;
        }
        else {
            gameTimeMinutes = 0;
            gameTimeSeconds = settings.gameTimeLimit;
        }
        if (gameTimeSeconds < 10) {
            gameTimeSeconds = "0" + gameTimeSeconds;
        }
        document.getElementById('p1TagTime').innerHTML = "Total Time Tagged: " + player1Info.totalTagMinutes + ":" + player1Info.totalTagSeconds + "/" + gameTimeMinutes + ":" + gameTimeSeconds;
        document.getElementById('p2TagTime').innerHTML = "Total Time Tagged: " + player2Info.totalTagMinutes + ":" + player2Info.totalTagSeconds + "/" + gameTimeMinutes + ":" + gameTimeSeconds;
    }

    if (settings.gameType === "Tag Timer") {
        document.getElementById('tagTimer').style.visibility = "visible";
        document.getElementById('sideDisplay').style.height= "210px";
        if (tagTimer < 0 || document.getElementById('gameTypeTime').value) {tagTimer = settings.gameTimeLimit}

        if (!paused && tagTimer > 0) {tagTimer--;}
        if (tagTimer <= 0) {
            if (player1Info.tagged) {
                alert(`Game Over!\nPlayer 1 Loses!`)
            }
            if (player2Info.tagged) {
                alert(`Game Over!\nPlayer 2 Loses!`)
            }
            if (player3Info.tagged) {
                alert(`Game Over!\nPlayer 3 Loses!`)
            }
            if (player4Info.tagged) {
                alert(`Game Over!\nPlayer 4 Loses!`)
            }
            paused = true;
            timeElapsed = 0;
            player1Info.totalTagTime = 0;
            player2Info.totalTagTime = 0;
            player3Info.totalTagTime = 0;
            player4Info.totalTagTime = 0;
            tagTimer = settings.gameTimeLimit
            document.getElementById("menu").style.visibility = "visible";
        }

        if (tagTimer >= 60) {
            gameTimeMinutes = Math.floor(tagTimer / 60);
            gameTimeSeconds = tagTimer % 60;
        }
        else {
            gameTimeMinutes = 0;
            gameTimeSeconds = tagTimer;
        }
        if (gameTimeSeconds < 10) {
            gameTimeSeconds = "0" + gameTimeSeconds;
        }

        document.getElementById('tagTimer').innerHTML = "Tag Timer: " + gameTimeMinutes + ":" + gameTimeSeconds
    }
    else {
        document.getElementById('tagTimer').style.visibility = "hidden";
        document.getElementById('sideDisplay').style.height= "180px";
    }

}, 1000)

setInterval(update, 1000/50)

function update() {
    if (settings.players[2] === "off") {
        document.getElementById("player3").style.visibility = "hidden"
        document.getElementById('p3Display').style.visibility = "hidden"
    }
    else {
        document.getElementById("player3").style.visibility = "visible"
        document.getElementById('p3Display').style.visibility = "visible"
    }
    if (settings.players[3] === "off") {
        document.getElementById("player4").style.visibility = "hidden"
        document.getElementById('p4Display').style.visibility = "hidden"
    }
    else {
        document.getElementById("player4").style.visibility = "visible"
        document.getElementById('p4Display').style.visibility = "visible"
    }
    player1Info.x += player1Info.speedx;
    player1Info.y += player1Info.speedy;
    player2Info.x += player2Info.speedx;
    player2Info.y += player2Info.speedy;
    player3Info.x += player3Info.speedx;
    player3Info.y += player3Info.speedy;
    player4Info.x += player4Info.speedx;
    player4Info.y += player4Info.speedy;

    document.getElementById("player1").style.top = player1Info.y + "px";
    document.getElementById("player1").style.left = player1Info.x + "px";
    document.getElementById("player2").style.left = player2Info.x + "px";
    document.getElementById("player2").style.top = player2Info.y + "px";
    document.getElementById("player3").style.left = player3Info.x + "px";
    document.getElementById("player3").style.top = player3Info.y + "px";
    document.getElementById("player4").style.left = player4Info.x + "px";
    document.getElementById("player4").style.top = player4Info.y + "px";

    if (settings.edgeBehavior === "Wrap") {
        if (player1Info.x < 0 + 10) {
            player1Info.x = 1313 - 50 + 10;
        }
        if (player1Info.x > 1313 - 50 + 10) {
            player1Info.x = 0 + 10;
        }
        if (player1Info.y < 0 + 10) {
            player1Info.y = 675 - 50 + 10;
        }
        if (player1Info.y > 675 - 50 + 10) {
            player1Info.y = 0 + 10;
        }

        if (player2Info.x < 0 + 10) {
            player2Info.x = 1313 - 50 + 10;
        }
        if (player2Info.x > 1313 - 50 + 10) {
            player2Info.x = 0 + 10;
        }
        if (player2Info.y < 0 + 10) {
            player2Info.y = 675 - 50 + 10;
        }
        if (player2Info.y > 675 - 50 + 10) {
            player2Info.y = 0 + 10;
        }

        if (player3Info.x < 0 + 10) {
            player3Info.x = 1313 - 50 + 10;
        }
        if (player3Info.x > 1313 - 50 + 10) {
            player3Info.x = 0 + 10;
        }
        if (player3Info.y < 0 + 10) {
            player3Info.y = 675 - 50 + 10;
        }
        if (player3Info.y > 675 - 50 + 10) {
            player3Info.y = 0 + 10;
        }

        if (player4Info.x < 0 + 10) {
            player4Info.x = 1313 - 50 + 10;
        }
        if (player4Info.x > 1313 - 50 + 10) {
            player4Info.x = 0 + 10;
        }
        if (player4Info.y < 0 + 10) {
            player4Info.y = 675 - 50 + 10;
        }
        if (player4Info.y > 675 - 50 + 10) {
            player4Info.y = 0 + 10;
        }
    }
    else {
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

        if (player3Info.x < 0 + 10) {
            player3Info.x = 0 + 10;
        }
        if (player3Info.x > 1313 - 50 + 10) {
            player3Info.x = 1313 - 50 + 10;
        }
        if (player3Info.y < 0 + 10) {
            player3Info.y = 0 + 10;
        }
        if (player3Info.y > 675 - 50 + 10) {
            player3Info.y = 675 - 50 + 10;
        }

        if (player4Info.x < 0 + 10) {
            player4Info.x = 0 + 10;
        }
        if (player4Info.x > 1313 - 50 + 10) {
            player4Info.x = 1313 - 50 + 10;
        }
        if (player4Info.y < 0 + 10) {
            player4Info.y = 0 + 10;
        }
        if (player4Info.y > 675 - 50 + 10) {
            player4Info.y = 675 - 50 + 10;
        }
    }

    if ((player1Info.x < player2Info.x + 50) && (player1Info.x + 50 > player2Info.x) && (player1Info.y < player2Info.y + 50) && (player1Info.y + 50 > player2Info.y)) {
        if (player1Info.tagged && tagCooldown === 0) {
            player2Info.tagged = true;
            player1Info.tagged = false;
            player1Info.dashCooldown = 0;
            tagCooldown = settings.tagCooldown;
            document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

            if (settings.gameType === "Tag Timer") {
                tagTimer = settings.gameTimeLimit
            }
        }
        else if (player2Info.tagged && tagCooldown === 0) {
            player1Info.tagged = true;
            player2Info.tagged = false;
            player2Info.dashCooldown = 0;
            tagCooldown = settings.tagCooldown;
            document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

            if (settings.gameType === "Tag Timer") {
                tagTimer = settings.gameTimeLimit
            }
        }
    }
    if (settings.players[2] !== "off") {
        if ((player1Info.x < player3Info.x + 50) && (player1Info.x + 50 > player3Info.x) && (player1Info.y < player3Info.y + 50) && (player1Info.y + 50 > player3Info.y)) {
            if (player1Info.tagged && tagCooldown === 0) {
                player3Info.tagged = true;
                player1Info.tagged = false;
                player1Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            } else if (player3Info.tagged && tagCooldown === 0) {
                player1Info.tagged = true;
                player3Info.tagged = false;
                player3Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
        }
        if ((player3Info.x < player2Info.x + 50) && (player3Info.x + 50 > player2Info.x) && (player3Info.y < player2Info.y + 50) && (player3Info.y + 50 > player2Info.y)) {
            if (player3Info.tagged && tagCooldown === 0) {
                player2Info.tagged = true;
                player3Info.tagged = false;
                player3Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
            else if (player2Info.tagged && tagCooldown === 0) {
                player3Info.tagged = true;
                player2Info.tagged = false;
                player2Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
        }
        if (settings.players[3] !== "off") {
            if ((player3Info.x < player4Info.x + 50) && (player3Info.x + 50 > player4Info.x) && (player3Info.y < player4Info.y + 50) && (player3Info.y + 50 > player4Info.y)) {
                if (player3Info.tagged && tagCooldown === 0) {
                    player4Info.tagged = true;
                    player3Info.tagged = false;
                    player3Info.dashCooldown = 0;
                    tagCooldown = settings.tagCooldown;
                    document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                    if (settings.gameType === "Tag Timer") {
                        tagTimer = settings.gameTimeLimit
                    }
                }
                else if (player4Info.tagged && tagCooldown === 0) {
                    player3Info.tagged = true;
                    player4Info.tagged = false;
                    player4Info.dashCooldown = 0;
                    tagCooldown = settings.tagCooldown;
                    document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                    if (settings.gameType === "Tag Timer") {
                        tagTimer = settings.gameTimeLimit
                    }
                }
            }
        }
    }
    if (settings.players[3] !== "off") {
        if ((player1Info.x < player4Info.x + 50) && (player1Info.x + 50 > player4Info.x) && (player1Info.y < player4Info.y + 50) && (player1Info.y + 50 > player4Info.y)) {
            if (player1Info.tagged && tagCooldown === 0) {
                player4Info.tagged = true;
                player1Info.tagged = false;
                player1Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
            else if (player4Info.tagged && tagCooldown === 0) {
                player1Info.tagged = true;
                player4Info.tagged = false;
                player4Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
        }
        if ((player4Info.x < player2Info.x + 50) && (player4Info.x + 50 > player2Info.x) && (player4Info.y < player2Info.y + 50) && (player4Info.y + 50 > player2Info.y)) {
            if (player4Info.tagged && tagCooldown === 0) {
                player2Info.tagged = true;
                player4Info.tagged = false;
                player4Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
            else if (player2Info.tagged && tagCooldown === 0) {
                player4Info.tagged = true;
                player2Info.tagged = false;
                player2Info.dashCooldown = 0;
                tagCooldown = settings.tagCooldown;
                document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";

                if (settings.gameType === "Tag Timer") {
                    tagTimer = settings.gameTimeLimit
                }
            }
        }
    }

    if (player1Info.tagged) {
        document.getElementById("player1Tag").style.visibility = "visible";
        document.getElementById("player2Tag").style.visibility = "hidden";
        document.getElementById("player3Tag").style.visibility = "hidden";
        document.getElementById("player4Tag").style.visibility = "hidden";
        document.getElementById('player1').style.background = '#ff0000';
        document.getElementById('player2').style.background = '#cccc00';
        document.getElementById('player3').style.background = '#550080';
        document.getElementById('player4').style.background = '#008080';
        document.getElementById('p1Display').style.background = '#ff0000';
        document.getElementById('p2Display').style.background = '#cccc00';
        document.getElementById('p3Display').style.background = '#550080';
        document.getElementById('p4Display').style.background = '#008080';
        document.getElementById('player1').style.zIndex = 5;
        document.getElementById('player2').style.zIndex = 3;
        document.getElementById('player3').style.zIndex = 3;
        document.getElementById('player4').style.zIndex = 3;
        player2Info.tagged = false
        player3Info.tagged = false
        player4Info.tagged = false
    }
    if (player2Info.tagged) {
        document.getElementById("player2Tag").style.visibility = "visible";
        document.getElementById("player1Tag").style.visibility = "hidden";
        document.getElementById("player3Tag").style.visibility = "hidden";
        document.getElementById("player4Tag").style.visibility = "hidden";
        document.getElementById('player2').style.background = '#ff0000';
        document.getElementById('player1').style.background = '#0000ff';
        document.getElementById('player3').style.background = '#550080';
        document.getElementById('player4').style.background = '#008080';
        document.getElementById('p1Display').style.background = '#0000ff';
        document.getElementById('p2Display').style.background = '#ff0000';
        document.getElementById('p3Display').style.background = '#550080';
        document.getElementById('p4Display').style.background = '#008080';
        document.getElementById('player1').style.zIndex = 3;
        document.getElementById('player2').style.zIndex = 5;
        document.getElementById('player3').style.zIndex = 3;
        document.getElementById('player4').style.zIndex = 3;
        player1Info.tagged = false
        player3Info.tagged = false
        player4Info.tagged = false
    }
    if (player3Info.tagged) {
        document.getElementById("player2Tag").style.visibility = "hidden";
        document.getElementById("player1Tag").style.visibility = "hidden";
        document.getElementById("player3Tag").style.visibility = "visible";
        document.getElementById("player4Tag").style.visibility = "hidden";
        document.getElementById('player2').style.background = '#cccc00';
        document.getElementById('player1').style.background = '#0000ff';
        document.getElementById('player3').style.background = '#ff0000';
        document.getElementById('player4').style.background = '#008080';
        document.getElementById('p1Display').style.background = '#0000ff';
        document.getElementById('p2Display').style.background = '#cccc00';
        document.getElementById('p3Display').style.background = '#ff0000';
        document.getElementById('p4Display').style.background = '#008080';
        document.getElementById('player1').style.zIndex = 3;
        document.getElementById('player2').style.zIndex = 3;
        document.getElementById('player3').style.zIndex = 5;
        document.getElementById('player4').style.zIndex = 3;
        player2Info.tagged = false
        player1Info.tagged = false
        player4Info.tagged = false
    }
    if (player4Info.tagged) {
        document.getElementById("player2Tag").style.visibility = "hidden";
        document.getElementById("player1Tag").style.visibility = "hidden";
        document.getElementById("player3Tag").style.visibility = "hidden";
        document.getElementById("player4Tag").style.visibility = "visible";
        document.getElementById('player2').style.background = '#cccc00';
        document.getElementById('player1').style.background = '#0000ff';
        document.getElementById('player3').style.background = '#550080';
        document.getElementById('player4').style.background = '#ff0000';
        document.getElementById('p1Display').style.background = '#0000ff';
        document.getElementById('p2Display').style.background = '#cccc00';
        document.getElementById('p3Display').style.background = '#550080';
        document.getElementById('p4Display').style.background = '#ff0000';
        document.getElementById('player1').style.zIndex = 3;
        document.getElementById('player2').style.zIndex = 3;
        document.getElementById('player3').style.zIndex = 3;
        document.getElementById('player4').style.zIndex = 5;
        player2Info.tagged = false
        player3Info.tagged = false
        player1Info.tagged = false
    }

    document.getElementById("gameTypeOption").innerHTML = "Game Type: " + settings.gameType + `${(settings.gameType === "Time Limited" || settings.gameType === "Tag Time Limited" || settings.gameType === "Tag Timer") ? " - " + settings.gameTimeLimit + "s" : ""}`
    document.getElementById("gameType").innerHTML = settings.gameType + ":"

    if (document.getElementById("gameTypeTime").value) {
        settings.gameTimeLimit = Number(document.getElementById("gameTypeTime").value);
    }

    document.getElementById("edgeBehavior").innerHTML = "Edge Behavior: " + settings.edgeBehavior
    document.getElementById("dashCooldownTime").innerHTML = "Dash Cooldown: " + settings.dashCooldown + "s"
    document.getElementById("tagCooldownTime").innerHTML = "Tag Cooldown: " + settings.tagCooldown + "s"
    document.getElementById("playerSpeed").innerHTML = "Player Speed: " + parseInt(settings.playerSpeed * 50) + "px/s"

    if (document.getElementById("dashInput").value) {
        settings.dashCooldown = Number(document.getElementById("dashInput").value);
    }
    if (document.getElementById("tagInput").value) {
        settings.tagCooldown = Number(document.getElementById("tagInput").value);
    }

    if (document.getElementById("speedInput").value) {
        settings.playerSpeed = Number(document.getElementById("speedInput").value) / 50;
    }
}

function settingsOpen() {
    document.getElementById("menu").style.visibility = "visible";
    paused = true;
}

document.getElementById("gameFreeplay").addEventListener("click", () => {
    settings.gameType = "Freeplay";
})

document.getElementById("gameTimeLimit").addEventListener("click", () => {
    settings.gameType = "Time Limited";
})

document.getElementById("gameTagTimeLimit").addEventListener("click", () => {
    settings.gameType = "Tag Time Limited";
})

document.getElementById("gameTagTimer").addEventListener("click", () => {
    settings.gameType = "Tag Timer";
})

document.getElementById("edgeWrap").addEventListener("click", () => {
    settings.edgeBehavior = "Wrap";
})
document.getElementById("edgeWall").addEventListener("click", () => {
    settings.edgeBehavior = "Wall";
})

document.getElementById("dash5s").addEventListener("click", () => {
    settings.dashCooldown = 5;
    document.getElementById("dashInput").value = ''
})
document.getElementById("dash10s").addEventListener("click", () => {
    settings.dashCooldown = 10;
    document.getElementById("dashInput").value = ''
})
document.getElementById("dash30s").addEventListener("click", () => {
    settings.dashCooldown = 30;
    document.getElementById("dashInput").value = ''
})

document.getElementById("tag3s").addEventListener("click", () => {
    settings.tagCooldown = 3;
    document.getElementById("tagInput").value = ''
})
document.getElementById("tag5s").addEventListener("click", () => {
    settings.tagCooldown = 5;
    document.getElementById("tagInput").value = ''
})
document.getElementById("tag10s").addEventListener("click", () => {
    settings.tagCooldown = 10;
    document.getElementById("tagInput").value = ''
})
document.getElementById("tag30s").addEventListener("click", () => {
    settings.tagCooldown = 30;
    document.getElementById("tagInput").value = ''
})
document.getElementById("tag60s").addEventListener("click", () => {
    settings.tagCooldown = 60;
    document.getElementById("tagInput").value = ''
})

document.getElementById("speed250").addEventListener("click", () => {
    settings.playerSpeed = 250/50;
    document.getElementById("speedInput").value = ''
})
document.getElementById("speed500").addEventListener("click", () => {
    settings.playerSpeed = 500/50;
    document.getElementById("speedInput").value = ''
})

document.getElementById("speed1000").addEventListener("click", () => {
    settings.playerSpeed = 1000/50;
    document.getElementById("speedInput").value = ''
})

document.getElementById("players3").addEventListener("click", () => {
    if (settings.players[2] === "off") {
        settings.players[2] = "player"
        document.getElementById("players3").innerHTML = "P3: On"
        document.getElementById("players3").classList.add("on");
        document.getElementById("players3").classList.remove("off")
        document.getElementById("players4").style.display = "inline-block"
    }
    else if (settings.players[2] === "player") {
        settings.players[2] = "off"
        settings.players[3] = "off"
        document.getElementById("players3").innerHTML = "P3: Off"
        document.getElementById("players4").innerHTML = "P4: Off"
        document.getElementById("players3").classList.add("off");
        document.getElementById("players3").classList.remove("on")
        document.getElementById("players4").classList.add("off");
        document.getElementById("players4").classList.remove("on")
        document.getElementById("players4").style.display = "none"
    }
    startPlayer()
})
document.getElementById("players4").addEventListener("click", () => {
    if (settings.players[3] === "off") {
        settings.players[3] = "player"
        document.getElementById("players4").innerHTML = "P4: On"
        document.getElementById("players4").classList.add("on");
        document.getElementById("players4").classList.remove("off")
    }
    else if (settings.players[3] === "player") {
        settings.players[3] = "off"
        document.getElementById("players4").innerHTML = "P4: Off"
        document.getElementById("players4").classList.add("off");
        document.getElementById("players4").classList.remove("on")
    }
    startPlayer()
})

document.getElementById("saveButton").addEventListener("click", () => {
    unpause()
})

function unpause() {
    if (((settings.gameType === "Time Limited" || settings.gameType === "Tag Time Limited" || settings.gameType === "Tag Timer") && (settings.gameTimeLimit >= 30 && (settings.gameTimeLimit % 2 === 0 || (settings.gameTimeLimit + 1) % 2 === 0))) || (settings.gameType === "Freeplay")) {
        if ((settings.tagCooldown % 2 === 0 || (settings.tagCooldown + 1) % 2 === 0) && (settings.tagCooldown > 0)) {
            if ((settings.dashCooldown % 2 === 0 || (settings.dashCooldown + 1) % 2 === 0) && (settings.dashCooldown >= 0)) {
                if ((parseInt(settings.playerSpeed * 50) % 2 === 0 || (parseInt(settings.playerSpeed * 50) + 1) % 2 === 0) && (settings.playerSpeed * 50 > 49)) {
                    document.getElementById("menu").style.visibility = "hidden";
                    document.getElementById('gameTypeTime').value = ''
                    paused = false;
                }
                else {
                    alert("Player Speed must be a positive integer above 49");
                }
            } else {
                alert("Dash Cooldown must be a positive integer (or 0)");
            }
        } else {
            alert("Tag Cooldown must be a positive integer");
        }
    }
    else {
        alert("Game Time Limit must be a positive integer above 29");
    }
}