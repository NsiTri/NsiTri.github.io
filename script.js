const spatula = document.getElementById("spatula");
const crepe_holder = document.getElementById("crepe_holder")
const container = document.getElementById("container");

let crepes_number = 5



function displayCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")
  crepe_template = crepes[0]


  crepes.forEach((crepe) => {
    crepe.remove()
  });

  for (let i = 0; i < crepes_number; i++) {
    clone = crepe_template.cloneNode(true);
    clone.id = "id" + toString(i);
    crepe_holder.appendChild(clone)
  }
}




function randomizeCrepes() {
  let crepes = crepe_holder.querySelectorAll(".crepe")

  for (i = 0; i<crepes.length; i++){

    let step = ((i+1)/crepes.length)
    crepes[i].style.width = Math.round(step * 100).toString() + "%"
    crepes[i].style.backgroundColor = "hsl(" + (Math.round((step * 360))-1).toString() + ", 100%, 50%)"
  }


}




function onLoad() {
  displayCrepes()
  randomizeCrepes()
}

document.body.onload = onLoad;

container.addEventListener("mousemove", (event) => {
  const siblings = Array.from(crepe_holder.children).filter(div => div !== spatula);
  // Get the y position of the mouse
  const mouseY = event.clientY;

  // Loop through all siblings to find the closest one to the mouse
  let closestSibling = siblings[0];
  let closestDistance = Math.abs(mouseY - closestSibling.getBoundingClientRect().y);

  siblings.forEach((sibling) => {
    const siblingY = sibling.getBoundingClientRect().y;
    const distance = Math.abs(mouseY - siblingY);

    if (distance < closestDistance) {
      closestSibling = sibling;
      closestDistance = distance;
    }
  });

  

  // Insert the moving div before or after the closest sibling depending on the position
  const siblingRect = closestSibling.getBoundingClientRect();
  if (mouseY < siblingRect.y + siblingRect.height / 2) {
    crepe_holder.insertBefore(spatula, closestSibling);
  } else {
    crepe_holder.insertBefore(spatula, closestSibling.nextSibling);
  }
});