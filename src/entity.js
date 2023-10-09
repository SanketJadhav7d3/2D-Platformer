
const gravity = 0.5;

class Entity extends Sprite {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale, 
        collisionBlocks,
        frameBuffer, 
        animation
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
        this.animation = animation;
    }

    updateHitBox() {
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

    update({ width, height }) {
        if (this.currentAnimationKey == "attack_left") 
            this.updateFramesLeft();
        else
            this.updateFramesRight();

        this.updateHitBox();
        this.draw();

        this.verticalCollision();
        
        // stop player from going out of the screen
        if ((this.keys.d.pressed && this.hitbox.position.x + this.hitbox.width >= width - 20)
        || (this.keys.a.pressed && this.hitbox.position.x <= 0))
            this.velocity.x = 0;

        this.position.x += this.velocity.x;

        this.applyGravity();

    }

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    switchSprite(key) {
        if (this.image == this.animation[key].image || !this.loaded) return;
        this.currentFrame = 0; // makes sure that next sprite animation 
                                // starts from the start of the spritesheet
        this.image = this.animation[key].image;
        this.frameRate = this.animation[key].frameRate;
    }

}


class PlayerEntity extends Entity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale,
        collisionBlocks,
        frameBuffer, 
        animation
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            collisionBlocks,
            frameBuffer, 
            animation
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
        for (let key in this.animation) {
            const image = new Image();
            image.src = this.animation[key].imageSrc;
            this.animation[key].image = image;
        }

        this.height /= 3.47;
        this.width /= 3;
        this.currentAnimationKey = "idle_" + this.last_direction;

        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'a':
                    if (!this.is_attacking)
                        this.keys.a.pressed = true;
                    break;
                case 'd':
                    if (!this.is_attacking)
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
                    if (!this.keys.a.pressed && !this.keys.d.pressed && !this.jump)
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

        this.cameraBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            }, 
            width: 200, 
            height: this.image.height
        }
    }

    updateCameraBox() {
        this.cameraBox = {
            position: {
                x: this.position.x - 70, 
                y: this.position.y
            }, 
            width: 400, 
            height: this.image.height
        }
    }

    update({ width, height }) {

        // draw camerabox
        super.update({ width, height });
        this.updateCameraBox();

        this.velocity.x = 0;
        if (this.keys.d.pressed) {
            this.velocity.x = 5;
            this.currentAnimationKey = "run_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
        }
        if (this.keys.a.pressed) {
            this.velocity.x = -5;
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

        if (this.jump) {
            this.switchSprite("jump_" + this.last_direction);
            return;
        }

        if (this.velocity.x == 0 && (this.velocity.y == 0.5)) 
            this.switchSprite("idle_" + this.last_direction);
    }
} 


class AIEntity extends Entity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale,
        collisionBlocks,
        frameBuffer, 
        animation
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            collisionBlocks,
            frameBuffer, 
            animation
        });
        this.height /= 3.47;
        this.width /= 3;
    }
}
