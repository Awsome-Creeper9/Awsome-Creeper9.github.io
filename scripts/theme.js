let currentTheme;
setInterval(() => {
    if (document.cookie.split(";").some((item) => item.includes("theme=dark"))) {
        if (currentTheme !== "dark") {
            document.getElementById("themesheet").href = "/styles/frontpage-css.css"
            document.getElementById("lightmode").style.display = "unset"
            document.getElementById("darkmode").style.display = "none"
            currentTheme = "dark"
        }
    }
    else if (document.cookie.split(";").some((item) => item.includes("theme=light"))) {
        if (currentTheme !== "light") {
            document.getElementById("themesheet").href = "/styles/frontpage-css-light.css"
            document.getElementById("lightmode").style.display = "none"
            document.getElementById("darkmode").style.display = "unset"
            currentTheme = "light"
        }
    }
    else {
        document.cookie = "theme=dark; samesite=strict; secure; Domain=awsome-creeper9.github.io; Path=/"
    }
}, 10)

function setTheme(e) {
    if (e.id == "lightmode") {
        document.cookie = "theme=light; samesite=strict; secure; Domain=awsome-creeper9.github.io; Path=/"
    }
    else if (e.id == "darkmode") {
        document.cookie = "theme=dark; samesite=strict; secure; Domain=awsome-creeper9.github.io; Path=/"
    }
}