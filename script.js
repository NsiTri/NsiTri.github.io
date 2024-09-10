const spatula = document.getElementById("spatula");
const crepe_holder = document.getElementById("crepe_holder")
const container = document.getElementById("container");
const number_box = document.getElementById("number_selector")


let crepes_number = number_box.value

const MIN_CREPES = 3
const MAX_CREPES = 50


//---------- SETUP ----------------------------------------------------------------

function generateCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")
  crepe_template = crepes[0]


  crepes.forEach((crepe) => {
    crepe.remove()
  });

  for (let i = 0; i < crepes_number; i++) {
    clone = crepe_template.cloneNode(true);
    clone.id = "id" + i;
    crepe_holder.appendChild(clone)
  }
}




function textureCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")

  for (i = 0; i<crepes.length; i++){

    let step = ((i+1)/crepes.length)
    crepes[i].style.width = Math.round(step * 100).toString() + "%"
    crepes[i].style.backgroundColor = "hsl(" + (Math.round((step * 360))-1).toString() + ", 100%, 50%)"
  }
}



function randomizeCrepes() {

  let crepes = Array.prototype.slice.call(crepe_holder.querySelectorAll(".crepe"));
  
  //supprime toutes les crepes
  crepes.forEach((crepe) => {
    crepe_holder.removeChild(crepe);
  })

  //mélange la liste
  shuffleArray(crepes);


  //remet les crepes mélangées
  crepes.forEach((crepe) => {
    crepe_holder.appendChild(crepe);

    //coté aléatoire
    if (Math.random() > 0.5) {
      crepe.style.rotate = "180deg"
    }
  })
}




function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function setup_crepes() {
  generateCrepes()
  textureCrepes()
  randomizeCrepes()
}

document.body.onload = setup_crepes;

//------ INPUTS ---------------------------------------------------------




container.addEventListener("mousemove", (event) => {
  const crepes = crepe_holder.querySelectorAll(".crepe");
  const mouseY = event.clientY;

  let closest_crepe = crepes[0];
  let closest_distance = Math.abs(mouseY - closest_crepe.getBoundingClientRect().y);

  crepes.forEach((crepe) => {
    const crepe_y = crepe.getBoundingClientRect().y;
    const distance = Math.abs(mouseY - crepe_y);

    if (distance < closest_distance) {
      closest_crepe = crepe;
      closest_distance = distance;
    }
  });


  const crepe_rect = closest_crepe.getBoundingClientRect();
  if (mouseY < crepe_rect.y + crepe_rect.height / 2) {
    crepe_holder.insertBefore(spatula, closest_crepe);
  } else {
    crepe_holder.insertBefore(spatula, closest_crepe.nextSibling);
  }
});





function reverse_crepes(crepes){

  //supprime les crepes du dessus
  crepes.forEach((crepe) => {
    crepe_holder.removeChild(crepe);
  })
  
  //remet les crepes au dessus
  crepes.forEach((crepe) => {
    crepe_holder.insertBefore(crepe, crepe_holder.firstChild);
    if (crepe.style.rotate === "180deg"){
      crepe.style.rotate = "0deg"
    } else {
      crepe.style.rotate = "180deg"
    }
   
  })
}



container.addEventListener("mousedown", (event) => {
  const mouseY = event.clientY

  let top_crepes = []

  for (let crepe of crepe_holder.children) {
    if (crepe.id === "spatula") {break}
    top_crepes.push(crepe)
  }

  reverse_crepes(top_crepes)
}) 


number_box.addEventListener("input", () => {
  crepes_number = number_box.value

  if (crepes_number < MIN_CREPES) {

    crepes_number = MIN_CREPES

  } else if (crepes_number > MAX_CREPES) {

    crepes_number = MAX_CREPES

  }

  setup_crepes()
})

number_box.addEventListener("focusout", () => {
  number_box.value = crepes_number
})