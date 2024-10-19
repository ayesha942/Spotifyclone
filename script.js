document.addEventListener('DOMContentLoaded', (event) => {
    let songIndex = 0;
    let audioElement = new Audio('songs/1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songList = document.querySelector('.songlist');

    let songs = [
        {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "1.jpg"},
        {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "2.jpg"},
        {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "3.jpg"},
        {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "4.jpg"},
        {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "5.jpg"},
        {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "6.jpg"},
        {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "7.jpg"},
        {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "8.jpg"},
        {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "9.jpg"},
        {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "10.jpg"},
    ];

    // Dynamically create song items
    songs.forEach((song, i) => {
        let songItem = document.createElement('div');
        songItem.classList.add('songItem');
        
        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="Song Image">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay"><span class="timestamp">05:35 <i class="far fa-3x fa-play-circle songItemPlay" id="${i}"></i></span></span>
        `;
        
        songList.appendChild(songItem);
    });

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });

    audioElement.addEventListener('timeupdate', () => { 
        // Update Seekbar
        let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
        myProgressBar.value = progress;
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    });

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
    };

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        });
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})