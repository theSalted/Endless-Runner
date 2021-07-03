class Runner extends Phaser.Scene {
	constructor() {
		super("runnerScene")
	}
	// Preload
	preload() {
		
		// load images
		this.load.image('starfield', './assets/purplestarfield.png');
		this.load.image('cloud', './assets/cloud.png');
		this.load.image('mount', './assets/mountains.png');
		this.load.image('forest', './assets/forest.png');
		this.load.spritesheet('runner', './assets/runnerBear.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 4})
	}
	create() {
		// create scenes
		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud').setOrigin(0, 0);
		this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount').setOrigin(0, 0);
		this.forest = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
	}
	update() {
		// scene scrolling 
		this.starfield.tilePositionX += 1.5
		this.cloud.tilePositionX += (3.5);
		this.mount.tilePositionX += (4.5);
		this.forest.tilePositionX += (6.5);
	}
	jump() {
		
	}
}

