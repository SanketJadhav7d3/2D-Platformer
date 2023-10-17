
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
    constructor({bg_img_path, floorCollisionData, platformCollisionData, context}) {
        this.image = new Image();
        this.image.src = bg_img_path;
        this.floorCollisionData = floorCollisionData;
        this.platformCollisionData = platformCollisionData;
        this.hasGameStarted = false;
        this.context = context;
        this.entites = [];
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
                if (this.floorCollisionData[i][j] == 66)
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
            context: this.context
        });

        this.woman = new AIEntity({
            position: {x : 200, y : 100}, 
            imageSrc: "./assets/villagers/woman/idle_right.png",
            frameRate: 7,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 6, 
            animation: womanAnimation, 
            context: this.context
        });

        this.hatMan = new AIEntity({
            position: {x : 800, y : 100}, 
            imageSrc: "./assets/villagers/hatman/idle_right.png",
            frameRate: 4,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 13, 
            animation: hatManAnimation, 
            context: this.context
        });

        this.oldman = new AIEntity({
            position: {x : 500, y : 100}, 
            imageSrc: "./assets/villagers/oldman/idle_right.png",
            frameRate: 8,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 6, 
            animation: oldManAnimation, 
            delayAfter: 200, 
            context: this.context
        });

        this.beardedMan = new AIEntity({
            position: {x : 900, y : 100}, 
            imageSrc: "./assets/villagers/bearded/idle_right.png",
            frameRate: 5,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 6, 
            animation: beardedManAnimation, 
            delayAfter: 200, 
            context: this.context
        });
    }

    addEntity(entity) {
        this.entites.push(entity);
    }

    initializeEntites() {
    }

    shouldPanToTheLeft() {
        if (!this.player.keys.d.pressed) return;

        const playerCameraBox = this.player.cameraBox;

        this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        this.context.fillRect(playerCameraBox.x, playerCameraBox.y, playerCameraBox.width, playerCameraBox.height);


        if (playerCameraBox.position.x + playerCameraBox.width >= this.image.width) return;

        // quick fix
        if (playerCameraBox.position.x + playerCameraBox.width >= window.innerWidth / 3 + Math.abs(this.camera.position.x)) {
            var offset = (playerCameraBox.position.x + playerCameraBox.width) - (Math.abs(this.camera.position.x) + window.innerWidth / 3);  
            if (offset > 4)
                this.camera.position.x -= offset;
            this.camera.position.x -= this.player.velocity.x;
        }
    }

    shouldPanToTheRigth() {
        if (!this.player.keys.a.pressed) return;

        const playerCameraBox = this.player.cameraBox;

        if (playerCameraBox.position.x <= 0) return;

        const offset = playerCameraBox.position.x - Math.abs(this.camera.position.x);

        // quick fix
        if (offset < 0)
            this.camera.position.x -= offset;

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
        this.context.drawImage(this.image, 0, 0);


        if (this.hasGameStarted) {
            this.woman.update({ width: this.image.width, height: this.image.height});
            this.oldman.update({ width: this.image.width, height: this.image.height});
            this.beardedMan.update({ width: this.image.width, height: this.image.height});
            this.hatMan.update({ width: this.image.width, height: this.image.height});
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
