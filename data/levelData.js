
const village = {
    bg_img_path: "./assets/environment/village_landscape.png",
    floorCollisionData: floorCollision,
    platformCollisionData: platformCollision,
    AIEntitiesData: [woman, beardedMan, hatMan, oldman],
    EnemyEntitiesData: [],
    mg_img_path: "./assets/environment/village_sky.png",
    fg_img_path: "./assets/environment/village_middle_ground.png"
}

const cemetry = {
    bg_img_path: "./assets/environment/map.png", 
    floorCollisionData: floorCollision,
    platformCollisionData: cemetryFloorCollison,
    AIEntitiesData: [],
    EnemyEntitiesData: [bossData],
    mg_img_path: "./assets/environment/cemetry_background.png",
    fg_img_path: "./assets/environment/cemetry_middle_ground.png"
    // context: game.context
}
