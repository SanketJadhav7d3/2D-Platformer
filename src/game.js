

class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
        this.chatbox = document.getElementsByClassName("chatbox")[0];
        this.isChatboxShown = false;
        this.textArea = document.querySelector("textarea");
    }

    toggleChatBox() {
        // clear text
        this.textArea.value = "";
        if (!this.isChatboxShown) {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "0px";
            this.textArea.focus();
        } else {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "-500px";
            this.textArea.blur();
        }
    }

    showChatBox() {
            this.chatbox.style.left = "0px";
    }

    hideChatBox() {
            this.chatbox.style.left = "-500px";
    }
}
