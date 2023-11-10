
// class API 

// send api request with trigger
// fetch chat history
// move 

// instead of passing entity object pass entitydata

class NPCBehaviour {
    constructor(context, collisionBlocks, entityData) {
        this.context = context;
        this.collisionBlocks = collisionBlocks;
        this.entityData = entityData;
        this.headers = headers;

        this.controller = NPCController.createEntity(this.context, this.collisionBlocks, this.entityData);

        // inworld open session

        this.name = this.entityData.name;

        this.url = 'https://studio.inworld.ai/v1/' + this.entityData.characterID + ':openSession';

        // get chats from localstorage
        const storedData = localStorage.getItem(this.name);
        this.chatHistory = storedData ? JSON.parse(storedData) : {};
        this.conversation_no = 0;

        this.submit_button = document.getElementById("submit-button");

        // this.submit_button.addEventListener('click', () => {
            // this.sendSimpleText();
            // game.updateChatBox();
        // });

        this.controller.talkButton.addEventListener('click', () => {
            game.toggleChatBox(this.chatHistory, this);
        });
    }

    sendSimpleText() {
        const url = 'https://studio.inworld.ai/v1/' + this.entityData.characterID + ':simpleSendText';

        // make post request 
        const myObj = {
            "text": game.textArea.value
        }

        fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(myObj)
        }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed');
                }
            })
            .then(data => {
                this.chatHistory[this.conversation_no] = {
                    player: game.textArea.value, 
                    [this.name]: data.textList.join('')
                };

                game.textArea.value = "";

                game.appendMessage(data.textList.join(''), this.name, 'npc-chat');

                localStorage.setItem(this.name, JSON.stringify(this.chatHistory));
                this.conversation_no += 1;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    greetFromOther(greeting) {
    }
}


class EntityLogicGroup {
    constructor({entities}) {
        this.entities = entities;
        this.buffer = 0;
    }

    // they would interact with each other
    update() {
        this.entities.forEach((entity) => {
            if (this.buffer == 0) {
                const randomValue = Math.random();

                if (randomValue < 0.7)
                    entity.action = 1;
                else if (randomValue < 0.85)
                    entity.action = 0
                else
                    entity.action = 2;
            }

            this.buffer = (this.buffer + 1) % 50;

            if (entity.action == 0)
                entity.moveLeft();
            else if (entity.action == 1)
                entity.stayStill();
            else
                entity.moveRight();
        });

    }
}
