let scaleCooldown = 0;
let splashes = ["Hello!", "Clicked.", "This is a splash message.", "Will you succeed?", "I am inside of your computer.", "This is a warning!", "Leave!", "Danger!", "*Clicks*", "Attack!", "Minceraft"]
document.getElementById("splash").innerHTML = splashes[Math.floor(Math.random() * splashes.length)];

function scaleSplash() {
    if (document.getElementById("splash").style.scale === "1" && scaleCooldown <= 0) {
        document.getElementById("splash").style.scale = "1.5";
        scaleCooldown = 10;
    }
    else if (scaleCooldown <= 0) {
        document.getElementById("splash").style.scale = "1";
        scaleCooldown = 10;
    }
    scaleCooldown--;
}