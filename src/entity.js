
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

const gravity = 1;

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

  //  collisionDetection(object) {
  //    // vertical collision
  //    return (this.position.y + this.dimension.height >= object.position.y &&
  //            this.position.y <= object.position.y + object.dimension.height &&
  //            this.position.x <= object.position.x + object.dimension.width &&
  //            this.position.x + this.dimension.width >= object.position.x
  //    );
  // }
  collisionDetected() {
    this.velocity.y = 0;
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.applyGravity();
  }

  applyGravity() {
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }
}

class PlayerEntity extends Entity {
  constructor({position, dimension, context}) {
    super(position, dimension, context);
    this.keys = {
      d : {
        pressed : false,
      }, 
      a : {
        pressed : false,
      },
    }  

    this.dimension.height /= 3.47;
    this.dimension.width /= 3;

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
            this.velocity.y -= 25;
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
    
//
//    this.collisionTiles.forEach(tile => {
//      if (this.collisionDetection(tile)) {
//        if (this.velocity.y > 0)
//          this.velocity.y = 0
//      }
//    })
//
    this.velocity.x = 0;
    if (this.keys.d.pressed)
      this.velocity.x = 10;
    if (this.keys.a.pressed)
      this.velocity.x = -10;
  }
} 

class AIEntity extends Entity {
}
