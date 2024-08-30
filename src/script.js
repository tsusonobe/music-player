import player from "./player.js";

// wait for screen load
window.addEventListener("load", player.start());

// if space is pressed play/pause
document.addEventListener("keydown", event => {
    if(event.key == " "){player.playPause()};
});