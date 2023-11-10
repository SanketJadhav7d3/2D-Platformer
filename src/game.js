

class Game {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style = "position:absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
        this.chatbox = document.getElementsByClassName("chatbox")[0];
        this.chatHistory = document.getElementsByClassName("chatHistory")[0];
        this.submit_button = document.getElementById("submit-button");
        this.leave_button = document.getElementById("leave-button");
        this.isChatboxShown = false;
        this.textArea = document.querySelector("input");
        this.currentLevel = undefined;
        this.reqID = null;

        // this.submit_button.addEventListener("click", () => {});

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

    updateChatBox(chatHistory, entity) {
        // add chat to chathistory
        this.removeChatHistory();

        for (let key in chatHistory) {
            this.appendMessage(chatHistory[key]['player'], 'Player', 'player-chat');
            this.appendMessage(chatHistory[key][entity.name], entity.name, 'npc-chat');
        }
    }

    removeChatHistory() {
        while (this.chatHistory.firstChild)
            this.chatHistory.removeChild(this.chatHistory.firstChild);
    }

    toggleChatBox(chatHistory, entity) {
        // clear text
        this.submit_button.addEventListener('click', () => { 

            // append the player message
            this.appendMessage(this.textArea.value, "Player", "player-chat");

            // make api request
            entity.sendSimpleText() 

            // clear the text area
            // this.textArea.value = "";
        });

        this.textArea.value = "";
        if (!this.isChatboxShown) {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "0px";
            this.textArea.focus();
            // disable player inputs 
            this.currentLevel.player.keysDisabled = true;
            this.updateChatBox(chatHistory, entity);
        } else {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "-700px";
            this.textArea.blur();
            this.currentLevel.player.keysDisabled = false;
            this.removeChatHistory();
        }
    }

    appendMessage(message, entity_name, class_) {
        const container = document.createElement('div');
        container.classList.add(class_);

        const name_container = document.createElement('div');

        name_container.style.marginBottom = "15px";
        name_container.innerHTML = entity_name;

        container.appendChild(name_container);
        container.appendChild(document.createTextNode(message));

        this.chatHistory.appendChild(container);
    }

    showChatBox() {
            this.chatbox.style.left = "0px";
    }

    hideChatBox() {
            this.chatbox.style.left = "-500px";
    }
}
