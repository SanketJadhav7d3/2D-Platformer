
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
//
//function drawGrid(gridSize) {
//    // Set the grid color
//    context.strokeStyle = "white";
//
//    // Draw vertical grid lines
//    for (let x = 0; x <= canvas.width; x += gridSize) {
//        context.beginPath();
//        context.moveTo(x, 0);
//        context.lineTo(x, canvas.height);
//        context.stroke();
//    }
//    // Draw horizontal grid lines
//    for (let y = 0; y <= canvas.height; y += gridSize) {
//        context.beginPath();
//        context.moveTo(0, y);
//        context.lineTo(canvas.width, y);
//        context.stroke();
//    }
//}

function getMouseCoordinate(event) {
  return {x : event.clientX, y : event.clientY};
} 

function mouseCoordinatesToBlock(event) {
  coordinates = getMouseCoordinate(event);   
  let x = Math.floor(coordinates.x / 32);
  let y = Math.floor(coordinates.y / 32);
  console.log(x + " " + y);
  return {blockX : x, blockY : y};
}

canvas.onmousemove = mouseCoordinatesToBlock;

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

animate();

