let scaleCooldown = 0;
let splashes = ["Hello!", "Clicked.", "This is a splash message.", "Will you succeed?", "I am inside of your computer.", "This is a warning!", "Leave!", "Danger!", "*Clicks*", "Attack!", "Minceraft", "\"Java\" + \"Script\" === \"JavaScript\"", "&lthtml&gt&lt/html&gt", "Hello, Json!", "NaN &lt 0 AND 0 &lt NaN", "//true", "false = true", "/execute", "Made with Minecraft commands.", "NaN", "Alt + F4", "rm -rf", "Ctrl + S", "Cookies!"]
document.getElementById("splash").innerHTML = splashes[Math.floor(Math.random() * splashes.length)];
document.getElementById("splash").style.fontSize = (45 - (document.getElementById("splash").innerHTML.length * (3/5))) + "px";
setTimeout(() => {document.getElementById("splash").style.transition = "1s";}, 20)

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