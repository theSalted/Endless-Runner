class Sky extends Phaser.Scene {
	constructor() {
		super("skyScene")
	}
	// Preload
	preload() {
		// load images
		this.load.image('sky', './assets/sky/sky.png');
		this.load.image('stars', './assets/sky/stars.png');
		this.load.image('moon', './assets/sky/moon.png');
		this.load.image('mount', './assets/sky/mount.png');
		this.load.image('cloud', './assets/sky/cloud.png');
		this.load.image('block', './assets/block.png')
		this.load.spritesheet('runner', './assets/runnerBear.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 4})
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
		
		this.createScene();
		
		// create rolling animation for runner
		this.anims.create({
			key: 'rolling',
			frames: this.anims.generateFrameNumbers('runner', { start:0, end: 4, first: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		// create runner object
		this.runner = new Runner(this, 80, 350, 'runner').setOrigin(0, 0);

		// play rolling animation
		this.runner.play('rolling');
		
		
		
		// create block
		this.block = new Block(this, game.config.width, 350, 'block').setOrigin(0, 0);
		
		// gameover condition initialize 
		this.isGameOver = false;
		
		// initialize health
		this.health = 3;
		this.isInvicible = false;
		
		let textConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			color: '#FFFFFF',
			align: 'right'
		};
		// create health display
		this.healthDisplay = this.add.text(20, 20, 'Health: ' + this.health, textConfig);
	}
	update() {
		// scene scrolling 
		
		this.moon.tilePositionX += (0.1);
		this.stars.tilePositionX += (0.3);
		this.mount.tilePositionX += (1.5);
		this.cloud.tilePositionX += (5.5);	
		
		
		if(this.block.x <= -20) {
			this.block.reset();
		}
		
		if(this.checkCollison(this.runner, this.block) && !this.isInvicible) {
			this.health -= 1;
			this.healthDisplay.text = 'Health: ' + this.health;
			this.isInvicible = true;
		}
		
		/*if(this.health == 0 && !this.isInvicible && !this.runner.isFalling) {
			this.sound.get('sfx_background1').destroy();
			this.scene.start("gameOver");
		}*/
		
		if(this.health == 0) {
			this.sound.get('sfx_background_sky').destroy();
			this.scene.start("gameOver");
		}
			
		if(!this.checkCollison(this.runner, this.block) && this.isInvicible) {
			this.isInvicible = false;
		}
		
		this.block.update();
		this.runner.update();

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
	createScene() {
		// create scenes
		this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
		this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);
		this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon').setOrigin(0, 0);
		this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount').setOrigin(0, 0);
		this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0, 0);
	}
}

