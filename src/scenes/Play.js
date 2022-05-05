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
        this.load.audio('music', './assets/background_music.wav');

        // load images/tile sprites
        this.load.image('background1', './assets/1_background.png');
        this.load.image('background2', './assets/2_background.png');
        this.load.image('background3', './assets/3_background.png');
        this.load.image('background4', './assets/4_background.png');
        this.load.image('platform', './assets/ground_tile.png');
        this.load.image('enemy', './assets/enemy.png');

        // load spritesheets
        this.load.spritesheet('run', './assets/basic_run_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame:7});
        this.load.spritesheet('jump', './assets/jump_cycle.png', {frameWidth: 64, frameHeight: 96, startFrame: 0, endFrame:7});
        this.load.spritesheet('ingredient', './assets/mushroom_anim.png', {frameWidth: 32, frameWidth: 32, startFrame: 0, endFrame:3});
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
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        let musicConfig = {
            volume: 0.7,
            loop: true,
        }

        this.music = this.sound.add('music');

        this.music.play(musicConfig);

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
        // mushroom animation config
        this.anims.create({
            key: 'mushroom',
            frames: this.anims.generateFrameNumbers('ingredient', {start: 0, end: 3, first: 0}),
            frameRate: 8,
            repeat: -1
        });

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


//Enemy STUFF --------------------------------
        // group with all active enemies.
        this.enemyGroup = this.add.group({
 
            // once an enemy is removed, it's added to the pool
            removeCallback: function(enemy){
                enemy.scene.enemyPool.add(enemy)
            }
        });
 
        // pool
        this.enemyPool = this.add.group({
 
            // once an enemy is removed from the pool, it's added to the active enemies group
            removeCallback: function(enemy){
                enemy.scene.enemyGroup.add(enemy)
            }
        });
 
        // adding an enemy to the game, the arguments are enemy width and x position
        this.addEnemy(20, 50);


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
        
 
        // number of consecutive jumps made by the player
        this.playerJumps = 0;
        
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "run");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.anims.play('run');

        //No gaps platform stuff -------------------------------
        // make ground tiles group
        const tileSize = 50;
        const SCALE = 2;

        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - 30 - tileSize, 'platform').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // put another tile sprite above the ground tiles
        this.groundScroll = this.add.tileSprite(0, game.config.height - 30 - tileSize, game.config.width, tileSize, 'platform').setScale(SCALE).setOrigin(0);
        
        
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.ground);
 
        // checking for input
        this.input.keyboard.on("keydown-SPACE", this.jump, this);
        this.input.keyboard.on("keydown-ESC", this.menuReturn, this);
    }

    addIngredient(ingredientWidth, posX){
        let ingredient;
        
        if(this.ingredientPool.getLength()){
            ingredient = this.ingredientPool.getFirst();
            ingredient.anims.play('mushroom');
            ingredient.x = posX;
            ingredient.active = true;  
            ingredient.visible = true;
            this.ingredientPool.remove(ingredient);
        }
        else{
            ingredient = this.physics.add.sprite(posX, game.config.height -240, "ingredient");
            ingredient.anims.play('mushroom');
            ingredient.setImmovable(true);
            ingredient.setVelocityX(gameOptions.ingredientStartSpeed * -1);
            this.ingredientGroup.add(ingredient);
        }
        //ingredient.displayWidth = ingredientWidth;
        this.nextingredientDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
    }
    addEnemy(enemyWidth, posX){
        let enemy;
        if(this.enemyPool.getLength()){
            enemy = this.enemyPool.getFirst();
            enemy.x = posX;
            enemy.active = true;
            enemy.visible = true;
            this.enemyPool.remove(enemy);
        }
        else{
            enemy = this.physics.add.sprite(posX, Phaser.Math.Between(40, game.config.height-70), "enemy");
            enemy.setImmovable(true);
            enemy.setVelocityX(gameOptions.enemyStartSpeed * -1);
            this.enemyGroup.add(enemy);
        }
        enemy.displayWidth = enemyWidth;
        this.nextenemyDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
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
            this.sound.play('bounce');
        }
    }

    menuReturn() {
        this.scene.start("menuScene");
        this.music.stop();
    }

    update() {
        // check key input for movement
        if((keyRIGHT.isDown || keyD.isDown) && this.player.x < 700) {
            this.player.x += gameOptions.moveSpeed;
        } else if ((keyLEFT.isDown || keyA.isDown)  && this.player.x > 50) {
            this.player.x -= gameOptions.moveSpeed;
        }
        
        //move ground
        this.groundScroll.tilePositionX += 5;

        if (this.player.body.touching.down && this.player.anims.isPlaying != 'run') {this.player.anims.play('run', true);}

        this.background1.tilePositionX += 3.5; // update tile sprite
        this.background2.tilePositionX += 3;
        this.background3.tilePositionX += 2.5;
        this.background4.tilePositionX += 2; 

       

        // game over
        if(this.player.y > game.config.height) {
            this.sound.play('fall');
            this.health -= 20;
            this.currentHealth.text = this.health
            this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height/2, "run");
            this.player.setGravityY(gameOptions.playerGravity);
            this.player.anims.play('run');
            this.physics.add.collider(this.player, this.platformGroup);
            
        }
        if(this.health <= 0){
            this.sound.play('dead');
            this.scene.start("gameoverScene");
            this.music.stop();
        }

        // INGREDIENTS
        // recycling ingredients
        let minDistance = game.config.width;
        this.ingredientGroup.getChildren().forEach(function(ingredient){
            let ingredientDistance = game.config.width - ingredient.x - ingredient.displayWidth /2;
            minDistance = Math.min(minDistance, ingredientDistance);


            if (this.checkCollision(this.player, ingredient)) {
                this.ingredientGroup.killAndHide(ingredient);
                this.ingredientGroup.remove(ingredient);
                this.distance += 20;
                this.distanceTraveled.text = this.distance;
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
        // ENEMIES
        // recycling enemiess
        this.enemyGroup.getChildren().forEach(function(enemy){
            let enemyDistance = game.config.width - enemy.x - enemy.displayWidth /2;
            minDistance = Math.min(minDistance, enemyDistance);


            if (this.checkCollision(this.player, enemy)) {
                this.enemyGroup.killAndHide(enemy);
                this.enemyGroup.remove(enemy);
                this.sound.play('fall');
                this.health -= 20;
                this.currentHealth.text = this.health
            }


            if(enemy.x < - enemy.displayWidth / 2){
                this.enemyGroup.killAndHide(enemy);
                this.enemyGroup.remove(enemy);
            }
        }, this);
 
        // adding new enemies
        if(minDistance > this.nextenemyDistance){
            var nextEnemyWidth = Phaser.Math.Between(gameOptions.enemySizeRange[0], gameOptions.enemySizeRange[1]);
            this.addEnemy(nextEnemyWidth, game.config.width + nextEnemyWidth / 2);
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