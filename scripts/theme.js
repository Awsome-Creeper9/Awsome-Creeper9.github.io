let currentTheme;
const expiryTime = 1000 * 60 * 60 * 24 * 365; // 1 year
setInterval(async () => {
    let CookieOBJ;
    if (await cookieStore.get("theme")) {CookieOBJ = await cookieStore.get("theme");}
    else {setTheme({ id : "darkmode" }); return;}

    const themeValue = await CookieOBJ.value

    if (themeValue == "dark") {
        if (currentTheme !== "dark") {
            document.getElementById("themesheet").href = "/styles/frontpage-css.css"
            document.getElementById("lightmode").style.display = "unset"
            document.getElementById("darkmode").style.display = "none"
            currentTheme = "dark"
        }
    }
    else if (themeValue == "light") {
        if (currentTheme !== "light") {
            document.getElementById("themesheet").href = "/styles/frontpage-css-light.css"
            document.getElementById("lightmode").style.display = "none"
            document.getElementById("darkmode").style.display = "unset"
            currentTheme = "light"
        }
    }
    else {
        cookieStore.set({
            name: "theme",
            value: "dark",
            expires: Date.now() + expiryTime,
            domain: "awsome-creeper9.github.io",
        })

        cookieStore.set({
            name: "theme",
            value: "dark",
            expires: Date.now() + expiryTime,
            domain: "localhost",
        })

        console.warn("The following error is because I needed the theme cookie in localhost for testing. This doesn't affect you.")
    }
}, 1)

async function setTheme(e) {
    if (e.id == "lightmode") {
        cookieStore.set({
            name: "theme",
            value: "light",
            expires: Date.now() + expiryTime,
            domain: "awsome-creeper9.github.io",
        })

        cookieStore.set({
            name: "theme",
            value: "light",
            expires: Date.now() + expiryTime,
            domain: "localhost",
        })

        console.warn("The following error is because I needed the theme cookie in localhost for testing. This doesn't affect you.")
    }
    else if (e.id == "darkmode") {
        cookieStore.set({
            name: "theme",
            value: "dark",
            expires: Date.now() + expiryTime,
            domain: "awsome-creeper9.github.io",
        })

        cookieStore.set({
            name: "theme",
            value: "dark",
            expires: Date.now() + expiryTime,
            domain: "localhost",
        })

        console.warn("The following error is because I needed the theme cookie in localhost for testing. This doesn't affect you.")
    }
}