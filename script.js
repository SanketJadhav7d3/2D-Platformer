
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const button = document.createElement("button");
button.classList.add("fullscreen-button");

button.addEventListener('click', () => {
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
    openingMusic.play();
    displayOpening();
}

window.onkeydown = (event) => {
    if (event.key == " ") {
        if (!village.hasGameStarted) {
            openingMusic.pause();
            transitionMusic.play();
            removeOpening();
            village.hasGameStarted = true;
            creepyMusic.play();
            creepyMusic.loop = true;
        }
    }
}

runVillage()
