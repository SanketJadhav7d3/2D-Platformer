
class BackgroundMusic {
    constructor() {
        this.musicEnabled = true;
        this.openingMusic = new Audio('./assets/musics/opening.mp3');
        this.transitionMusic = new Audio('./assets/musics/transition.mp3');
        this.creepyMusic = new Audio('./assets/musics/creepy.mp3');
    }

    playOpeningMusic() {
        if (this.musicEnabled) {
            this.openingMusic.play();
        }
    }

    playCreepyMusic() {
        if (this.musicEnabled) {
            this.creepyMusic.play();
        }
    }

    pauseOpeningMusic() {
            this.openingMusic.pause();
    }

    pauseCreepyMusic() {
            this.creepyMusic.pause();
    }
}
