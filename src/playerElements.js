import { secondsToMinutes } from "./utils.js";

export default {
    get(){
        this.background = document.querySelector("body");
        this.album_img = document.querySelector(".album-img");
        this.song_title = document.querySelector(".song");
        this.artist = document.querySelector(".artist");
        this.song_file = document.querySelector("audio");
        this.wires = Array.from(document.querySelectorAll('#audio-visual .audio-wire'));
        this.control_icon = document.getElementById("playIcon");
        this.control_button = document.getElementById("playButton");
        this.backward_button = document.getElementById("backwardIcon");
        this.forward_button = document.getElementById("forwardIcon");
        this.shuffle_button = document.getElementById("shuffleIcon");
        this.repeat_button = document.getElementById("repeatIcon");
        this.songCurrentTime = document.getElementById("song-current-time");
        this.songDuration = document.getElementById("song-duration");
        this.progress = document.getElementById("progress");
        this.progress2 = document.getElementById("progress2");
    },
    actions(){
        this.control_button.onclick = () => this.playPause();
        this.backward_button.onclick = () => this.back();
        this.forward_button.onclick = () => this.next();
        this.shuffle_button.onclick = () => this.shuffle();
        this.repeat_button.onclick = () => this.repeat();
        this.progress.max = Math.round(this.song_file.duration);
        this.progress.value = this.song_file.currentTime;
        this.progress2.max = Math.round(this.song_file.duration);
        this.progress2.value = this.song_file.currentTime;
        this.songDuration.innerText = secondsToMinutes(this.song_file.duration);
        this.progress2.onchange = () => {this.song_file.currentTime = this.progress2.value;}
    }
}