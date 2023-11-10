
const mainPlayer = {
    position: {x : 100, y : 100}, 
    imageSrc: "./assets/Warrior/idle_right.png",
    frameRate: 10,
    scale: 2,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 5, 
    animation: fantasyAnimation, 
    hitBoxOffset: {
        x: 50, 
        y: 60
    } 
};

const woman = {
    position: {x : 200, y : 100}, 
    imageSrc: "./assets/villagers/woman/idle_right.png",
    frameRate: 7,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: womanAnimation, 
    hitBoxOffset: {
        x: 0, 
        y: 0
    }, 
    name: "Elevyn", 
    characterID: 'workspaces/default-fxnni5br2akopyesf06yuw/characters/evelyn'
}

const beardedMan = {
    position: {x : 1000, y : 100}, 
    imageSrc: "./assets/villagers/bearded/idle_right.png",
    frameRate: 5,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 6, 
    animation: beardedManAnimation, 
    delayAfter: 200, 
    hitBoxOffset: {
        x: 0, 
        y: 0
    }, 
    name: "Elias", 
    characterID: 'workspaces/default-fxnni5br2akopyesf06yuw/characters/elias'
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
    hitBoxOffset: {
        x: 0, 
        y: 5
    }, 
    name: 'Gareth', 
    characterID: 'workspaces/default-fxnni5br2akopyesf06yuw/characters/gareth'
}

const hatMan = {
    position: {x : 800, y : 100}, 
    imageSrc: "./assets/villagers/hatman/idle_right.png",
    frameRate: 4,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 10, 
    animation: hatManAnimation, 
    hitBoxOffset: {
        x: 0, 
        y: -5
    },
    name: 'Lucas',
    characterID: 'workspaces/default-fxnni5br2akopyesf06yuw/characters/lucas'
}; 

const bossData = {
    position: {x : 800, y : 100}, 
    imageSrc: "./assets/Enemies/Boss/idle_right.png",
    frameRate: 8,
    scale: 1,
    collisionBlocks: this.floorCollisionBlocks,
    frameBuffer: 10, 
    animation: bossAnimation, 
    hitBoxOffset: {
        x: 0, 
        y: 0
    } 
}
