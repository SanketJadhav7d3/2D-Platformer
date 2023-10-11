
const fullScreenButton = document.getElementsByClassName("hidden-button")[0];

const musicPlayer = new BackgroundMusic();

const canvasContainer = document.getElementsByClassName("canvas-container")[0];

fullScreenButton.addEventListener('click', () => {
    if (canvasContainer.requestFullscreen) {
        canvasContainer.requestFullscreen();
    } else if (canvasContainer.webkitRequestFullscreen) { /* Safari */
        canvasContainer.webkitRequestFullscreen();
    } else if (canvasContainer.msRequestFullscreen) { /* IE11 */
        canvasContainer.msRequestFullscreen();
    } else if (canvasContainer.mozRequestFullScreen) {
        canvasContainer.mozRequestFullScreen();   /* morzilla */
    }
});

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";

function displayOpening() {
    const openingWindow = document.getElementById('opening-window');

    openingWindow.classList.remove("hidden");

    openingWindow.classList.add("fade-in");
}

function removeOpening() {
    const openingWindow = document.getElementById('opening-window');

    openingWindow.classList.remove("fade-in");

    openingWindow.classList.add("fade-out");

}

function runVillage() {
    window.requestAnimationFrame(runVillage);
    // scaling and restoring 
    // ctx.save()
    // floor collision and tile collision goes inside
    // ctx.scale(3, 3.47);
    // background.draw();
    // ctx.restore();

    village.drawBackground();
}

window.onload = () => {
    console.log("hwat");
    if (canvasContainer.requestFullscreen) {
        canvasContainer.requestFullscreen();
    } else if (canvasContainer.webkitRequestFullscreen) { /* Safari */
        canvasContainer.webkitRequestFullscreen();
    } else if (canvasContainer.msRequestFullscreen) { /* IE11 */
        canvasContainer.msRequestFullscreen();
    } else if (canvasContainer.mozRequestFullScreen) {
        canvasContainer.mozRequestFullScreen();   /* morzilla */
    }
    musicPlayer.openingMusic.play();
    displayOpening();
}

window.onkeydown = (event) => {
    if (event.key == " ") {
        if (!village.hasGameStarted) {
            village.hasGameStarted = true;
            musicPlayer.openingMusic.pause();
            musicPlayer.transitionMusic.play();
            removeOpening();
            musicPlayer.creepyMusic.play();
            musicPlayer.creepyMusic.loop = true;
            fullScreenButton.classList.remove("hidden-button");
            fullScreenButton.classList.add("fullscreen-button");
        }
    }
}

runVillage()
