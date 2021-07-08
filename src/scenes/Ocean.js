class Ocean extends Phaser.Scene {
	constructor() {
		super("oceanScene")
	}
	preload() {
		// load images
		this.load.image('background_ocean', './assets/ocean/background.png');
		this.load.image('seabed_vvfar_ocean', './assets/ocean/vvfar_seabed.png');
		this.load.image('seabed_vfar_ocean', './assets/ocean/vfar_seabed.png');
		this.load.image('seabed_far_ocean', './assets/ocean/far_seabed.png');
		this.load.image('seabed_main_ocean', './assets/ocean/main_seabed.png');
		this.load.image('seabed_coral_ocean', './assets/ocean/coralleaf_seabed.png');
		// load fishes
		this.load.image('fish1', './assets/ocean/fish1.png')
		this.load.image('fish2', './assets/ocean/fish2.png')
		this.load.image('fish3', './assets/ocean/fish3.png')
		
		this.load.image('teleport', './assets/teleport.png');
		this.load.image('block', './assets/block.png')
		this.load.spritesheet('runner', './assets/runnerBear.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 4})
	}
	create() {
		this.createScene();
		this.backgroundMusic =  this.sound.add('sfx_background_ocean', {
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
			frames: this.anims.generateFrameNumbers('runner', { start:0, end: 4, first: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		// create runner object
		this.runner = new Flier(this, 80, 200, 'runner').setOrigin(0, 0);

		// play rolling animation
		this.runner.play('rolling');
	
		// create block
		this.block01 = new Block(this, game.config.width + 100, 20, 'block').setOrigin(0, 0);
		this.block02 = new Block(this, game.config.width + 350, 170, 'block').setOrigin(0, 0);
		this.block03 = new Block(this, game.config.width + 600, 350, 'block').setOrigin(0, 0);

		//create teleport
		this.teleport = new Teleport(this, game.config.width + 600, 300, 'teleport').setOrigin(0, 0);

		this.isInvicible = false;
		
		// GAME OVER flag
		this.gameOver = false;
		
		let textConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			color: '#FFFFFF',
			align: 'right'
		};
		
		// display score
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 100
		}
		this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, p1Score, scoreConfig);

		// create health display
		this.healthDisplay = this.add.text(20, 20, 'Health: ' + health, textConfig);
		
		// style config for GAME OVER
		let gameOverConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
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
		gameOverConfig.backgroundColor = '#00FF00';
		gameOverConfig.color = '#000';
		this.GOInstruction = this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press R to Restart or Q to Quit', gameOverConfig).setOrigin(0.5).setVisible(false);
			
	}
	update() {
		this.background.tilePositionX += 0.3
		this.vvfarSeabed.tilePositionX += 0.5
		this.vfarSeabed.tilePositionX += 0.8
		this.farSeabed.tilePositionX += 1.1
		this.mainSeabed.tilePositionX += 1.5
		this.coralSeabed.tilePositionX += 2.2
		this.fish1.tilePositionX += 3.1
		this.fish2.tilePositionX -= 1.1
		this.fish3.tilePositionX -= 1.4
		
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

		if(this.checkCollison(this.runner, this.block01) && !this.isInvicible) {
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.healthDisplay.text = 'Health: ' + health;
			this.isInvicible = true;
		}
		if(this.checkCollison(this.runner, this.block02) && !this.isInvicible) {
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.healthDisplay.text = 'Health: ' + health;
			this.isInvicible = true;
		}
		if(this.checkCollison(this.runner, this.block03) && !this.isInvicible) {
			p1Score -= 10;
			this.scoreLeft.text = p1Score;
			health -= 1;
			this.healthDisplay.text = 'Health: ' + health;
			this.isInvicible = true;
		}

		if(this.checkCollison(this.runner, this.teleport) && !this.isInvicible) {
			this.sound.play('sfx_teleport');
			this.isInvicible = true;
			this.backgroundMusic.pause();
			var sceneRandomize = sceneRand[Math.floor(Math.random()*sceneRand.length)];
			this.scene.start(sceneRandomize);
		}
		
		if(this.checkBondaries(this.runner)) {
			health -= 1;
			this.runner.y = 200;
			this.healthDisplay.text = 'Health: ' + health;
		}
		
		if(health == 0 && !this.gameOver) {
			this.backgroundMusic.pause();
			health = 3;
			p1Score = 0;
			this.gameOver = true;
			this.GOInstruction.setVisible(true);
			this.GOPrompt.setVisible(true);
		}
		
		if (Phaser.Input.Keyboard.JustDown(keyR) && this.gameOver) {
			var sceneRandomize = sceneRand[Math.floor(Math.random()*sceneRand.length)];
			this.scene.start(sceneRandomize);
		   }
		if (Phaser.Input.Keyboard.JustDown(keyQ) && this.gameOver) {
			this.scene.start("menuScene");
		}
	
		if(!(this.checkCollison(this.runner, this.block01) || this.checkCollison(this.runner, this.block02) || this.checkCollison(this.runner, this.block03)) && this.isInvicible) {
			this.isInvicible = false;
		}
		
		if(!this.gameOver) {
			this.block01.update();
			this.block02.update();
			this.block03.update();
			this.teleport.update();
			this.runner.update();
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
		this.background = this.add.tileSprite(0, 0, 640, 480, 'background_ocean').setOrigin(0, 0);
		this.vvfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vvfar_ocean').setOrigin(0, 0);
		this.fish1 = this.add.tileSprite(0, 0, 640, 480, 'fish1').setOrigin(0, 0);
		this.vfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vfar_ocean').setOrigin(0, 0);
		this.fish2 = this.add.tileSprite(0, 0, 640, 480, 'fish2').setOrigin(0, 0);
		this.farSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_far_ocean').setOrigin(0, 0);
		this.mainSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_main_ocean').setOrigin(0, 0);
		this.fish3 = this.add.tileSprite(0, 0, 640, 480, 'fish3').setOrigin(0, 0);
		this.coralSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_coral_ocean').setOrigin(0, 0);
	}
}