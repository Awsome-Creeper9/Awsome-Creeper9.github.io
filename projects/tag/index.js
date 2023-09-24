let timeElapsed = 0,
    timeMinutes = 0,
    timeSeconds = 0,
    tagCooldown = 0,
    paused = true,
    gameTimeSeconds = 0,
    gameTimeMinutes = 0;

let settings = {
    gameType: "Freeplay",
    gameTimeLimit: 120,
    players: 2, //for future needs
    tagCooldown: 3,
    dashCooldown: 10,
    edgeBehavior: "Wall"
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
    currentTagTime: 0,
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
    currentTagTime: 0,
}

let startingPlayer = Math.round(Math.random())
if (startingPlayer === 0) {
    player1Info.tagged = true
}
else if (startingPlayer === 1) {
    player2Info.tagged = true
}



document.addEventListener("keydown", (e) => {
    if (e.key === 'w' && !paused) {
        player1Info.speedy = -10;
        player1Info.direction = "up";
    }
    if (e.key === 's' && !paused) {
        player1Info.speedy = 10;
        player1Info.direction = "down";
    }
    if (e.key === 'a' && !paused) {
        player1Info.speedx = -10;
        player1Info.direction = "left";
    }
    if (e.key === 'd' && !paused) {
        player1Info.speedx = 10;
        player1Info.direction = "right";
    }
    if (e.key === 'e' && player1Info.dashCooldown === 0 && !paused) {
        if (player1Info.direction === "up") {
            player1Info.speedy -= 10;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedy += 10;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "down") {
            player1Info.speedy += 10;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedy -= 10;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "left") {
            player1Info.speedx -= 10;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedx += 10;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
        if (player1Info.direction === "right") {
            player1Info.speedx += 10;
            player1Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player1Info.speedx -= 10;}, 500)
            document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds"
        }
    }

    if (e.key === 'i' && !paused) {
        player2Info.speedy = -10;
        player2Info.direction = "up";
    }
    if (e.key === 'k' && !paused) {
        player2Info.speedy = 10;
        player2Info.direction = "down";
    }
    if (e.key === 'j' && !paused) {
        player2Info.speedx = -10;
        player2Info.direction = "left";
    }
    if (e.key === 'l' && !paused) {
        player2Info.speedx = 10;
        player2Info.direction = "right";
    }
    if (e.key === 'o' && player2Info.dashCooldown === 0 && !paused) {
        if (player2Info.direction === "up") {
            player2Info.speedy -= 10;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedy += 10;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "down") {
            player2Info.speedy += 10;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedy -= 10;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "left") {
            player2Info.speedx -= 10;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedx += 10;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
        if (player2Info.direction === "right") {
            player2Info.speedx += 10;
            player2Info.dashCooldown = settings.dashCooldown;
            setTimeout(() => {player2Info.speedx -= 10;}, 500)
            document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds"
        }
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key === 'w' && player1Info.direction !== "down") {
        player1Info.speedy = 0;
        player1Info.direction = ""
    }
    if (e.key === 's' && player1Info.direction !== "up") {
        player1Info.speedy = 0;
        player1Info.direction = ""
    }
    if (e.key === 'a' && player1Info.direction !== "right") {
        player1Info.speedx = 0;
        player1Info.direction = ""
    }
    if (e.key === 'd' && player1Info.direction !== "left") {
        player1Info.speedx = 0;
        player1Info.direction = ""
    }

    if (e.key === 'i' && player2Info.direction !== "down") {
        player2Info.speedy = 0;
        player2Info.direction = ""
    }
    if (e.key === 'k' && player2Info.direction !== "up") {
        player2Info.speedy = 0;
        player2Info.direction = ""
    }
    if (e.key === 'j' && player2Info.direction !== "right") {
        player2Info.speedx = 0;
        player2Info.direction = ""
    }
    if (e.key === 'l' && player2Info.direction !== "left") {
        player2Info.speedx = 0;
        player2Info.direction = ""
    }
})

