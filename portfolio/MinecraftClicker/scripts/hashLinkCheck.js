let hash = window.location.hash;

if (hash === "#settings") {
    setLevel(-1);
}
else if (hash === "#how-to-play") {
    setLevel(-2);
}
else {
    setLevel(0);
}