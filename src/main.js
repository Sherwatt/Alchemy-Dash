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
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);