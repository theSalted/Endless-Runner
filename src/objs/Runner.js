class Runner extends Phaser.GameObjects.Sprite {
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
		this.initSpeed = 7;
		this.gravitationalAcc = 0.2;
		this.speed = this.initSpeed;
		this.acceleration = this.gravitationalAcc;
		this.jerk = 0.005;
	}
	update() {
		if(!this.isJumping) {
			if(keySPACE.isDown){
				this.isJumping = true;
			}
		}
		this.jump();
		this.fall();
	}

	jump() {
		if(this.isJumping && !this.isFalling){
			this.acceleration += this.jerk;
			this.speed -= this.acceleration;
			this.y -= this.speed;
			
			// reset upon complete jump
			if(this.y >= this.yOrigin) {
				this.y = this.yOrigin
				this.speed = this.initSpeed;
				this.acceleration = this.gravitationalAcc;
				this.isJumping = false;
			}
		}
	}

	fall() {
		if(this.isFalling){
			this.isJumping = false;
			this.speed += this.gravitationalAcc;
			this.y += this.initSpeed;
			
			if(this.y >= this.yOrigin) {
				this.y = this.yOrigin
				this.speed = this.initSpeed;
				this.acceleration = this.gravitationalAcc;
				this.isFalling = false;
			}
		}
	}

	print() {
		console.log('yes')
	}
}