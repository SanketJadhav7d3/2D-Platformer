

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
        this.isSettingShown = false;
        this.textArea = document.querySelector("input");

        this.setting_button = document.getElementById("settings-button");

        this.setting_window = document.getElementById("settings-window");

        // store current level information in localstorage
        this.currentLevel = undefined;
        this.reqID = null;

        // this.submit_button.addEventListener("click", () => {});

        this.leave_button.addEventListener("click", () => { this.toggleChatBox() });
        this.textAreaMutex = false;
        this.entityTalking = undefined;

        this.submit_button.addEventListener('click', () => {
            this.sendText();
        });

        this.setting_button.addEventListener('click', () => {
            this.toggleSettingWindow();
        });

        this.village_button = document.getElementById("village-button");
        this.cemetry_button = document.getElementById("cemetry-button");
        this.swamp_button = document.getElementById("swamp-button");

        this.village_button.addEventListener('click', () => {
            if (this.currentLevel.name == "Village") this.toggleSettingWindow();
            else this.changeLevel(village);
        });

        this.cemetry_button.addEventListener('click', () => {
            if (this.currentLevel.name == "Cemetry") this.toggleSettingWindow();
            else this.changeLevel(cemetry);
        });

        this.swamp_button.addEventListener('click', () => {
            if (this.currentLevel.name == "Swamp") this.toggleSettingWindow();
            else this.changeLevel(swamp);
        });
    }

    initalizeLevel(levelData) {
        levelData["context"] = this.context;

        console.log(levelData);

        // save in localstorage 
        this.currentLevel = new Level(levelData);

        // save currentLevel
        localStorage.setItem('currentLevel', JSON.stringify(levelData));
    }

    startLoop() {
        this.reqID = window.requestAnimationFrame(this.startLoop.bind(this));
        this.currentLevel.drawBackground();
    }

    stopLoop() {
        window.cancelAnimationFrame(this.reqID);
    }

    updateChatBox(chatHistory, entity) {
        // add chat to chathistory
        this.removeChatHistory();

        for (let key in chatHistory) {
            this.appendMessage(chatHistory[key]['player'], 'Player', 'player-chat');
            this.appendMessage(chatHistory[key][entity.name], entity.name, 'npc-chat');
        }

        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    removeChatHistory() {
        while (this.chatHistory.firstChild)
            this.chatHistory.removeChild(this.chatHistory.firstChild);
    }

    sendText() { 
        if (this.textArea.value == "") {
            console.log("Empty");
            return;
        }

        if (this.entityTalking == undefined) {
            console.log("No one talking");
            return;
        }

        // append the player message
        this.appendMessage(this.textArea.value, "Player", "player-chat");
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;

        // make api request

        NPCBehaviour.sendSimpleText(this.entityTalking);

        // clear the text area
        // this.textArea.value = "";
    }

    toggleSettingWindow() {
        if (!this.isSettingShown) {
            this.isSettingShown = !this.isSettingShown;
            this.setting_window.style.display = "block";
            this.setting_window.style.position = "absolute";
            this.setting_window.style.height = "100vh";
            this.setting_window.style.width = "100vw";
            this.setting_window.style.display = "flex";
            this.setting_window.style.justifyContent = "space-evenly";
            this.setting_window.style.alignItems = "center";
            this.setting_window.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            this.stopLoop();
        } else {
            this.isSettingShown = !this.isSettingShown;
            this.setting_window.style.display = "none";
            this.setting_window.classList.remove("settings-window");
            this.startLoop();
        }
    }

    toggleChatBox(chatHistory, entity) {
        this.textArea.value = "";
        if (!this.isChatboxShown) {
            this.entityTalking = entity;
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
            this.entityTalking = undefined;
        }
    }

    appendMessage(message, entity_name, class_) {
        const container = document.createElement('div');
        container.classList.add(class_);

        const name_container = document.createElement('div');

        name_container.style.marginBottom = "15px";
        name_container.style.color = "white";
        name_container.style.borderBottom = "2px solid #a77841";
        name_container.innerHTML = entity_name;

        container.appendChild(name_container);
        container.appendChild(document.createTextNode(message));

        this.chatHistory.appendChild(container);
        this.chatHistory.scrollTop = this.chatHistory.scrollHeight;
    }

    showChatBox() {
            this.chatbox.style.left = "0px";
    }

    hideChatBox() {
            this.chatbox.style.left = "-500px";
    }

    changeLevel(levelData) {
        // reload page
        // initialize level 
        // change localstorage currentLevel key to new levelData

        location.reload();

        localStorage.setItem("currentLevel", JSON.stringify(levelData));
        this.initalizeLevel(levelData);
    }

    overlayIn() {
        const overlay = document.getElementById('overlay');
        overlay.style.height = "100%";
        overlay.style.width = "100%";
    }

    overlayOut() {
        const overlay = document.getElementById('overlay');
        overlay.style.height = "0%";
        overlay.style.width = "0%";
    }
}
