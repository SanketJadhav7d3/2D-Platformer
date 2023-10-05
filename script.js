
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const button = document.getElementById('fullscreen-button')

button.addEventListener('click', () => {
    console.log("button");
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) { /* Safari */
            canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
            canvas.msRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();   /* morzilla */
    }
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";

const level = new Level({
    context: ctx,
    bg_img_path: "./assets/environment/background.png",
    floorCollisionData: floorCollision,
    platformCollisionData: platformCollision,
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
