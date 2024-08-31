let clock = document.getElementById("clock");

function getTime() {
    let time = new Date();
    let str = '';

    str += ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][time.getDay()] + ",\n";

    str += ((time.getMonth() + 1) < 10) ? '0' + (time.getMonth() + 1) + "/" : (time.getMonth() + 1) + "/";
    str += (time.getDate() < 10) ? '0' + time.getDate() + "/" : time.getDate() + "/";
    str += time.getFullYear() + ",\n";

    str += (time.getHours() < 10) ? '0' + time.getHours() + ":" : time.getHours() + ":";
    str += (time.getMinutes() < 10) ? '0' + time.getMinutes() + ":" : time.getMinutes() + ":";
    str += (time.getSeconds() < 10) ? '0' + time.getSeconds() : time.getSeconds();
    clock.innerHTML = str
}

setInterval(() => {
    getTime();
}, 100)