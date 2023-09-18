
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";

const player = new PlayerEntity({x : 100, y : 100}, {width: 100, height: 100}, ctx);

var entites = [player]


const background = new Sprite({ x : 0, y: 0}, "./assets/Background/background.png", ctx);
const middleground = new Sprite({ x : 0, y: 0}, "./assets/Background/middleground.png", ctx);

function run() {
  window.requ(run);

  background.draw();
  middleground.draw();

  entites.forEach(entity => {
    entity.update();
  })
}

run();
