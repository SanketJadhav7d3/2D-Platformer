

class ChatBox {
    constructor() {
        this.chatbox = document.getElementsByClassName("chatbox")[0];
        this.chatHistory = document.getElementsByClassName("chatHistory")[0];
        this.submit_button = document.getElementById("submit-button");
        this.leave_button = document.getElementById("leave-button");
        this.isChatboxShown = false;
        this.textArea = document.querySelector("input");
    }

    updateChatBox(chatHistory) {
        // add chat to chathistory
        this.removeChatHistory();

        for (let key in chatHistory) {
            const playerChat = document.createElement('div');
            playerChat.classList.add('player-chat');

            const npcChat = document.createElement('div');
            npcChat.classList.add('npc-chat');

            playerChat.innerHTML = (chatHistory[key]['player']);

            this.chatHistory.appendChild(playerChat);
        }
    }
    
    removeChatHistory() {
        while (this.chatHistory.firstChild)
            this.chatHistory.removeChild(this.chatHistory.firstChild);
    }

    toggleChatBox(chatHistory, entity) {
        // clear text
        this.submit_button.addEventListener('click', () => { entity.sendSimpleText() });

        this.textArea.value = "";
        if (!this.isChatboxShown) {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "0px";
            this.textArea.focus();
            // disable player inputs 
            this.currentLevel.player.keysDisabled = true;
            this.updateChatBox(chatHistory);
        } else {
            this.isChatboxShown = !this.isChatboxShown;
            this.chatbox.style.left = "-700px";
            this.textArea.blur();
            this.currentLevel.player.keysDisabled = false;
            // remove chathistory 
            this.removeChatHistory();
        }
    }

    appendMessageToChat(message, class_) {
        // create div 
        const container = document.createElement('div');

        container.classList.add(class_)

        container.innerHTML = message;

        this.chatHistory.appendChild(playerChat);
    }

    showChatBox() {
            this.chatbox.style.left = "0px";
    }

    hideChatBox() {
            this.chatbox.style.left = "-500px";
    }
}
