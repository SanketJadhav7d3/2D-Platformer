
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";

const player = new PlayerEntity({
    position: {x : 100, y : 100}, 
    imageSrc: "./assets/PlayerSprite/idle sheet-Sheet.png",
    frameRate: 18,
    scale: 0.5
});

const level = new Level({
    context: ctx,
    bg_img_path: "./assets/environment/background.png",
    floorCollisionData: floorCollision,
    platformCollisionData: platformCollision,
    entites: [player]
});

function run() {
    window.requestAnimationFrame(run);

    // scaling and restoring 
    // ctx.save()
    // floor collision and tile collision goes inside
    // ctx.scale(3, 3.47);
    // background.draw();
    // ctx.restore();

    level.drawBackground();
}

run();
