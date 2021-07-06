class Play1 extends Phaser.Scene {
	constructor() {
		super("playScene1")
	}
	// Preload
	preload() {
		// load images
		this.load.image('starfield', './assets/purplestarfield.png');
		this.load.image('cloud', './assets/cloud.png');
		this.load.image('mount', './assets/mountains.png');
		this.load.image('forest', './assets/forest.png');
		this.load.image('block', './assets/block.png')
		this.load.spritesheet('runner', './assets/runnerBear.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 4})
	}
	create() {
		this.sound.play('sfx_background1'); 
		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		
		// create scenes
		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0, 0);
		this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount').setOrigin(0, 0);
		this.forest = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
		
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
		this.starfield.tilePositionX += 1.5
		this.cloud.tilePositionX += (3.5);
		this.mount.tilePositionX += (4.5);
		this.forest.tilePositionX += (6.5);	
		
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
			this.sound.get('sfx_background1').destroy();
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
}

