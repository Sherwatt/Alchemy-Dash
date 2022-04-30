class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //the audio loads here
        this.load.audio('bounce', './assets/jump_sfx.wav');
        this.load.audio('fall', './assets/fall.wav');
        this.load.audio('menu', './assets/backtomenu_sfx.wav');
        this.load.audio('dead', './assets/death_sfx.wav');
        this.load.audio('hurt', './assets/damage_sfx.wav');

        //load images
        this.load.image('ingredient', './assets/ing1.png');
        this.load.image('platform', './assets/ground_tile.png');
        this.load.image('background1', './assets/1_background.png');
        this.load.image('background2', './assets/2_background.png');
        this.load.image('background3', './assets/3_background.png');
        this.load.image('background4', './assets/4_background.png');

        //load character and enemy spreadsheets
        this.load.spritesheet('player', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
        this.load.spritesheet('jump', './assets/jump_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame: 7});
        
    }
    create() {
        //tile sprite backgrounds
        this.background4 = this.add.tileSprite(0, 0, 750, 500, 'background4').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 750, 500, 'background3').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 750, 500, 'background2').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 750, 500, 'background1').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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

        this.playerJumps = 0;

        this.addPlatform(game.config.width, game.config.width / 2);

        //adds in the player
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height/2, "run");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.anims.play('run');

        this.physics.add.collider(this.player, this.platformGroup);

        //checking for input
        this.input.keyboard.on("keydown-SPACE", this.jump, this);

        //creates starting running speed
        this.moveSpeed = 600;

        //creating health
        this.health = 100;

        let healthConfig = {
            fontFamily: 'Rockwell',
            fontSize: '21px',
            color: '#FF0023',
            align: 'left',
            padding: {
                top: 10,
                bottom: 10,
            },
        }
        this.currentHealth = this.add.text(100, 20, this.health, healthConfig);

        //loading the point system and adding the interface
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
    addIngredient(ingredientWidth, posX){
        let ingredient;
        if(this.ingredientPool.getLength()){
            ingredient = this.ingredientPool.getFirst();
            ingredient.x = posX;
            ingredient.active = true;
            ingredient.visible = true;
            this.ingredientPool.remove(ingredient);
        }
        else{
            ingredient = this.physics.add.sprite(posX, game.config.height -300, "ingredient");
            ingredient.setImmovable(true);
            ingredient.setVelocityX(gameOptions.ingredientStartSpeed * -1);
            this.ingredientGroup.add(ingredient);
        }
        ingredient.displayWidth = ingredientWidth;
        this.nextingredientDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
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
            this.sound.play('bounce')
        }
    }
    update() {
         // check key input for menu
         if(Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('menu')
            this.scene.start("menuScene");
        }
        
        this.background1.tilePositionX += 3.5; // update tile sprite
        this.background2.tilePositionX += 3;
        this.background3.tilePositionX += 2.5;
        this.background4.tilePositionX += 2; 

        // game over
        if(this.player.y > game.config.height){
            this.sound.play('fall');
            this.health -= 20;
            this.currentHealth.text = this.health
            this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height/2, "run");
            this.player.setGravityY(gameOptions.playerGravity);
            this.player.anims.play('run');
            this.physics.add.collider(this.player, this.platformGroup);
            
        }
        this.player.x = gameOptions.playerStartPosition;

        //ensures that the correct animation will play when on the ground
        if(this.player.body.touching.down) {
            this.player.anims.play('run', true);
        }
        //if all the player's health is drained, then the game over screen appears
        if(this.health <= 0){
            this.sound.play('dead');
            this.scene.start("gameoverScene");
        }

        //gives the player left and right movement
        if(keyLEFT.isDown) { //&& this.player.body.touching.down) {
            this.player.setAccelerationX(-this.moveSpeed);
        } else if (keyRIGHT.isDown) { //&& this.player.body.touching.down){
            this.player.setAccelerationX(this.moveSpeed);
        } else {
            this.player.setAccelerationX(0);
        }

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
    
    checkCollision(char, ing) {
        if (char.x < ing.x + ing.width && 
            char.x + char.width > ing.x && 
            char.y < ing.y + ing.height &&
            char.height + char.y > ing.y) {
                return true;
        } else {
            return false;
        }
    }
}