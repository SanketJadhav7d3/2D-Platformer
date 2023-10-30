
const gravity = 0.5;

class Entity extends Sprite {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale, 
        collisionBlocks,
        frameBuffer, 
        animation, 
        context
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            frameBuffer, 
            scale,
            context
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
        this.last_direction = "left";
        this.is_attacking = false;
        this.animation = animation;
        
        // animations
        for (let key in this.animation) {
            const image = new Image();
            image.src = this.animation[key].imageSrc;
            this.animation[key].image = image;
        }

        this.currentAnimationKey = "idle_" + this.last_direction;
    }

    updateHitBox() {
    }

    collisionWithOtherEntity(other) {
        if (collision({
            object1: this.hitbox, 
            object2: other.hitbox
        }))
            return true;

        return false;
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

    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    }

    updateHitBox() {
        // this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        // this.context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.hitbox = {
            position:  {
                x: this.position.x + 60,
                y: this.position.y + 55 
            }, 
            height: 48, 
            width: 40
        };
    }

    switchSprite(key) {
        if (this.image == this.animation[key].image || !this.loaded) return;

        this.image = this.animation[key].image;
        this.frameRate = this.animation[key].frameRate;

        if (this.last_direction == "right") this.currentFrame = 0; 
        else this.currentFrame = this.frameRate - 1;
    }

    update({ width, height }) {
        if (this.last_direction == "left") 
            this.updateFramesLeft()
        else
            this.updateFramesRight();

        this.updateHitBox();
        this.draw();
        this.verticalCollision();

        // if (this.velocity.x == 0)
            // this.currentAnimationKey = "idle_" + this.last_direction;
        // else if (this.velocity.x > 0)
            // this.last_direction = "right";
        // else 
            // this.last_direction = "left";

        this.switchSprite(this.currentAnimationKey);
       
        // quick fix
        // don't let the player get out of the window
        if ((this.hitbox.position.x + this.hitbox.width >= width - 50 && this.velocity.x > 0)
        || (this.hitbox.position.x <= 50 && this.velocity.x < 0)) {
            this.action = 1;
            this.velocity.x = 0;
        }

        this.position.x += this.velocity.x;


        this.applyGravity();
    }

    // static method to create an entity instance 
    static createEntity(context, collisionBlocks, entityData) {

        entityData["context"] = context;
        entityData["collisionBlocks"] = collisionBlocks;

        return new Entity(entityData);
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
        animation, 
        context
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale,
            collisionBlocks,
            frameBuffer, 
            animation, 
            context
        });

        this.keys = {
            d : {
                pressed : false,
            }, 
            a : {
                pressed : false,
            },
        };

        this.attack_no = 1;

