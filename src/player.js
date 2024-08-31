import audios from "./data.js";
import elements from "./playerElements.js"
import { secondsToMinutes } from "./utils.js";

export default {
    audio_data: audios,
    current_audio: {},
    current_playing: 0,
    is_playing: false,
    on_repeat: false,
    shuffle_mode: false,
    song_ended: false,
    start(){
        elements.get.call(this);
        this.update();
        this.song_file.onended = () => {
            this.song_ended = true;
            this.next();
        };
    },
    next(){
        if(!(this.on_repeat == true && this.song_ended == true))
            this.current_playing++;
        if(this.current_playing == this.audio_data.length)
            this.restart();
        this.song_ended = false;
        this.update();
        this.play();
    },
    back(){
        this.current_playing--;
        if(this.current_playing < 0){
            this.current_playing = this.audio_data.length - 1;
        }
        this.update();
        this.play();
    },
    update(){
        this.current_audio = this.audio_data[this.current_playing];
        this.background.style.background = `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)), url('${this.current_audio.album_img}') no-repeat center center / cover`
        this.album_img.style.background = `url('${this.current_audio.album_img}') no-repeat center center / cover`;
        this.song_title.innerText = this.current_audio.song_title;
        this.artist.innerText = this.current_audio.artist;
        this.song_file.src = this.current_audio.song_file;
        this.song_file.onloadedmetadata = () => {
            elements.actions.call(this);
        }
        // updating cursor on slider and current time
        setInterval(()=>{
            this.songCurrentTime.innerText = secondsToMinutes(this.song_file.currentTime);
            this.progress.value = this.song_file.currentTime;
            this.progress2.value = this.song_file.currentTime;
            let percentage = (this.progress.value/this.progress.max)*100;
            this.progress.style.background = "linear-gradient(to right, gray 0%, gray "+percentage+"%, rgb(70,70,70) "+percentage+"%, rgb(70,70,70) 100%)";
            this.progress2.style.background = "linear-gradient(to right, blue 0%, blue "+percentage+"%, rgb(70,70,70) "+percentage+"%, rgb(70,70,70) 100%)";
        },500);
    },
    play(){
        this.is_playing = true;
        this.song_file.play();
        this.control_icon.classList.remove("fi-sr-play");
        this.control_icon.classList.add("fi-sr-pause");
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i].style.animationPlayState = "running";
        };
    },
    pause(){
        this.is_playing = false;
        this.song_file.pause();
        this.control_icon.classList.remove("fi-sr-pause");
        this.control_icon.classList.add("fi-sr-play");
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i].style.animationPlayState = "paused";
        };
    },
    playPause(){
        if(this.is_playing == false){
            this.play();
        }
        else{
            this.pause();
        }
    },
    restart(){
        this.current_playing = 0;
    },
    repeat(){
        if(this.on_repeat == false){
            this.on_repeat = true;
            this.repeat_button.style.color = "blue";
        }
        else{
            this.on_repeat = false;
            this.repeat_button.style.color = "rgb(180, 180, 180)";
        }
    },
    shuffle(){
        if(this.shuffle_mode == false){
            this.shuffle_mode = true;
            this.shuffle_button.style.color = "blue";
        }
        else{
            this.shuffle_mode = false;
            this.shuffle_button.style.color = "rgb(180, 180, 180)";
        }
    }
};

