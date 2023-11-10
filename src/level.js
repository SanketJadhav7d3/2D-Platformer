
class Tile {
    constructor ({position}) {
        this.position = position;
        this.height = 16;
        this.width = 16;
    }

    draw() {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Level {
    constructor({
        bg_img_path, 
        mg_img_path=null, 
        fg_img_path=null,
        floorCollisionData,
        platformCollisionData,
        context,
        playerData, 
        AIEntitiesData,
        EnemyEntitiesData, 
        apiData
    }) 
    {
        this.image = new Image();
        this.image.src = bg_img_path;

        if (mg_img_path) {
            this.mg_image = new Image();
            this.mg_image.src = mg_img_path;
            this.mg_image.width = this.image.width / 3;
        }

        if (fg_img_path) {
            this.fg_image = new Image();
            this.fg_image.src = fg_img_path;
        }

        this.floorCollisionData = floorCollisionData;
        this.platformCollisionData = platformCollisionData;
        this.hasGameStarted = false;
        this.context = context;
        this.entities = [];
        this.playerData = playerData;
        this.AIEntitiesData = AIEntitiesData;
        this.EnemyEntitiesData = EnemyEntitiesData;
        this.camera = {
            position: {
                x: 0, 
                y: 0
            }
        }

        this.scalingFactor = {
            x: 3,
            y: 3.47
        }

        // initialize floor and platformer collision
        this.floorCollisionBlocks = [];
        for (var i = 0; i < this.floorCollisionData.length; i++) {
            for (var j = 0; j < this.floorCollisionData[0].length; ++j) {
                if (this.floorCollisionData[i][j] != 0)
                    this.floorCollisionBlocks.push(
                        new Tile({
                            position: {
                                x: j * 16,
                                y: i * 16
                            }
                        })
                    );
            }
        }

        this.player = new PlayerEntity({
            position: {x : 100, y : 100}, 
            imageSrc: "./assets/Warrior/idle_right.png",
            frameRate: 10,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 6, 
            animation: fantasyAnimation, 
            context: this.context, 
            hitBoxOffset: {
                x: -60, 
                y: -55
            }
        });

        //this.womanNPC = new NPCBehaviour(context, this.floorCollisionBlocks, AIEntitiesData[0], eliasAPIdata);

        this.AIEntitiesData.forEach((entityData) => {
            this.entities.push(new NPCBehaviour(context, this.floorCollisionBlocks, entityData));
        });

        this.EnemyEntitiesData.forEach((entityData) => {
            this.entities.push(BossEnemy.createEntity(context, this.floorCollisionBlocks, entityData));
        });

        this.logicEntites = new EntityLogicGroup({entities: this.entities});
    }

    addEntity(entity) {
        this.entites.push(entity);
    }

    initializeEntites() {
    }

    shouldPanToTheLeft() {
        if (!this.player.keys.d.pressed && !this.player.jump || this.player.keys.a.pressed) return;

        const playerCameraBox = this.player.cameraBox;

        this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        this.context.fillRect(playerCameraBox.x, playerCameraBox.y, playerCameraBox.width, playerCameraBox.height);

        if (playerCameraBox.position.x + playerCameraBox.width >= this.image.width) return;

        // quick fix
        if (playerCameraBox.position.x + playerCameraBox.width >= window.innerWidth / 3 + Math.abs(this.camera.position.x)) {
            this.camera.position.x -= this.player.velocity.x;
        }
    }

    shouldPanToTheRigth() {
        if (!this.player.keys.a.pressed && !this.player.jump || this.player.keys.d.pressed) return;

        const playerCameraBox = this.player.cameraBox;

        if (playerCameraBox.position.x <= 0) return;

        if (playerCameraBox.position.x <= Math.abs(this.camera.position.x))
            this.camera.position.x -= this.player.velocity.x;
    }

    collision({object1, object2}) {
        return (
            object1.position.y + object1.height >= object2.position.y &&
            object1.position.y <= object2.position.y + object2.height &&
            object1.position.x + object1.width >= object2.position.x &&
            object1.position.x <= object2.position.x + object2.width
        );
    }

    drawBackground() {
        this.context.save();
        this.context.scale(this.scalingFactor.x, this.scalingFactor.y);
        // draw floorCollision and platformCollision
        this.context.translate(this.camera.position.x, this.camera.position.y);
        this.context.clearRect(0, 0, this.image.width, this.image.height);

        if (this.mg_image)
            this.context.drawImage(this.mg_image, Math.abs(this.camera.position.x) * 0.96, 0, 1920 / 2.8, this.image.height);

        if (this.fg_image)
            this.context.drawImage(this.fg_image, Math.abs(this.camera.position.x) * 0.89, 0, 1920, this.fg_image.height);

        this.context.drawImage(this.image, 0, 0);

        if (this.hasGameStarted) {

            // update logic
            // this.logicEntites.update();

            this.entities.forEach((entity) => {
                entity.controller.update({ width: this.image.width, height: this.image.height});
                entity.controller.updateTalkButton(this.camera.position.x);
                    if (collision({object1: this.player.hitbox, object2: entity.controller.hitbox})) 
                    entity.controller.addTalkButton();
                else
                    entity.controller.removeTalkButton();
            });

            this.player.update({ width: this.image.width, height: this.image.height});
        }

        this.shouldPanToTheRigth();
        this.shouldPanToTheLeft();

        // this.context.fillStyle = "rgba(0, 0, 255, 0.5)";
        // this.context.fillRect(Math.abs(this.camera.position.x), this.camera.position.y, window.innerWidth / 3, window.innerHeight);

//        this.floorCollisionBlocks.forEach((tile) => {
//            if (this.collision({
//                object1: this.entites[0].hitbox, 
//                object2: tile
//            })) {
//                this.entites[0].updateHitBox();
//                this.entites[0].collisionDetected();
//                const offset = this.entites[0].hitbox.position.y - this.entites[0].position.y + this.entites[0].hitbox.height
//                this.entites[0].position.y = tile.position.y - offset - 0.1;
//            }
//        });

        // this.floorCollisionBlocks.forEach((tile) => {
            // tile.draw();
        // });
        this.context.restore();
    }
}