//         // animations
//         for (let key in this.animation) {
//             const image = new Image();
//             image.src = this.animation[key].imageSrc;
//             this.animation[key].image = image;
//         }
 
        this.height /= 3.47;
        this.width /= 3;
        this.currentAnimationKey = "idle_" + this.last_direction;
        this.cameraBox = {
            position: {
                x: this.position.x, 
                y: this.position.y
            }, 
            width: 200, 
            height: this.image.height
        };

        this.keysDisabled = false; 
        // add keyboard inputs
        window.addEventListener("keydown", this.keyDownHandler.bind(this));
        window.addEventListener("keyup", this.keyUpHandler.bind(this));
        window.addEventListener("keypress", this.keyPressHandler.bind(this));
    }

    keyDownHandler(e) {
        if (this.keysDisabled) return;
        switch (e.key) {
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
                    this.velocity.y -= 11;
                    this.jump = true;
                }
                break;
        }
    }

    keyUpHandler(e) {
        if (this.keysDisabled) return;
        switch (e.key) {
            case 'a':
                this.keys.a.pressed = false;
                break;
            case 'd':
                this.keys.d.pressed = false;
                break;
        }
    }

    keyPressHandler(e) {
        if (this.keysDisabled) return;
        switch (e.key) {
            case 'j':
                this.is_attacking = true;
                this.currentAnimationKey = "attack_3_" + this.last_direction;
                if (!this.jump) this.velocity.x = 0;
                break;
            case 'k':
                this.is_attacking = true;
                this.currentAnimationKey = "attack_2_" + this.last_direction;
                if (!this.jump) this.velocity.x = 0;
                break;
            case 'l':
                this.is_attacking = true;
                this.currentAnimationKey = "attack_1_" + this.last_direction;
                if (!this.jump) this.velocity.x = 0;
                break;
        }
    }

    updateCameraBox() {
        // this.context.fillStyle = "rgba(255, 255, 0, 0.5)";
        // this.context.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height);

        this.cameraBox = {
            position: {
                x: this.position.x - 120, 
                y: this.position.y
            }, 
            width: 400, 
            height: this.image.height
        }
    }

    update({ width, height }) {
        // draw camerabox
        // super.update({ width, height });
        
        if (this.last_direction == "left") 
            this.updateFramesLeft();
        else
            this.updateFramesRight();

        this.updateHitBox();
        this.draw();
        this.verticalCollision();

        this.position.x += this.velocity.x;

        this.applyGravity();
        this.updateCameraBox();
        
        // quick fix
        // don't let the player get out of the window
        if ((this.hitbox.position.x + this.hitbox.width >= width && this.velocity.x > 0)
        || (this.hitbox.position.x <= 0 && this.velocity.x < 0))
            this.velocity.x = 0;

        if (!this.jump)
            this.velocity.x = 0;
        if (this.last_direction == "right" && this.is_attacking && this.currentFrame != this.frameRate - 1) {
            this.switchSprite(this.currentAnimationKey);
            
            // quick fix
            // don't let the player get out of the window
            // if ((this.keys.d.pressed && this.hitbox.position.x + this.hitbox.width >= width - 20)
            // || (this.keys.a.pressed && this.hitbox.position.x <= 0))
                // this.velocity.x = 0;

            // this.updateCameraBox();

            return;

        } else if (this.last_direction == "left" && this.is_attacking && this.currentFrame != 0) {
            this.switchSprite(this.currentAnimationKey);
            
            // quick fix
            // don't let the player get out of the window
            // if ((this.keys.d.pressed && this.hitbox.position.x + this.hitbox.width >= width - 20)
            // || (this.keys.a.pressed && this.hitbox.position.x <= 0))
                // this.velocity.x = 0;

            // this.updateCameraBox();

            return;
        } else {
            this.is_attacking = false;
        }

        this.velocity.x = 0;
        if (this.keys.d.pressed && !this.is_attacking) {
            this.velocity.x = 6;
            this.currentAnimationKey = "run_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
        }
        if (this.keys.a.pressed && !this.is_attacking) {
            this.velocity.x = -6;
            this.currentAnimationKey = "run_" + this.last_direction;
            this.switchSprite(this.currentAnimationKey);
        }

        // change direction
        if (this.velocity.x > 0)
            this.last_direction = "right";
        if (this.velocity.x < 0)
            this.last_direction = "left";

        if (this.velocity.x == 0 && (this.velocity.y == 0.5)) 
            this.switchSprite("idle_" + this.last_direction);

        if (this.jump) {
            if (this.velocity.y < 0)
                this.switchSprite("jump_" + this.last_direction);
            else
                this.switchSprite("fall_" + this.last_direction);
        }

        // quick fix
        // don't let the player get out of the window
        if ((this.keys.d.pressed && this.hitbox.position.x + this.hitbox.width >= width - 20)
        || (this.keys.a.pressed && this.hitbox.position.x <= 0))
            this.velocity.x = 0;
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
        animation, 
        delayAfter = 1, 
        context
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale,
            collisionBlocks,
            frameBuffer, 
            animation, 
            context
        });
        this.height /= 3.47;
        this.width /= 3;
        this.hitbox = {
            position:  {
                x: this.position.x,
                y: this.position.y
            }, 
            height: 11, 
            width: 10
        };
        this.frames = 0;
        this.delayAfter = delayAfter;
        this.talkButton = document.createElement('button');
    }

    updateHitBox() {
    //    this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
    //    this.context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
    //    this.hitbox = {
    //        position:  {
    //            x: this.position.x + 10,
    //            y: this.position.y + 35
    //        }, 
    //        height: 55, 
    //        width: 50
    //    };
    }

    updateFramesRight() {
        // super messy code alert
        if (this.currentAnimationKey == "idle_right") {
            if (this.currentFrame != this.frameRate - 1)
                super.updateFramesRight();
            else {
                this.frames += 1;
                this.currentFrame = this.frameRate - 1;
                if (this.frames == this.delayAfter) {
                    this.frames = 0;
                    this.currentFrame = 0;
                }
            }
        } else 
            super.updateFramesRight();
    }

    updateFramesLeft() {
        // super messy code alert
        if (this.currentAnimationKey == "idle_left") {
            if (this.currentFrame != 0)
                super.updateFramesLeft();
            else {
                this.frames += 1;
                this.currentFrame = 0;
                if (this.frames == this.delayAfter) {
                    this.frames = 0;
                    this.currentFrame = this.frameRate - 1;
                }
            }
        } else 
            super.updateFramesLeft();
    }

    // static method to create an entity instance 
    static createEntity(context, collisionBlocks, entityData) {

        entityData["context"] = context;
        entityData["collisionBlocks"] = collisionBlocks;

        return new AIEntity(entityData);
    }
}


