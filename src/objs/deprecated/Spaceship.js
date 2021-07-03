// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame, pointValue, moveSpeed, speedUpSpeed, left2Right = false) {
		super(scene, x, y, texture, frame, left2Right);
		scene.add.existing(this);
		this.points = pointValue;
		this.moveSpeed = moveSpeed;
		this.speedUpSpeed = speedUpSpeed;
		this.left2Right = left2Right;
	}
	
	update(speedUp = false) {
		// move spaceship left
		if(speedUp){
			this.moveSpeed = this.speedUpSpeed;
		}
		this.x += this.moveSpeed;
		// wrap around from left edge to right edge
		if(this.x >= game.config.width && this.left2Right) {
			this.x = -this.width;
		} else if(this.x <= 0 - this.width && !this.left2Right) {
			this.x = game.config.width;
		}
	}
	
	// position reset
	reset() {
		if(this.left2Right) {
			this.x = -this.width;
		} else {
			this.x = game.config.width;
		}
	}
}