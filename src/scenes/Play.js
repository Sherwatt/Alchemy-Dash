class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('platform', './assets/brick_tiles_1.png');
        this.load.spritesheet('player', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
    }
    create() {
        //adds in a group that'll respresent the ground and any possible platforms we might add
        this.groundGroup = this.add.group({
            //this adds all removed platforms to a pool
            removeCallback: function(platform){
                platform.scene.groundPool.add(platform)
            }
        });

        //here's the pool
        this.groundPool = this.add.group({
            //when a platform is removed from the pool it goes into the active group
            removeCallback: function(platform){
                platform.scene.groundGroup.add(platform)
            }
        });

        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.ground = this.physics.add.staticGroup();

        this.player = this.physics.add.sprite(100, 340, 'player');
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.ground);

        //this.player = new Alchemist(this, 150, 200, 'player').setOrigin(0, 0);
        //not sure what to do about the Alchemist class now, but we can implement physics, which is good

        this.anims.create({
            key: 'runner',
            frames: this.anims.generateFrameNumbers('player', {startFrame: 0, endFrame: 7}),
            frameRate: 12,
            repeat: -1,
        });
        this.player.play("runner");

        //makes a single platform to show that we land on it
        this.ground.create(100, 400, 'platform');

        this.distance = 0;

        let distanceConfig = {
            fontFamily: 'Rockwell',
            fontSize: '21px',
            color: '#00FF33',
            align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            },
            
        }
        this.distanceTraveled = this.add.text(600, 20, this.distance, distanceConfig); //can't figure out how to add text to this, or how to get the text to expand left rather than right
        this.timer = this.time.addEvent({delay: 100, callback: this.addDistance, callbackScope: this, loop: true});
    }

    update() {
        this.player.update();
        //basic jumping ability, no animation for it yet
        if(keySPACE.isDown && this.player.body.touching.down){
            this.player.y -= 75;
        }
    }
    addDistance() {
        this.distance += 1;
        this.distanceTraveled.text = this.distance;
    }
}