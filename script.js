
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new PlayerEntity({x : 100, y : 100}, {width: 100, height: 100}, ctx);

var entites = [player]

function animate() {
  window.requestAnimationFrame(animate);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  entites.forEach(entity => {
    entity.update();
  })
}

animate();
