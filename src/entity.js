
const gravity = 1;

class Entity extends Sprite {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale
    }) {
        super({
            position,
            imageSrc,
            frameRate,
            scale
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
            height: 10, 
            width: 10
        };
    }

    updateHitBox() {
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

        this.hitbox = {
            position:  {
                x: this.position.x + 20,
                y: this.position.y + 28
            }, 
            height: 32, 
            width: 19
        };
    }

    collisionDetected() {
        this.velocity.y = 0;
    }

    update() {
        this.draw();
        this.updateFrames();
        this.updateHitBox();
        this.position.x += this.velocity.x;
        this.applyGravity();
    }

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }
}


class PlayerEntity extends Entity {
    constructor({
        position,
        imageSrc,
        frameRate,
        scale
    }) {
        super({
            position,
            imageSrc,
            frameRate,
        });
        this.keys = {
            d : {
                pressed : false,
            }, 
            a : {
                pressed : false,
            },
        }  

        this.height /= 3.47;
        this.width /= 3;

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
                    if (this.velocity.y == 0)
                        // jump
                    this.velocity.y -= 15;
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
            }
        });
    }

    update() {
        super.update();

        this.velocity.x = 0;
        if (this.keys.d.pressed)
            this.velocity.x = 10;
        if (this.keys.a.pressed)
            this.velocity.x = -10;
    }
} 

class AIEntity extends Entity {
}
