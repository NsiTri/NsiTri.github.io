
let playlist = get_random_playlist()
let current_song = 0

let btns = document.querySelectorAll(".btn");
let audio = document.querySelector("#audio_player")

let source = document.querySelector('#music_source')


function setup_new_song(){
    source.src = playlist[current_song]
    audio.load()
    audio.play()
}


function changeState(x){
    

    for (let i=0; i<btns.length;i++){
        btns[i].classList.remove("active");
    }
    btns[x].classList.add("active");

    if(x==0){
        if (playlist[current_song != source.src] || audio.currentTime == 0){
            setup_new_song()
        } else {
            audio.play();
        }
    }

    if(x==1){
        audio.pause();
    }

    if(x==2){
        audio.load()
        audio.pause()
    }
}



function getList(){
    let list = [
        "musique/AccumulaTown.mp3",
        "musique/ForetKorogu.mp3",
        "musique/gaur_plain.mp3",
        "musique/GeantsMM.mp3",
        "musique/HopesAndDreams.mp3",
        "musique/LastDay.mp3",
        "musique/littlerootTown.mp3",
        "musique/LostWoods.mp3",
        "musique/MaskedDedede.mp3",
        "musique/RaviosTheme.mp3",
        "musique/Reflection.mp3",
        "musique/RosaSurf.mp3",
        "musique/sm64staffroll.mp3",
        "musique/SongOfHealing.mp3",
        "musique/SongOfStorms.mp3",
        "musique/TerminaField.mp3",
        "musique/ThirdDistrict.mp3",
        "musique/Zinnia.mp3"
    ]
    return list
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function get_random_playlist(){
    return shuffle(getList())
}


function randomize_playlist(){
    playlist = get_random_playlist()
    current_song = 0

    console.log(playlist)

    audio.load()
    changeState(0)
}

function song_ended(){
    console.log("ended")
    current_song++
    if (current_song >= playlist.length){
        current_song = 0
    }

    setup_new_song()
}