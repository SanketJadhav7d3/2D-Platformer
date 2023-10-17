
const mainPlayer = {
    position: {x : 100, y : 100}, 
    imageSrc: "./assets/Warrior/idle_right.png",
    frameRate: 10,
    scale: 2,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: fantasyAnimation, 
};

const woman = {
    position: {x : 200, y : 100}, 
    imageSrc: "./assets/villagers/woman/idle_right.png",
    frameRate: 7,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: womanAnimation, 
}

const beardedMan = {
    position: {x : 900, y : 100}, 
    imageSrc: "./assets/villagers/bearded/idle_right.png",
    frameRate: 5,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: beardedManAnimation, 
    delayAfter: 200, 
} 

const oldman = {
    position: {x : 500, y : 100}, 
    imageSrc: "./assets/villagers/oldman/idle_right.png",
    frameRate: 8,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: oldManAnimation, 
    delayAfter: 200, 
}

const hatMan = {
    position: {x : 800, y : 100}, 
    imageSrc: "./assets/villagers/hatman/idle_right.png",
    frameRate: 4,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 13, 
    animation: hatManAnimation, 
}; 
