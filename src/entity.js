
const gravity = 0.5;

class Entity extends Sprite {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale, 
        collisionBlocks,
        frameBuffer
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale,
            frameBuffer
        });
        this.velocity = {
            x : 0, 
            y : 5,
        };
        this.hitbox = {
            position:  {
                x: this.position.x,
                y: this.position.y
            }, 
            height: 11, 
            width: 10
        };
        this.collisionBlocks = collisionBlocks;
        this.jump = false;
        this.last_direction = "right";
        this.is_attacking = false;
    }

    updateHitBox() {
        // ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        // ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

        this.hitbox = {
            position:  {
                x: this.position.x + 110,
                y: this.position.y + (250 / 2) - 7
            }, 
            height: 48, 
            width: 40
        };
    }

    verticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = collisionBlock.position.y - offset - 0.01
                    this.jump = false;
                    break;
                }
                //if (this.velocity.y < 0) {
                //    this.velocity.y = 0
                //    const offset = this.hitbox.position.y - this.position.y
                //    this.position.y =
                //        collisionBlock.position.y + collisionBlock.height - offset + 0.01
                //    this.onground = true;
                //    break;
                //}
            }
        }
    }

    collisionDetected() {
        if (this.velocity.y > 0)
            this.velocity.y = 0;
    }

    update() {
        if (this.currentAnimationKey == "attack_left") 
            this.updateFramesLeft();
        else
            this.updateFramesRight();

        this.updateHitBox();
        this.draw();

        this.verticalCollision();
        this.position.x += this.velocity.x;
        this.applyGravity();
    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }
}


class PlayerEntity extends Entity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale,
        collisionBlocks,
        frameBuffer
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            collisionBlocks,
            frameBuffer
        });
        this.keys = {
            d : {
                pressed : false,
            }, 
            a : {
                pressed : false,
            },
        };

        // animations
        for (let key in playerAnimation) {
            const image = new Image();
            image.src = playerAnimation[key].imageSrc;
            playerAnimation[key].image = image;
        }

        this.height /= 3.47;
        this.width /= 3;
        this.currentAnimationKey = "idle_" + this.last_direction;

        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'a':
                    this.keys.a.pressed = true;
                    break;
                case 'd':
                    this.keys.d.pressed = true;
                    break;
                case 'w':
                    // check if player on ground
                    if (!this.jump) {
                        this.velocity.y -= 10;
                        this.jump = true;
                    }
                    break;
                case 'e':
                    this.is_attacking = true;
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case 'a':
                    this.keys.a.pressed = false;
                    break;
                case 'd':
                    this.keys.d.pressed = false;
                    break;
                case 'e':
                    this.is_attacking = false;
                    break;
            }
        });
    }

    switchSprite(key) {
        if (this.image == playerAnimation[key].image || !this.loaded) return;
        this.currentFrame = 0; // makes sure that next sprite animation 
                                // starts from the start of the spritesheet
        this.image = playerAnimation[key].image;
        this.frameRate = playerAnimation[key].frameRate;
    }

    update() {
        super.update();

        this.velocity.x = 0;
        if (this.keys.d.pressed) {
            this.velocity.x = 3;
            this.currentAnimationKey = "run_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
        }
        if (this.keys.a.pressed) {
            this.velocity.x = -3;
            this.currentAnimationKey = "run_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
        }
        
        // change direction
        if (this.velocity.x > 0)
            this.last_direction = "right";
        if (this.velocity.x < 0)
            this.last_direction = "left";

        if (this.is_attacking) {
            this.currentAnimationKey = "attack_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
            return;
        }

        console.log(this.jump);
        if (this.jump) {
            this.switchSprite("jump_" + this.last_direction);
            return;
        }

        if (this.velocity.x == 0 && (this.velocity.y == 0.5)) 
            this.switchSprite("idle_" + this.last_direction);
    }
} 

