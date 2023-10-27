


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

