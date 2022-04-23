class player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.moveSpeed = 2;         // pixels per frame
    }

    update() {
        // left/right movement
        if(!this.isJumping) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width-200) {
                this.x += this.moveSpeed;
            }
        }
    }
}