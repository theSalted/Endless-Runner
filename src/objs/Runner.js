class Runner extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		scene.add.existing(this);
		
		// initialize parameters
		// jumpSpeed and acc is the fixed stats that manipulate runner's jumping physics 
		// currentSpeed is the runtime runner's speed
		// and g stands for gravitational acceleration
		this.isJumping = false
		this.yOrigin = 350;
		this.initSpeed = 7;
		this.initAcceleration = 0.2;
		this.currentSpeed = this.initSpeed;
		this.currentAcc = this.initAcceleration;
		this.g = 0.0001;
	}
	update() {
		if(!this.isJumping) {
			if(keySPACE.isDown){
				this.isJumping = true;
			}
		}
		this.jump();
	}
	jump() {
		if(this.isJumping){
			this.currentAcc += this.g;
			this.currentSpeed -= this.currentAcc;
			this.y -= this.currentSpeed;
			
			// reset upon complete jump
			if(this.y >= this.yOrigin) {
				this.y = this.yOrigin
				this.currentSpeed = this.initSpeed;
				this.currentAcc = this.initAcceleration;
				this.isJumping = false;
			}
		}
	}
}