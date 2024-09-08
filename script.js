const spatula = document.getElementById("spatula");
const crepe_holder = document.getElementById("crepe_holder")
const container = document.getElementById("container");
    
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