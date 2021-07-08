class Teleport extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		scene.add.existing(this);
		this.initSpeed = 4;
	}
	update() {
		this.x -= this.initSpeed;
	}
	reset() {
		this.x = game.config.width * 5;
	}
}