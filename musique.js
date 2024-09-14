const MusicList = document.getElementById(".audioList")

function changeState(x){
    let btns = document.querySelectorAll(".btn");
    let audio = document.querySelector("#myAudio")

    for (let i=0; i<btns.length;i++){
        btns[i].classList.remove("active");
    }
    btns[x].classList.add("active");

    if(x==0){
        audio.play();

    }

    if(x==1){
        audio.pause();

    }

    if(x==2){
        audio.pause();
        audio.currentTime = 0;

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


function PlayMusic(liste){
    change = "musique/zinnia.mp3"
    for(let i =0;i<liste.length;i++){
        var audio = document.getElementById('myAudio');
        var audio = audio.firstChild;
        var src = audio.getAttribute("src").replace(change,liste[i]);
        audio.setAttribute("src", src);
        let current = document.querySelector("#myAudio");
    }
}

