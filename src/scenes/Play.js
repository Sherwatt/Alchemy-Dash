class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background1', './assets/1_background.png');
        this.load.image('background2', './assets/2_background.png');
        this.load.image('background3', './assets/3_background.png');
        this.load.image('background4', './assets/4_background.png');
        this.load.image('platform', './assets/ground_tile.png');
        this.load.image('ingredient', './assets/ing1.png');

        // load spritesheets
        this.load.spritesheet('run', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame:7});
        this.load.spritesheet('jump', './assets/jump_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame:7});
    }

    create() {
        // place tile sprite
        this.background4 = this.add.tileSprite(0, 0, 1280, 720, 'background4').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 1280, 720, 'background3').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 1280, 720, 'background2').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 1280, 720, 'background1').setOrigin(0, 0);
        //this.ground = this.add.tileSprite(0, game.config.height-72, 640, 72, 'ground').setOrigin(0, 0); 
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        // run animation config
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('run', {start: 0, end: 7, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        // jump animation config
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 7, first: 0}),
            frameRate: 10
        });


        //Ingredient STUFF --------------------------------
        // group with all active ingredients.
        this.ingredientGroup = this.add.group({
 
            // once an ingredient is removed, it's added to the pool
            removeCallback: function(ingredient){
                ingredient.scene.ingredientPool.add(ingredient)
            }
        });
 
        // pool
        this.ingredientPool = this.add.group({
 
            // once an ingredient is removed from the pool, it's added to the active ingredients group
            removeCallback: function(ingredient){
                ingredient.scene.ingredientGroup.add(ingredient)
            }
        });
 
        // adding an ingredient to the game, the arguments are ingredient width and x position
        this.addIngredient(20, 50);
        


        /*  PLATFORM STUFF --------------------------------
        // group with all active platforms.
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
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
        */
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "run");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.anims.play('run');

        //Other platform stuff -------------------------------
        // make ground tiles group
        const tileSize = 50;
        const SCALE = 2.3;

        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 58 - tileSize, 'platform').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height - 58 - tileSize, game.config.width, tileSize, 'platform').setScale(SCALE).setOrigin(0);
        
        
        // setting collisions between the player and the platform group
        //this.physics.add.collider(this.player, this.platformGroup);
        this.physics.add.collider(this.player, this.ground);
        //this.physics.add.collider(this.player, this.ingredientGroup);
 
        // checking for input
        this.input.keyboard.on("keydown-SPACE", this.jump, this);
        this.input.keyboard.on("keydown-ESC", this.menuReturn, this);
        
        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffdc8a',
            color: '#863800',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        //this.gameOver = false;
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
        }
    }

    menuReturn() {
        this.scene.start("menuScene");
    }

    resetIngredient() {

    }

    update() {
        //move ground
        this.groundScroll.tilePositionX += 5;

        if (this.player.body.touching.down && this.player.anims.isPlaying != 'run') {this.player.anims.play('run', true);}

        this.background1.tilePositionX += 3.5; // update tile sprite
        this.background2.tilePositionX += 3;
        this.background3.tilePositionX += 2.5;
        this.background4.tilePositionX += 2; 

       /* if (ingredient.body.touching.down || ingredient.body.touching.left) {
            this.ingredient.end;
            
        }

        // game over
        if(this.player.y > game.config.height){
            this.scene.start("playScene");
        }
        this.player.x = gameOptions.playerStartPosition;
 /* PLATFORMMMMMSSSS
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
        }*/

        // recycling ingredients
        let minDistance = game.config.width;
        this.ingredientGroup.getChildren().forEach(function(ingredient){
            let ingredientDistance = game.config.width - ingredient.x - ingredient.displayWidth /2;
            minDistance = Math.min(minDistance, ingredientDistance);


            if (this.checkCollision(this.player, ingredient)) {
                this.ingredientGroup.killAndHide(ingredient);
                this.ingredientGroup.remove(ingredient);
                this.p1Score++;
                this.scoreLeft.text = this.p1Score;
            }


            if(ingredient.x < - ingredient.displayWidth / 2){
                this.ingredientGroup.killAndHide(ingredient);
                this.ingredientGroup.remove(ingredient);
            }
        }, this);
 
        // adding new ingredients
        if(minDistance > this.nextingredientDistance){
            var nextIngredientWidth = Phaser.Math.Between(gameOptions.ingredientSizeRange[0], gameOptions.ingredientSizeRange[1]);
            this.addIngredient(nextIngredientWidth, game.config.width + nextIngredientWidth / 2);
        }
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