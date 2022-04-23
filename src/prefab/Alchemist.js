class Alchemist extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        if(keyUP.isDown && this.y >= borderUISize) {
            this.y -= this.moveSpeed;
        } else if (keyDOWN.isDown && this.y <= game.config.height - borderUISize - this.height){
            this.y += this.moveSpeed;
        }
    }
}