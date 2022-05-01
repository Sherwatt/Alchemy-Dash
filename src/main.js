let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [75, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2
}

let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 500,
    autoCenter: true,
    backgroundColor: '#B7410E',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: [Menu, Play, Death]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keySPACE, keyESC;