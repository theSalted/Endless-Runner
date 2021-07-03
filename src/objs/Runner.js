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
		this.jumpSpeed = 5;
		this.currentSpeed = this.jumpSpeed;
		this.acceleration = 0.1;
		this.g = 3;
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
			this.currentSpeed -= this.acceleration;
			this.y -= this.currentSpeed;
			
			if(this.y >= this.yOrigin) {
				this.y = this.yOrigin
				this.currentSpeed = this.jumpSpeed;
				this.isJumping = false;
			}
		}
	}
}