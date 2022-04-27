let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2
}

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: '#DC7633',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keySPACE, keyESC;