const spatula = document.getElementById("spatula");
const crepe_holder = document.getElementById("crepe_holder")
const container = document.getElementById("container");
const number_box = document.getElementById("number_selector")
const move_counter = document.getElementById("move_counter")


let crepes_number = number_box.value
let is_spatula_moving = false

let moves_count = 0

const MIN_CREPES = 1
const MAX_CREPES = 100

//---------- SETUP ----------------------------------------------------------------


//génère crepes_number crêpes identiques
function generateCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")
  crepe_template = crepes[0]


  for (let crepe of crepes){
    crepe.remove()
  }
  
  for (let i = 0; i < crepes_number; i++) {
    clone = crepe_template.cloneNode(true);
    clone.id = "id" + i;
    crepe_holder.appendChild(clone)
  }
}


// colore les crepes et change leur taille en fonction de leur position
function textureCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")

  for (i = 0; i<crepes.length; i++){

    let step = ((i+1)/crepes.length)
    crepes[i].style.width = Math.round(step * 100).toString() + "%"
    crepes[i].style.backgroundColor = "hsl(" + (Math.round((step * 360))-1).toString() + ", 100%, 50%)"
  }
}



//mélange toutes les crepes et leur coté
function randomizeCrepes() {

  let crepes = Array.prototype.slice.call(crepe_holder.querySelectorAll(".crepe"));
  
  for (let crepe of crepes){
    crepe_holder.removeChild(crepe);
  }

  shuffleArray(crepes);


  for (let crepe of crepes){
    crepe_holder.appendChild(crepe);

    //coté aléatoire
    if (Math.random() > 0.5) {
      crepe.style.rotate = "180deg"
    } else {
      crepe.style.rotate = "0deg"
    }
  }
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


//fonction qui met les crepes aléatoires en place
function setup_crepes() {
  generateCrepes()
  textureCrepes()
  randomizeCrepes()

  moves_count = 0
  update_counter()

  //si trié du premier coup par chance
  
  setTimeout(function(){
    if (are_crepes_sorted()){
      display_congrats()
    }
  }, 50)
  
  
  
}

document.body.onload = setup_crepes;


// ----- REUSSI ------------------------------------------------------------


function are_crepes_sorted(){
  let crepes = crepe_holder.querySelectorAll(".crepe")
  let current_width = "0%"

  for (let crepe of crepes){
    if (parseInt(crepe.style.width) < parseInt(current_width)){return false}
    if (crepe.style.rotate != "0deg"){return false}

    current_width = crepe.style.width
  }
  return true
}

function display_congrats(){
  alert("Bravo !\nVous avez réussi à trier " + crepes_number + " crêpes en " + moves_count + " coups !")
}


// ----- COMPTEUR --------------------------------------------------------

function update_counter(){
  move_counter.innerHTML = "Coups : " + moves_count
}



//------ INPUTS ---------------------------------------------------------



//calcule ou intercaler la spatule quand la souris bouge


container.addEventListener("mousemove", (event) => {
  if (is_spatula_moving){return}

  spatula.firstElementChild.style.position = "absolute"
  spatula.style.transform = "rotateX(0deg)";
  
  const crepes = crepe_holder.querySelectorAll(".crepe");
  const mouseY = event.clientY;

  let closest_crepe = crepes[0];
  let closest_distance = Math.abs(mouseY - closest_crepe.getBoundingClientRect().y);

  for (let crepe of crepes){
    const crepe_y = crepe.getBoundingClientRect().y;
    const distance = Math.abs(mouseY - crepe_y);

    if (distance < closest_distance) {
      closest_crepe = crepe;
      closest_distance = distance;
    }
  }

  const crepe_rect = closest_crepe.getBoundingClientRect();

  if (mouseY < crepe_rect.y + crepe_rect.height / 2) {
    crepe_holder.insertBefore(spatula, closest_crepe);
  } else {
    crepe_holder.insertBefore(spatula, closest_crepe.nextSibling);
  }
});





//fonction qui retourne les crepes de l'array crepes
function reverse_crepes(crepes){
  
  let rotating_div = document.createElement("div")
  crepe_holder.insertBefore(rotating_div, crepe_holder.firstChild)

  for (let crepe of crepes){
    rotating_div.appendChild(crepe)
  }


  rotating_div.classList.add('rotate');

  is_spatula_moving = true


  //quand l'anim est finie, on appelle la fonction
  //la rotation est seulement visuelle, donc quand elle se termine on doit tout changer a la main
  setTimeout(() => {
    rotating_div.classList.remove('rotate');

    for (let crepe of crepes){
      crepe_holder.insertBefore(crepe, crepe_holder.firstChild);
      
      if (crepe.style.rotate === "180deg"){
        crepe.style.rotate = "0deg"
      } else {
        crepe.style.rotate = "180deg"
      }
    }

    spatula.style.rotate = "0deg"
    spatula.style.transform = "rotateX(180deg)";
    is_spatula_moving = false

    moves_count++
    update_counter()

    crepe_holder.removeChild(rotating_div)

    if (are_crepes_sorted()){
      display_congrats()
    }

  }, 300); //in ms, change it in css too (but a bit shorter here)

}


//Retournage des crepes quand l'utilisateur clique
container.addEventListener("mousedown", (event) => {

  if (is_spatula_moving){return}
  if (event.button != "0"){return} // 0 = click gauche

  const mouseY = event.clientY
  let top_crepes = []

  for (crepe of crepe_holder.children) {

    if (crepe.id === "spatula") {
      top_crepes.push(crepe);
      break
    }

    top_crepes.push(crepe)
  }

  reverse_crepes(top_crepes)
}) 


let irl_crepes_colors = [
  "rgb(212,202,201)",
  "rgb(219,123,63)",
  "rgb(216,219,142)",
  "rgb(108,186,76)",
  "rgb(209,81,78)",
  "rgb(172,172,206)",
  "rgb(85,184,213)",
]

function textureCrepesIRL(){
  crepes_number = 7
  number_box.value = crepes_number
  generateCrepes()

  let crepes = crepe_holder.querySelectorAll(".crepe")

  for (i = 0; i<crepes.length; i++){
    let step = ((i+1)/crepes.length)
    crepes[i].style.width = Math.round(step * 100).toString() + "%"
    crepes[i].style.backgroundColor = irl_crepes_colors[i]
  }

  randomizeCrepes()
}


//Changer le nombre de crepes quand on change le nombre dans la boite
number_box.addEventListener("input", () => {

  crepes_number = number_box.value

  if (crepes_number < MIN_CREPES) {
    crepes_number = MIN_CREPES

  } else if (crepes_number > MAX_CREPES) {
    crepes_number = MAX_CREPES
  }

  setup_crepes()
})


//changer le nombre dans la boite en le nombre réel de crêpe, qui peut être différent
//si l'utilisateur a rentré un nombre trop grand ou petit

number_box.addEventListener("focusout", () => {
  number_box.value = crepes_number
})