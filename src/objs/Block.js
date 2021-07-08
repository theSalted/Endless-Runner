class Block extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, initSpeed) {
		super(scene, x, y, texture, initSpeed);
		scene.add.existing(this);
		this.initSpeed = initSpeed;
		console.log('block speed: ' + this.initSpeed)
	}
	update() {
		this.x -= this.initSpeed;
	}
	reset() {
		this.x = game.config.width;
	}
}