
// class Entity {
//   constructor(position, context) {
//     this.position = position;
//     this.dimension = [100, 100];
//     this.context = context;
//     //animation some spritesheet stuff
//   }
// 
//   draw() {
//     this.context.fillStyle = "red";
//     this.context.fillRect(...this.position, ...this.dimension);
//   }
// 
//   update() {
//     this.draw();
//   }
// }

const gravity = 0.5;

class Entity {
  constructor(position, dimension, context) {
    this.context = context;
    this.position = position;
    this.velocity = {
      x : 0, 
      y : 5,
    }
    this.dimension = dimension;
  }

  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.dimension.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity;
    else
      this.velocity.y = 0;
  }
}

class PlayerEntity extends Entity {
  constructor(position, dimension, context) {
    super(position, dimension, context);
    this.keys = {
      d : {
        pressed : false,
      }, 
      a : {
        pressed : false,
      },
    }  

    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case 'a':
          this.keys.a.pressed = true;
          break;
        case 'd':
          this.keys.d.pressed = true;
          break;
        case 'w':
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
      this.velocity.x = 5;
    if (this.keys.a.pressed)
      this.velocity.x = -5;
  }
} 

class AIEntity {
}