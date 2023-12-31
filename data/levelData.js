
const village = {
    name: 'Village', 
    bg_img_path: "./assets/environment/village_landscape.png",
    floorCollisionData: floorCollision,
    platformCollisionData: platformCollision,
    AIEntitiesData: [oldman, woman, hatMan, beardedMan],
    EnemyEntitiesData: [],
    mg_img_path: "./assets/environment/village_sky.png",
    fg_img_path: "./assets/environment/village_middle_ground.png", 
}

const cemetry = {
    name: 'Cemetry', 
    bg_img_path: "./assets/environment/map.png", 
    floorCollisionData: floorCollision,
    platformCollisionData: cemetryFloorCollison,
    AIEntitiesData: [],
    EnemyEntitiesData: [skeletonData],
    mg_img_path: "./assets/environment/cemetry_background.png",
    fg_img_path: "./assets/environment/cemetry_middle_ground.png"
    // context: game.context
}

const swamp = {
    name: 'Swamp', 
    bg_img_path: "./assets/environment/swamp-ground.png", 
    floorCollisionData: swampFloorCollision,
    platformCollisionData: swampFloorCollision,
    AIEntitiesData: [],
    EnemyEntitiesData: [],
    mg_img_path: "./assets/environment/swamp-background-2.png",
    fg_img_path: "./assets/environment/swamp-midground.png"
    // context: game.context
}
