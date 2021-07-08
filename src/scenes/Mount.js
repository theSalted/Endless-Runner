class Mount extends Phaser.Scene {
	constructor() {
		super("mountScene")
	}
	// Preload
	preload() {
		// load images
		this.load.image('starfield_mount', './assets/mount/purplestarfield.png');
		this.load.image('cloud_mount', './assets/mount/cloud.png');
		this.load.image('mount_mount', './assets/mount/mountains.png');
		this.load.image('forest_mount', './assets/mount/forest.png');
		this.load.image('block', './assets/block.png');
		this.load.image('teleport', './assets/teleport.png');
		this.load.image('bamboo', './assets/bamboo.png')
		this.load.image('bwbamboo', './assets/bwbamboo.png')
		this.load.spritesheet('devilEye', './assets/mount/devilEye.png', {frameWidth: 42, frameHeight: 45, startFrame: 0, endFrame: 1})
		this.load.spritesheet('runner', './assets/mount/drivingBear.png', {frameWidth: 54, frameHeight: 55, startFrame: 0, endFrame: 2})
	}
	create() {
		this.backgroundMusic =  this.sound.add('sfx_mount', {
			volume: 1,
			loop: true
		})
		this.backgroundMusic.play()
		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		
		// create scenes
		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield_mount').setOrigin(0, 0);
		this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud_mount').setOrigin(0, 0);
		this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount_mount').setOrigin(0, 0);
		this.forest = this.add.tileSprite(0, 0, 640, 480, 'forest_mount').setOrigin(0, 0);
		
		// create rolling animation for runner
		this.anims.create({
			key: 'driving',
			frames: this.anims.generateFrameNumbers('runner', { start:0, end: 1, first: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		this.anims.create({
			key: 'devilRainbowing',
			frames: this.anims.generateFrameNumbers('devilEye', { start:0, end: 1, first: 0}),
			frameRate: 2,
			repeat: -1
		});

        // display score
        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'right',
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(500, 20, p1Score, scoreConfig);
		// create runner object
		this.runner = new Runner(this, 80, 350, 'runner').setOrigin(0, 0);

		// play rolling animation
		this.runner.play('driving');
		
		// create block
		this.block = new Block(this, game.config.width, 350, 'devilEye', 12).setOrigin(0, 0);
		this.block.play('devilRainbowing');

		//create teleport
		this.teleport = new Teleport(this, game.config.width + 300, 240, 'teleport').setOrigin(0, 0);
		
		// gameover condition initialize 
		this.isGameOver = false;
		
		// initialize health
		this.isInvicible = false;
		
		// GAME OVER flag
		this.gameOver = false;
		
		/*
		let textConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			color: '#FFFFFF',
			align: 'right'
		};
		// create health display
		this.healthDisplay = this.add.text(50, 20, 'Health: ' + health, textConfig);
		*/
		// style config for GAME OVER
		let gameOverConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			color: '#FFFFFF',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		}

		// create game over prompts and hide them
		this.GOPrompt = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
			'Game Over', gameOverConfig).setOrigin(0.5).setVisible(false);
		this.GOInstruction = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press SPACE to go to Menu', gameOverConfig).setOrigin(0.5).setVisible(false);
		
		// store the initial score
		this.initScore = p1Score;
		
		this.health01 = this.add.image(50, 45, 'bamboo');
		this.health02 = this.add.image(80, 45, 'bamboo');
		this.health03 = this.add.image(110, 45, 'bamboo');
		
		if (health < 1) {
			this.health03 = this.add.image(50, 45, 'bwbamboo');
		} 
		
		if (health < 2) {
			this.health02 = this.add.image(80, 45, 'bwbamboo');
		}
		
		if (health < 3) {
			this.health01 = this.add.image(110, 45, 'bwbamboo');
		}
		
	}
	update() {
		// scene scrolling 
		this.starfield.tilePositionX += 1.5;
		this.cloud.tilePositionX += (3.5);
		this.mount.tilePositionX += (4.5);
		this.forest.tilePositionX += (6.5);	
		
		if(this.block.x <= -20) {
			this.block.reset();
			p1Score += 10;
			this.scoreLeft.text = p1Score;
		}

		if(this.teleport.x <= -80) {
			this.teleport.reset();
		}
		
		if(this.checkCollison(this.runner, this.block) && !this.isInvicible) {
			this.sound.play('sfx_hit');
			health -= 1;
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			this.isInvicible = true;
		}
		
		if(this.checkCollison(this.runner, this.teleport) && !this.isInvicible) {
			this.sound.play('sfx_teleport');
			this.isInvicible = true;
			this.backgroundMusic.pause();
            var sceneRandomize = sceneRand_ground[Math.floor(Math.random()*sceneRand_ground.length)];
			this.scene.start(sceneRandomize);
		}
		

		if (health < 1) {
			this.health03 = this.add.image(50, 45, 'bwbamboo');
		} 
		
		if (health < 2) {
			this.health02 = this.add.image(80, 45, 'bwbamboo');
		}
		
		if (health < 3) {
			this.health01 = this.add.image(110, 45, 'bwbamboo');
		}
		
		if(health == 0 && !this.gameOver) {
			this.backgroundMusic.pause();
			health = 3;
			p1Score = 0;
			this.gameOver = true;
			this.GOInstruction.setVisible(true);
			this.GOPrompt.setVisible(true);
		}
		if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.gameOver) {
			this.scene.start("menuScene");
		}
	
		if(!this.checkCollison(this.runner, this.block) && this.isInvicible) {
			this.isInvicible = false;
		}

		if(!this.gameOver) {
			this.block.update();
			this.runner.update();
		}
		if(!this.gameOver && p1Score - this.initScore >= 200) {
			this.teleport.update();
		}

	}
	checkCollison(runner, block) {
		// simple AABB checking
		if (runner.x < block.x + block.width && 
			runner.x + runner.width > block.x && 
			runner.y < block.y + block.height &&
			runner.height + runner.y > block.y) {
			return true;
		} else {
			return false;
		}
	}
}

