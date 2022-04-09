const container = document.querySelector(".container"),
musicImg = container.querySelector(".img-area img"),
musicName = container.querySelector(".song-details .name"),
musicArtist = container.querySelector(".song-details .artist"),
mainAudio = container.querySelector("#main-audio"),
playpauseBtn = container.querySelector(".play-pause"),
nextBtn = container.querySelector("#next"),
prevBtn = container.querySelector("#prev"),
progressArea = container.querySelector(".progress-area"),
progressBar = container.querySelector(".progress-bar");




let musicIndex = 1;

window.addEventListener("load", ()=>{

    loadMusic(musicIndex);
})


//Load music Function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb -1].artist;
    musicImg.src = `images/${allMusic[indexNumb -1].img}.jpeg`;
    mainAudio.src = `songs/${allMusic[indexNumb -1].src}.mp3`;
}

//Play music function
function playMusic(){
    container.classList.add("paused");
    playpauseBtn.querySelector("i").innerHTML = "pause";
    mainAudio.play();
}


// Pause music function
function pauseMusic(){
    container.classList.add("paused");
    playpauseBtn.querySelector("i").innerHTML = "play_arrow";
    mainAudio.pause();
}

//Next Music function
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//Prev Music function
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}



// play or music button event
playpauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = container.classList.contains("paused");

    isMusicPaused ? pauseMusic() : playMusic();
});


//next music button event
nextBtn.addEventListener("click", ()=>{
    nextMusic();


});

//prev music button event
prevBtn.addEventListener("click", ()=>{
   prevMusic();

});


//update progressbar width according to music curr time
 mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`;



    let musicCurrentTime = container.querySelector(".current-time"),
    musicDuration =container.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", ()=>{

        //Update total duration of song
        let mainAdDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec =  Math.floor(mainAdDuration % 60);

        if(totalSec < 10){
            totalSec `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;

    });

    // update current timeline duration
    let currentMin = Math.floor(currentTime / 60);
    let currentSec =  Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec= `0${currentSec}`;
    }

    musicCurrentTime.innerText= `${currentMin}:${currentSec}`;


 });


  progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.OffsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();

 });