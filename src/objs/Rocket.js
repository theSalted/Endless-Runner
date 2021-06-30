// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		
		// add object to existing scene
		scene.add.existing(this);
		this.isFiring = false;
		this.moveSpeed = 2;
		this.sfxRocket = scene.sound.add('sfx_rocket');
		//game.input.mouse.capture = true;
	}
	update(isMouseControl = false, x, isMouseClicked = false) {
		// left/right movement
		if(isMouseControl) {
			if(!this.isFiring || this.controlMidAir) {
				if(x < this.x && this.x >= borderUISize + this.width) {
					this.x -= this.moveSpeed;
				} else if (x > this.x && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed;
				}
			}
			
			if(this.isFiring && game.settings.midAirControl) {
				if(x < this.x && this.x >= borderUISize + this.width){
					this.x -= this.moveSpeed * 0.5;
				} else if (x > this.x && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed * 0.5;
				}
			}
			
			if(isMouseClicked && !this.isFiring) {
				this.isFiring = true;
				this.sfxRocket.play();
			}
		} else {
			if(!this.isFiring) {
				if(keyLEFT.isDown && this.x >= borderUISize + this.width){
					this.x -= this.moveSpeed;
				} else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed;
				}
			}
			
			if(this.isFiring && game.settings.midAirControl) {
				if(keyLEFT.isDown && this.x >= borderUISize + this.width){
					this.x -= this.moveSpeed * 0.5;
				} else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
					this.x += this.moveSpeed * 0.5;
				}
			}
			// fire button
			if((Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keySPACE)) && !this.isFiring) {
				this.isFiring = true;
				this.sfxRocket.play();
			}
			
		}
		
		// if fired move up
		if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
			this.y -= this.moveSpeed;
		}
		// rest on miss
		if(this.y <= borderUISize * 3 + borderPadding) {
			this.reset();
		}
	}
	// reset rocket
	reset() {
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;
	}
}