
class Animation {

}

class AIEntity {

}

class PlayerEntity {
  constructor(position, context) {
    this.position = position;
    this.dimension = [100, 100];
    this.context = context;
  }

  draw() {
    this.context.fillStyle = "red";
    this.context.fillRect(...this.position, ...this.dimension);
  }

  update() {
    this.draw();
  }
}
