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