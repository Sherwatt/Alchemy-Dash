class Alchemist extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        if(keyLEFT.isDown && this.player.body.touching.down) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.player.body.touching.down){
            this.x += this.moveSpeed;
        }
    }
}