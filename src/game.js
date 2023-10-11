

class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
    }
}
