
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
    constructor({bg_img_path, floorCollisionData, platformCollisionData}) {
        this.image = new Image();
        this.image.src = bg_img_path;
        this.floorCollisionData = floorCollisionData;
        this.platformCollisionData = platformCollisionData;
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
            imageSrc: "./assets/PlayerSprite/idle_right.png",
            frameRate: 8,
            scale: 1,
            collisionBlocks: this.floorCollisionBlocks,
            frameBuffer: 6, 
            animation: playerAnimation
        });
        this.entites = [this.player];
    }

    shouldPanToTheLeft() {
        if (!this.player.keys.d.pressed) return;

        const playerCameraBox = this.player.cameraBox;

        if (playerCameraBox.position.x + playerCameraBox.width >= this.image.width - 20)
            return;

        if (this.camera.position.x + playerCameraBox.position.x + playerCameraBox.width >= window.innerWidth / 3)
            this.camera.position.x -= this.player.velocity.x;
    }

    shouldPanToTheRigth() {
        if (!this.player.keys.a.pressed) return;

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
        ctx.save();
        ctx.scale(this.scalingFactor.x, this.scalingFactor.y);
        // draw floorCollision and platformCollision
        ctx.translate(this.camera.position.x, this.camera.position.y);
        ctx.drawImage(this.image, 0, 0);

        this.shouldPanToTheRigth();
        this.shouldPanToTheLeft();


        this.player.update({ width: this.image.width, height: this.image.height});
//
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

        this.floorCollisionBlocks.forEach((tile) => {
            // tile.draw();
        });

        ctx.restore();
    }
}
