class Swimmer extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		scene.add.existing(this);
		
		// initialize parameters
		// jumpSpeed and acc is the fixed stats that manipulate runner's jumping physics 
		// speed is the runtime runner's speed
		// and g stands for gravitational acceleration
		this.isJumping = false;
		this.isFalling = false;
		this.isAccelerating = false;
		this.yOrigin = 350;
		this.initSpeed = 5;
		this.gravitationalAcc = 0.1;
		this.speed = 0;
		this.acceleration = 0;
		this.jerk = 0.005;
	}
	update() {
		if(keySPACE.isDown && this.speed <= 1){
			this.speed = this.initSpeed;
		}
		
		if(this.y < 0) {
			this.speed = -3;
		}
		
		this.y -= this.speed;
		
		if(this.speed > -3 & this.y < this.yOrigin) {
			this.speed -= this.gravitationalAcc;
		}
		
		if(this.y >= this.yOrigin) {
			console.log('hit ground');
			this.speed = 0;
		}
	}
}