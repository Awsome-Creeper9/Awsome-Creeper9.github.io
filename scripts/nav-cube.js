const blockElement = document.getElementById("block")
const leftArrow = document.getElementById("leftArrow")
const rightArrow = document.getElementById("rightArrow")
let currentRotation = parseInt(blockElement.style.transform.slice(`rotateX(-10deg) rotateY(`.length, blockElement.style.transform.length-1));

rightArrow.addEventListener("mouseenter", () => {
    if (currentRotation > -180) {
        blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation-20}deg) rotateZ(0deg)`;
    }
})

rightArrow.addEventListener("mouseleave", () => {
    blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation}deg) rotateZ(0deg)`;
})

rightArrow.addEventListener("click", () => {
    if (currentRotation > -180) {
        currentRotation -= 90;
        blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation}deg) rotateZ(0deg)`;
    }
})

leftArrow.addEventListener("mouseenter", () => {
    if (currentRotation < 0) {
        blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation+20}deg) rotateZ(0deg)`;
    }
})

leftArrow.addEventListener("mouseleave", () => {
    blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation}deg) rotateZ(0deg)`;
})

leftArrow.addEventListener("click", () => {
    if (currentRotation < 0) {
        currentRotation += 90;
        blockElement.style.transform = `rotateX(-10deg) rotateY(${currentRotation}deg) rotateZ(0deg)`;
    }
})

setInterval (() => {
    const isLightTheme = document.cookie.split(";").some((item) => item.includes("theme=light"))
    if (currentRotation <= -180) {
        if (isLightTheme) {
            rightArrow.style.color = "#222"
        }
        else {
            rightArrow.style.color = "#888"
        }
    }
    else {
        if (isLightTheme) {
            rightArrow.style.color = "#000"
        }
        else {
            rightArrow.style.color = "#fff"
        }
    }
    if (currentRotation >= 0) {
        if (isLightTheme) {
            leftArrow.style.color = "#222"
        }
        else {
            leftArrow.style.color = "#888"
        }
    }
    else {
        if (isLightTheme) {
            leftArrow.style.color = "#000"
        }
        else {
            leftArrow.style.color = "#fff"
        }
    }
})