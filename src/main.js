let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false,
        }
    },
    scene: [Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;