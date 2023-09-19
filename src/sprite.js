
class Sprite {
  constructor ({position,  img_path, context, dimension}) {
    this.position = position;
    this.dimension = dimension;
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
    if (this.dimension)
      this.context.drawImage(this.image, this.position.x, this.position.y, this.dimension.width, this.dimension.height);
    else
      this.context.drawImage(this.image, this.position.x, this.position.y);
  }
}
