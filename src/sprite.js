
class Sprite {
  constructor (position, img_path, context) {
    this.position = position;
    this.image = new Image();
    this.loaded = false;
    this.image.onload = () => {
      this.loaded = true;
    }
    this.image.src = img_path;
    this.context = context;
    console.log("image");
  }

  draw() {
    if (!this.loaded) return;
    this.context.drawImage(this.image, this.position.x, this.position.y, window.innerWidth, window.innerHeight);
  }
}

class Tile extends Sprite {
  collision() {

  }
  draw() {

  }
}
