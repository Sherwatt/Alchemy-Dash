/*******************************************************************
 * ALCHEMY DASH

 * Jeremy Dahlberg
 * Lyza Stevens
 * Eamon Sherris-Watt
 
 * completed on 5/4/2022
 
 * CREATIVE TILT
 * In our endles runner, we have made use of randomly generated collectable and enemy placement.
 * In our endless runner, there are several backgrounds that scroll at different speeds, creating a parralax effect.
******************************************************************/
let gameOptions = {
    ingredientStartSpeed: 250,
    enemyStartSpeed: 350,
    spawnRange: [200, 700],
    spawnRange: [100, 350],
    ingredientSpawnRange: [80, 500],
    ingredientSizeRange: [20, 20],
    enemySizeRange: [20, 20],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2,
    moveSpeed: 2,
    distance: 0
}

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 480,
    autoCenter: true,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [Menu, Play, Death]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyLEFT, keyRIGHT, keyA, keyD, keySPACE, keyESC;