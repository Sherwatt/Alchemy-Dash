class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.audio('bounce', './assets/jumping.wav');
        this.load.image('platform', './assets/ground_tile.png');
        this.load.image('background1', './assets/1_background.png');
        this.load.image('background2', './assets/2_background.png');
        this.load.image('background3', './assets/3_background.png');
        this.load.image('background4', './assets/4_background.png');
        this.load.spritesheet('player', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jump', './assets/jump_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
    }
    create() {
        //tile sprite backgrounds
        this.background4 = this.add.tileSprite(0, 0, 640, 480, 'background4').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //The player won't land on the ground, instead he falls through it, why?
        let ground = this.physics.add.staticGroup();
        ground.create = (100, 640, 'ground');

        //regular running animation

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', {startFrame: 0, endFrame: 7}),
            frameRate: 12,
            repeat: -1,
        });

        //jumping animation

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 7, first: 0}),
            frameRate: 10
        });

        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
 
        // pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        //adds in the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "run");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.anims.play('run');

        this.playerJumps = 0;

        this.addPlatform(game.config.width, game.config.width / 2);

        this.physics.add.collider(this.player, this.platformGroup);

        //checking for input
        this.input.keyboard.on("keydown-SPACE", this.jump, this);

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
    addPlatform(platformWidth, posX){
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
        }
        else{
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump(){
        if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
            this.player.anims.play('jump');
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
        }
    }
    update() {
         // check key input for menu
         if(Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }
        
        this.background1.tilePositionX += 3.5; // update tile sprite
        this.background2.tilePositionX += 3;
        this.background3.tilePositionX += 2.5;
        this.background4.tilePositionX += 2; 

        // game over
        if(this.player.y > game.config.height){
            this.scene.start("playScene");
        }
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }
    }
    addDistance() {
        this.distance += 1;
        this.distanceTraveled.text = this.distance;
    }
}