setInterval( () => {
    if (!paused) {player1Info.dashCooldown = (player1Info.dashCooldown > 0) ? player1Info.dashCooldown - 1 : 0;}
    if (!paused) {player2Info.dashCooldown = (player2Info.dashCooldown > 0) ? player2Info.dashCooldown - 1 : 0;}
    if (!paused) {tagCooldown = (tagCooldown > 0) ? tagCooldown - 1 : 0;}
    document.getElementById("p1Cooldown").innerHTML = "Dash Cooldown: " + player1Info.dashCooldown + " seconds";
    document.getElementById("p2Cooldown").innerHTML = "Dash Cooldown: " + player2Info.dashCooldown + " seconds";
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

    if (settings.gameType === "Time Limited") {
        if (timeElapsed >= settings.gameTimeLimit) {
            alert(`Game Over!\n${(!player1Info.tagged) ? 'Player 1' : 'Player 2'} Wins!`);
            paused = true;
            timeElapsed = 0;
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
    }

    if ((player1Info.x < player2Info.x + 50) && (player1Info.x + 50 > player2Info.x) && (player1Info.y < player2Info.y + 50) && (player1Info.y + 50 > player2Info.y)) {
        if (player1Info.tagged && tagCooldown === 0) {
            player2Info.tagged = true;
            player1Info.tagged = false;
            player1Info.dashCooldown = 0;
            tagCooldown = settings.tagCooldown;
            document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";
        }
        else if (player2Info.tagged && tagCooldown === 0) {
            player1Info.tagged = true;
            player2Info.tagged = false;
            player2Info.dashCooldown = 0;
            tagCooldown = settings.tagCooldown;
            document.getElementById("tagCooldown").innerHTML = "Tag Cooldown: " + tagCooldown + " seconds";
        }
    }

    if (player1Info.tagged) {
        document.getElementById("player1Info").innerHTML = "Player 1 (Tagged):";
        document.getElementById("player2Info").innerHTML = "Player 2:";
        document.getElementById('player1').style.background = '#ff0000';
        document.getElementById('player2').style.background = '#ff8000';
        document.getElementById('player1').style.zIndex = 5;
        document.getElementById('player2').style.zIndex = 3;
    }
    if (player2Info.tagged) {
        document.getElementById("player2Info").innerHTML = "Player 2 (Tagged):";
        document.getElementById("player1Info").innerHTML = "Player 1:";
        document.getElementById('player2').style.background = '#ff0000';
        document.getElementById('player1').style.background = '#0000ff';
        document.getElementById('player1').style.zIndex = 3;
        document.getElementById('player2').style.zIndex = 5;
    }

    document.getElementById("gameTypeOption").innerHTML = "Game Type: " + settings.gameType + `${(settings.gameType === "Time Limited") ? " - " + settings.gameTimeLimit + "s" : ""}`
    document.getElementById("gameType").innerHTML = settings.gameType + ":"

    if (document.getElementById("gameTypeTime").value) {
        settings.gameTimeLimit = Number(document.getElementById("gameTypeTime").value);
    }

    document.getElementById("edgeBehavior").innerHTML = "Edge Behavior: " + settings.edgeBehavior
    document.getElementById("dashCooldownTime").innerHTML = "Dash Cooldown: " + settings.dashCooldown + "s"
    document.getElementById("tagCooldownTime").innerHTML = "Tag Cooldown: " + settings.tagCooldown + "s"

    if (document.getElementById("dashInput").value) {
        settings.dashCooldown = Number(document.getElementById("dashInput").value);
    }
    if (document.getElementById("tagInput").value) {
        settings.tagCooldown = Number(document.getElementById("tagInput").value);
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

document.getElementById("saveButton").addEventListener("click", () => {
    if ((settings.gameType === "Time Limited" && (settings.gameTimeLimit >= 30 && (settings.gameTimeLimit % 2 === 0 || (settings.gameTimeLimit + 1) % 2 === 0))) || (settings.gameType === "Freeplay")) {
        if ((settings.tagCooldown % 2 === 0 || (settings.tagCooldown + 1) % 2 === 0) && (settings.tagCooldown > 0)) {
            if ((settings.dashCooldown % 2 === 0 || (settings.dashCooldown + 1) % 2 === 0) && (settings.dashCooldown >= 0)) {
                document.getElementById("menu").style.visibility = "hidden";
                paused = false;
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
})