class AIVillager extends AIEntity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale,
        collisionBlocks,
        frameBuffer, 
        animation, 
        delayAfter = 1, 
        context
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale,
            collisionBlocks,
            frameBuffer, 
            animation, 
            context
        });
        this.height /= 3.47;
        this.width /= 3;
        this.hitbox = {
            position:  {
                x: this.position.x,
                y: this.position.y
            }, 
            height: 11, 
            width: 10
        };
        this.frames = 0;
        this.delayAfter = delayAfter;
        this.talkButton = document.createElement('button');
        this.talkButton.setAttribute('class', 'medieval-button');
        this.talkButton.style.position = "absolute";
        this.talkButton.style.top = (this.position.y * 6) + "px";
        this.talkButton.style.left = (this.position.x * 3) + "px";
        this.talkButton.style.zIndex = 2;
        this.talkButton.textContent = "Talk";

        this.talkButton.addEventListener("click", () => {
            game.toggleChatBox();
        })

        this.action = 1;
        this.buffer = 200;
        this.elapsed = 0;
    }

    moveLeft() {
        this.velocity.x = -3;
        this.last_direction = "left";
        this.currentAnimationKey = "walk_" + this.last_direction;
    }

    moveRight() {
        this.velocity.x = 3;
        this.last_direction = "right";
        this.currentAnimationKey = "walk_" + this.last_direction;
    }

    stayStill() {
        this.velocity.x = 0;
        this.currentAnimationKey = "idle_" + this.last_direction;
    }

    removeTalkButton() {
        var container = document.getElementById("container");
        if (container.contains(this.talkButton)) 
            container.removeChild(this.talkButton)
    }

    addTalkButton() {
        var container = document.getElementById("container");
        if (!document.body.contains(this.talkButton)) 
            container.appendChild(this.talkButton);
            // document.body.appendChild(this.talkButton)
    }

    updateHitBox() {
        // this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        // this.context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.hitbox = {
            position:  {
                x: this.position.x,
                y: this.position.y
            }, 
            height: 50, 
            width: 40
        };
    }

    updateTalkButton(cameraX) {
        this.talkButton.style.left = ((this.position.x + cameraX) * 3 ) + "px";
    }
//
//    updateFramesRight() {
//        if (this.currentFrame != this.frameRate - 1)
//            super.ipdateFramesRight();
//        else {
//            this.frames = this.frames += 1;
//            this.currentFrame = this.frameRate - 1;
//            if (this.frames == this.delayAfter) {
//                this.frames = 0;
//                this.currentFrame = 0;
//            }
//        }
//    }
   
    update({ width, height }) {
        if (this.elapsed == 0) {
                const randomValue = Math.random();

                if (randomValue < 0.9)
                    this.action = 1;
                else if (randomValue < 0.95)
                    this.action = 0
                else
                    this.action = 2;

            if (this.action == 0)
                this.moveLeft();
            else if (this.action == 1)
                this.stayStill();
            else
                this.moveRight();

        }

        this.elapsed = (this.elapsed + 1) % this.buffer;

        super.update({ width, height });
    }

    // static method to create an entity instance 
    static createEntity(context, collisionBlocks, entityData) {

        entityData["context"] = context;
        entityData["collisionBlocks"] = collisionBlocks;

        return new AIVillager(entityData);
    }
}

class BossEnemy extends Entity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale,
        collisionBlocks,
        frameBuffer, 
        animation, 
        delayAfter = 1, 
        context
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale,
            collisionBlocks,
            frameBuffer, 
            animation, 
            context
        });
        this.height /= 3.47;
        this.width /= 3;
        this.hitbox = {
            position:  {
                x: this.position.x,
                y: this.position.y
            }, 
            height: 11, 
            width: 10
        };
        this.frames = 0;
        this.delayAfter = delayAfter;
        this.talkButton = document.createElement('button');
    }

    updateHitBox() {
        this.context.fillStyle = "rgba(0, 255, 0, 0.5)";
        this.context.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);
        this.hitbox = {
            position:  {
                x: this.position.x + 10,
                y: this.position.y + 35
            }, 
            height: 55, 
            width: 50
        };
    }

//    updateFramesRight() {
//        if (this.currentFrame != this.frameRate - 1)
//            super.updateFramesRight();
//        else {
//            this.frames = this.frames += 1;
//            this.currentFrame = this.frameRate - 1;
//            if (this.frames == this.delayAfter) {
//                this.frames = 0;
//                this.currentFrame = 0;
//            }
//        }
//    }
   
    // static method to create an entity instance 
    static createEntity(context, collisionBlocks, entityData) {

        entityData["context"] = context;
        entityData["collisionBlocks"] = collisionBlocks;

        return new BossEnemy(entityData);
    }
}

