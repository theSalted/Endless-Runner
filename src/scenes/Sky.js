class Sky extends Phaser.Scene {
	constructor() {
		super("skyScene")
	}
	// Preload
	preload() {
		// load images
		this.load.image('sky_sky', './assets/sky/sky.png');
		this.load.image('star_sky', './assets/sky/stars.png');
		this.load.image('moon_sky', './assets/sky/moon.png');
		this.load.image('mount_sky', './assets/sky/mount.png');
		this.load.image('cloud_sky', './assets/sky/cloud.png');
		this.load.image('block', './assets/block.png');
		this.load.image('teleport', './assets/teleport.png');
		this.load.spritesheet('cat', './assets/sky/cat.png', {frameWidth: 50, frameHeight: 28, startFrame: 0, endFrame: 3})
		this.load.spritesheet('flier', './assets/sky/flyingBear.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 5})
		
		this.load.image('bamboo', './assets/bamboo.png')
		this.load.image('bwbamboo', './assets/bwbamboo.png')
	}
	create() {
		this.backgroundMusic =  this.sound.add('sfx_background_sky', {
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
		
		this.createScene();
		
		// create rolling animation for runner
		this.anims.create({
			key: 'rolling',
			frames: this.anims.generateFrameNumbers('flier', { start:0, end: 5, first: 0}),
			frameRate: 6,
			repeat: -1
		});
		this.anims.create({
			key: 'catRainbowing',
			frames: this.anims.generateFrameNumbers('cat', { start:0, end: 3, first: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		// create runner object
		this.flier = new Flier(this, 80, 200, 'flier').setOrigin(0, 0);

		// play rolling animation
		this.flier.play('rolling');
		
	
		// create block
		this.block01 = new Block(this, game.config.width + 100, 20, 'cat', 7).setOrigin(0, 0);
		this.block02 = new Block(this, game.config.width + 350, 170, 'cat', 7).setOrigin(0, 0);
		this.block03 = new Block(this, game.config.width + 600, 350, 'cat', 7).setOrigin(0, 0);
		
		this.block01.play('catRainbowing');
		this.block02.play('catRainbowing');
		this.block03.play('catRainbowing');

		//create teleport
		this.teleport = new Teleport(this, game.config.width + 600, 300, 'teleport').setOrigin(0, 0);

		this.isInvicible = false;
		
		// GAME OVER flag
		this.gameOver = false;
		
        // display score
        let scoreConfig = {
			fontFamily: 'Impact',
			fontSize: '40px',
			color: '#FFFFFF',
			align: 'right',
			fixedWidth: 100
		}
        this.scoreLeft = this.add.text(500, 20, p1Score, scoreConfig);
		
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
		
		this.moon.tilePositionX += (0.1);
		this.stars.tilePositionX += (0.3);
		this.mount.tilePositionX += (1.5);
		this.cloud.tilePositionX += (5.5);	
		
		if(this.block01.x <= -20) {
			this.block01.reset();
		}
		if(this.block02.x <= -20) {
			this.block02.reset();
		}
		if(this.block03.x <= -20) {
			this.block03.reset();
			p1Score += 100;
			this.scoreLeft.text = p1Score;
		}
		
		if(this.teleport.x <= -80) {
			this.teleport.reset();
		}

		if(this.checkCollison(this.flier, this.block01) && !this.isInvicible) {
			this.sound.play('sfx_hit');
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.isInvicible = true;
		}
		if(this.checkCollison(this.flier, this.block02) && !this.isInvicible) {
			this.sound.play('sfx_hit');
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.isInvicible = true;
		}
		if(this.checkCollison(this.flier, this.block03) && !this.isInvicible) {
			this.sound.play('sfx_hit');
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.isInvicible = true;
		}

		if(this.checkCollison(this.flier, this.teleport) && !this.isInvicible) {
			this.sound.play('sfx_teleport');
			this.isInvicible = true;
			this.backgroundMusic.pause();
            var sceneRandomize = sceneRand_sky[Math.floor(Math.random()*sceneRand_sky.length)];
			this.scene.start(sceneRandomize);
		}
		
		if(this.checkBondaries(this.flier)) {
			health -= 1;
			this.flier.y = 200;
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
	
		if(!(this.checkCollison(this.flier, this.block01) || this.checkCollison(this.flier, this.block02) || this.checkCollison(this.flier, this.block03)) && this.isInvicible) {
			this.isInvicible = false;
		}
		
		if(!this.gameOver) {
			this.block01.update();
			this.block02.update();
			this.block03.update();
			this.flier.update();
		}
		if(!this.gameOver && p1Score - this.initScore >= 600) {
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
	checkBondaries(runner) {
		if(runner.y > 480) {
			return true;
		} else {
			return false;
		}
	}
	createScene() {
		// create scenes
		this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky_sky').setOrigin(0, 0);
		this.stars = this.add.tileSprite(0, 0, 640, 480, 'star_sky').setOrigin(0, 0);
		this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon_sky').setOrigin(0, 0);
		this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount_sky').setOrigin(0, 0);
		this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud_sky').setOrigin(0, 0);
	}
}

