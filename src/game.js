

class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
        this.chatbox = document.getElementsByClassName("chatbox")[0];
        this.submit_button = document.getElementById("submit-button");
        this.leave_button = document.getElementById("leave-button");
        this.isChatboxShown = false;
        this.textArea = document.querySelector("input");
        this.currentLevel = undefined;
        this.reqID = null;

        this.submit_button.addEventListener("click", () => { console.log("submit") });
        this.leave_button.addEventListener("click", () => { this.toggleChatBox() });
    }

    initalizeLevel(levelData) {
        levelData["context"] = this.context;
        this.currentLevel = new Level(levelData);
    }

    runGame() {
        this.reqID = window.requestAnimationFrame(this.runGame.bind(this));
        this.currentLevel.drawBackground();
    }

    toggleChatBox() {
        // clear text
        this.textArea.value = "";
        if (!this.isChatboxShown) {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "0px";
            this.textArea.focus();
            // disable player inputs 
            this.currentLevel.player.keysDisabled = true;
        } else {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "-700px";
            this.textArea.blur();
            this.currentLevel.player.keysDisabled = false;
        }
    }

    showChatBox() {
            this.chatbox.style.left = "0px";
    }

    hideChatBox() {
            this.chatbox.style.left = "-500px";
    }
}
