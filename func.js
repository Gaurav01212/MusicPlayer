// Create an audio element and initialize variables
let audioElem = new Audio('./music/1.mp3');
let centralPlay = document.getElementById('central-play');
let myPrograssBar = document.getElementById('progress-bar');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('song-item'));
let currentIndexOfSong = -1;
let masterSong = document.getElementById('master-song');
let songItemPlay = document.getElementsByClassName('songItemPlay');
let rotate=document.getElementsByClassName('rotate');

// Define an array of songs with their information
let songs = [
    {songName:"Bekhyali - Arijit sing ",filePath:"./music/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Apna bana le - Arijit sing",filePath:"./music/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Hamdard - Arijit singh",filePath:"./music/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Lag ja gale - Arijit singh",filePath:"./music/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Phir mulaqat - Jubin ",filePath:"./music/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Lo safar - Jubin",filePath:"./music/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"phir chala - Jubin ",filePath:"./music/7.mp3",coverPath:"covers/7.jpg"}
    
];

// Initialize the UI with song information
songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('h2')[0].innerHTML = songs[i].songName;
});

// Function to pause all songItemPlay icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

// Event listener for centralPlay button (Play/Pause)
centralPlay.addEventListener('click', () => {
    if (audioElem.paused || audioElem.currentTime == 0) {
        audioElem.play();
        centralPlay.classList.remove('fa-circle-play');
        centralPlay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';

        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-play');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-pause');
    } else {
        audioElem.pause();
        centralPlay.classList.remove('fa-circle-pause');
        centralPlay.classList.add('fa-circle-play');

        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-pause');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-play');
        gif.style.opacity = '0';
    }
});

// Event listener for audioElem timeupdate (progress bar)
audioElem.addEventListener('timeupdate', () => {
    var progress = parseInt((audioElem.currentTime / audioElem.duration) * 100);
    myPrograssBar.value = progress;
});

// Event listener for myPrograssBar (seek bar)
myPrograssBar.addEventListener('change', () => {
    audioElem.currentTime = myPrograssBar.value * audioElem.duration / 100;
});

// Event listeners for individual songItemPlay icons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElem.paused) {
            makeAllPlays();
            centralPlay.classList.remove('fa-circle-play');
            centralPlay.classList.add('fa-circle-pause');
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            currentIndexOfSong = parseInt(e.target.id);
            audioElem.src = `./music/${currentIndexOfSong + 1}.mp3`;
            audioElem.play();
            gif.style.opacity = '1';
            masterSong.innerText = songs[currentIndexOfSong].songName;
        } else {
            centralPlay.classList.remove('fa-circle-pause');
            centralPlay.classList.add('fa-circle-play');
            gif.style.opacity = '0';
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElem.pause();
        }
    });
});

// Event listener for the previous button
document.getElementById('prev').addEventListener('click', () => {
    if (currentIndexOfSong <= 0) {
        currentIndexOfSong = 6;
        audioElem.src = `./music/${currentIndexOfSong + 1}.mp3`;
        audioElem.play();
        masterSong.innerText = songs[currentIndexOfSong].songName;
        makeAllPlays();
        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-play');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-pause');
    } else {
        currentIndexOfSong--;
        audioElem.src = `./music/${currentIndexOfSong + 1}.mp3`;
        audioElem.play();
        masterSong.innerText = songs[currentIndexOfSong].songName;
        makeAllPlays();
        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-play');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-pause');
    }
});

// Event listener for the next button
document.getElementById('next').addEventListener('click', () => {
    if (currentIndexOfSong >= songs.length - 1) {
        currentIndexOfSong = 0;
        audioElem.src = `./music/${currentIndexOfSong + 1}.mp3`;
        audioElem.play();
        masterSong.innerText = songs[currentIndexOfSong].songName;
        makeAllPlays();
        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-play');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-pause');
    } else {
        currentIndexOfSong++;
        audioElem.src = `./music/${currentIndexOfSong + 1}.mp3`;
        audioElem.play();
        masterSong.innerText = songs[currentIndexOfSong].songName;
        makeAllPlays();
        document.getElementById(`${currentIndexOfSong}`).classList.remove('fa-circle-play');
        document.getElementById(`${currentIndexOfSong}`).classList.add('fa-circle-pause');
    }
});



//for the rotation of logo
// Inside the centralPlay event listener
centralPlay.addEventListener('click', () => {
    if (audioElem.paused || audioElem.currentTime == 0) {
        
        rotate.classList.remove('rotate');
        
    } else {
        
        rotate.classList.add('rotate');
        
    }
});


let t1=gsap.timeline();

t1.from(".song-item",{

    x:-200,
    opacity:0,
    stagger:0.2

})
 gsap.from("#central-play",{
    y:100,
    duration:2,
    opacity:0

 })