let gameOptions = {
    platformStartSpeed: 350,
<<<<<<< Updated upstream
    spawnRange: [100, 350],
=======
    ingredientStartSpeed: 350,
    spawnRange: [100, 350],
    ingredientSpawnRange: [80, 500],
>>>>>>> Stashed changes
    platformSizeRange: [75, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 150,
    jumps: 2
}

let config = {
<<<<<<< Updated upstream
    type: Phaser.AUTO,
=======
    type: Phaser.CANVAS,
>>>>>>> Stashed changes
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