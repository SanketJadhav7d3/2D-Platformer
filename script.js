
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new PlayerEntity([100, 100], ctx);

var entites = [player]

function animate() {

  window.requestAnimationFrame(animate);

  entites.forEach(entity => {
    entity.update();
  })
}

animate();
