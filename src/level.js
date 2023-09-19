
class Tile {
  constructor ({context, position}) {
    this.context = context;
    this.position = position;
    this.dimension = {width: 16, height: 16};
  }

  draw() {
    this.context.fillStyle = "rgba(255, 0, 0, 0.5)";
    this.context.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height);
  }
}

class Level {
  constructor({context, bg_img_path, floorCollisionData, platformCollisionData, entites}) {
    this.context = context;
    this.entites = entites;
    this.image = new Image();
    this.image.src = bg_img_path;
    this.floorCollisionData = floorCollisionData;
    this.platformCollisionData = platformCollisionData;

    // initialize floor and platformer collision
    this.floorCollisionTiles = [];
    for (var i = 0; i < this.floorCollisionData.length; i++) {
      for (var j = 0; j < this.floorCollisionData[0].length; ++j) {
        if (this.floorCollisionData[i][j] == 66)
          this.floorCollisionTiles.push(
            new Tile({
              context: this.context,
              position: {
                x: j * 16,
                y: i * 16
              }
            })
          );
      }
    }
  
//
//    this.platformCollisionTiles = [];
//    for (var i = 0; i < this.platformCollisionData.length; i++) {
//      for (var j = 0; j < this.platformCollisionData[0].length; ++j) {
//        if (this.platformCollisionData[i][j] == 66)
//          this.platformCollisionTiles.push(
//            new Tile({
//              context: this.context,
//              position: {
//                x: j * 16,
//                y: i * 16
//              }
//            })
//          );
//      }
//    }
//

  }

  collision({object1, object2}) {
    return (
      object1.position.y + object1.dimension.height >= object2.position.y 
    )
  }

  drawBackground() {
    this.context.save();
    this.context.scale(3, 3.47);
    // draw floorCollision and platformCollision
    this.context.drawImage(this.image, 0, 0);

    this.entites[0].update();

    this.floorCollisionTiles.forEach((tile) => {
      if (this.collision({
        object1: this.entites[0], 
        object2: tile
      })) {
        this.entites[0].collisionDetected();
        this.entites[0].position.y = tile.position.y - this.entites[0].dimension.height;
      }
    });

    this.floorCollisionTiles.forEach((tile) => {
      tile.draw();
    });
    this.context.restore();
  }
}
