
const fullScreenButton = document.getElementsByClassName("hidden-button")[0];

const musicPlayer = new BackgroundMusic();

const canvasContainer = document.getElementById("container");

fullScreenButton.addEventListener('click', () => {
    if (canvasContainer.requestFullscreen) 
        canvasContainer.requestFullscreen();
     else if (canvasContainer.webkitRequestFullscreen)  /* Safari */
        canvasContainer.webkitRequestFullscreen()
     else if (canvasContainer.msRequestFullscreen)  /* IE11 */
        canvasContainer.msRequestFullscreen();
     else if (canvasContainer.mozRequestFullScreen) 
        canvasContainer.mozRequestFullScreen();   /* morzilla */
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

// get current level from localstorage
const currentLevelString = localStorage.getItem('currentLevel');

const currentLevelData = currentLevelString ? JSON.parse(currentLevelString) : null;

if (currentLevelData) {
    game.initalizeLevel(currentLevelData);
    console.log("Loaded from previous history");
} else {
    game.initalizeLevel(village);
    console.log("New game");
}

window.onload = () => {
    if (canvasContainer.requestFullscreen) {
        canvasContainer.requestFullscreen();
    } else if (canvasContainer.webkitRequestFullscreen) { /* Safari */
            canvasContainer.webkitRequestFullscreen();
    } else if (canvasContainer.msRequestFullscreen) { /* IE11 */
            canvasContainer.msRequestFullscreen();
    } else if (canvasContainer.mozRequestFullScreen) {
        canvasContainer.mozRequestFullScreen();   /* morzilla */
    }
    // musicPlayer.openingMusic.play();
    if (!currentLevelData) 
        displayOpening();
    else {
        game.currentLevel.hasGameStarted = true;
        game.overlayIn();
        game.overlayOut();
    }
}

// window.onbeforeunload = function() {
    // localStorage.clear();
// };


// game.initalizeLevel(cemetry);
// menu keys

window.onkeydown = (event) => {
    switch (event.key) {
        case " ":
            if (!game.currentLevel.hasGameStarted) {
                game.currentLevel.hasGameStarted = true;
                // musicPlayer.openingMusic.pause();
                // musicPlayer.transitionMusic.play();
                removeOpening();
                // musicPlayer.creepyMusic.play();
                // musicPlayer.creepyMusic.loop = true;
                fullScreenButton.classList.remove("hidden-button");
                fullScreenButton.classList.add("fullscreen-button");
            }
            break;

        case "o":
            if (event.ctrlKey) 
                game.toggleChatBox();
            
            break;
    }
}

game.startLoop();
