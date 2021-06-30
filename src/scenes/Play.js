class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}
	preload() {
		// load images/tile sprites
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('p2rocket', './assets/p2rocket.png');
		this.load.image('spaceship', './assets/spaceship.png');
		this.load.image('starfield', './assets/starfield.png');
		this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9})
	}
	create() {
		
		if(game.settings.endranceMode && game.settings.is2P){
			console.log("RP: endranceMode and is 2P can't enable at same time (endranceMode has setten to false)");
			game.settings.endranceMode = false;
		}
		
		// place tile sprite
		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		// add rocket (p1)
		this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
		// add rocket (p2) if in 2P mode
		if(game.settings.is2P) {
			this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p2rocket').setOrigin(0.5, 0);
		}
		// add spaceships
		this.speed = game.settings.spaceshipSpeed;
		this.speedUpSpeed = game.settings.speedUpSpeed;
		if(Math.random() < 0.5) {
			this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize * 4, 'spaceship', 0, 30, -this.speed, -this.speedUpSpeed).setOrigin(0, 0);
		} else {
			this.ship01 = new Spaceship(this, -borderUISize*6, borderUISize * 4, 'spaceship', 0, 30, this.speed, this.speedUpSpeed, true).setOrigin(0, 0);
		}
		if(Math.random() < 0.5) {
			this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, -this.speed, -this.speedUpSpeed).setOrigin(0, 0);
		} else {
			this.ship02 = new Spaceship(this, -borderUISize*3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, this.speed, this.speedUpSpeed, true).setOrigin(0, 0);
		}
		if(Math.random() < 0.5) {
			this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding * 4, 'spaceship', 0, 10, -this.speed, -this.speedUpSpeed).setOrigin(0, 0);
		} else {
			this.ship03 = new Spaceship(this, 0, borderUISize*6 + borderPadding * 4, 'spaceship', 0, 10, this.speed, this.speedUpSpeed, true).setOrigin(0, 0);
		}
		// green UI background
		this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x37946e).setOrigin(0, 0);
		// white borders
		this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
		this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
		
		// define keys 
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		
		// animation config
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start:0, end: 9, first: 0}),
			frameRate: 30
		});
		
		// initialize score
		this.p1Score = 0;
		this.p2Score = 0;
		
		// initialize scrolling speed
		this.scrollSpeed = 5;
		
		// display score
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 100
		};
		
		//speed up flag
		this.speedUp = false;
		// PAUSE flag
		this.pause = false;
		this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
		// add p2 score
		if(game.settings.is2P) {
			this.scoreRight = this.add.text(game.config.width - scoreConfig.fixedWidth - borderUISize - borderPadding, 
			borderUISize + borderPadding * 2, this.p2Score, scoreConfig);
		}
			
		scoreConfig.fixedWidth = 0;
		this.messagePrompt = this.add.text(game.config.width/2, game.config.height/2, 'PAUSE', scoreConfig).setOrigin(0.5).setVisible(false);
		scoreConfig.fontSize = '20px';
		this.instructPrompt = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (P) to Continue or ← for Menu', scoreConfig).setOrigin(0.5).setVisible(false);
		
		// GAME OVER flag
		this.gameOver = false;
		
		// 60-seconds play clock
		scoreConfig.fontSize = '28px';
		scoreConfig.fixedWidth = 0;
		this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
			
			if(game.settings.endranceMode && !game.settings.is2P) {
				this.enduranceMode();
			} else {
				this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
				this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
				this.gameOver = true;
			}
			
		}, null, this);
		
		// initialize time passed
		this.timePassed = 0;
		
		// initialize bonus time
		this.isBonusRewarded = false;
		
		this.timer = this.add.text(game.config.width / 2 - borderUISize * 2 - borderPadding, 
			borderUISize + borderPadding * 2, 'TIMER: ' + this.clock.getRemainingSeconds(), scoreConfig);
		
		this.speedAfter = 30000;
	}
	update(){
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
			this.scene.restart();
		}
		if ((this.gameOver || this.pause) && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
			this.scene.start("menuScene");
		}
		
		if (!this.pause && !this.gameOver && Phaser.Input.Keyboard.JustDown(keyP)) {
			this.pause = true;
			this.messagePrompt.setVisible(true);
			this.instructPrompt.setVisible(true);
			this.clock.paused = true;
			if(this.isBonusRewarded) {
				this.bounusClock.paused = true;
			}
		} else if (this.pause && Phaser.Input.Keyboard.JustDown(keyP)) {
			this.messagePrompt.setVisible(false);
			this.instructPrompt.setVisible(false);
			this.pause = false;
			this.clock.paused = false;
			if(this.isBonusRewarded) {
				this.bounusClock.paused = false;
			}
		}
		this.timePassed = game.settings.gameTimer - this.clock.getRemaining();
		
		if((this.timePassed <= 5000 || this.clock.getRemaining() <= 10000 || game.settings.timerAlwaysDisplay) & this.isBonusRewarded == false) {
			this.timer.text = 'TIMER: ' + this.clock.getRemainingSeconds().toString().split('.')[0];
		} else if(this.timePassed  >= this.speedAfter & this.isBonusRewarded == false) {
			this.timer.text = 'SPEED UP';
		} else if(this.isBonusRewarded == false) {
			this.timer.text = 'FIRE COMPUTER';
		} else if(this.isBonusRewarded == true) {
			this.timer.text = 'BONUS: ' + this.bounusClock.getRemainingSeconds().toString().split('.')[0];
		}
		
		if(this.timePassed >= this.speedAfter & !this.speedUp) {
			this.speedUp = true;
			this.scrollSpeed = 10;
		}
		
		this.starfield.tilePositionX -= this.scrollSpeed;
			
		if (!this.gameOver && !this.pause) {
			this.p1Rocket.update();
			
			// update based on player mode
			if(game.settings.is2P) {
				this.p2Rocket.update(true, this.input.activePointer.x, this.input.activePointer.isDown);
			}
			
			this.ship01.update(this.speedUp);
			this.ship02.update(this.speedUp);
			this.ship03.update(this.speedUp);
		}
		
		
		// check collisions
		if(this.checkCollison(this.p1Rocket, this.ship03)) {
			this.p1Rocket.reset();
			this.p1Score += this.shipExplode(this.ship03);
			this.scoreLeft.text = this.p1Score;
		}
		if(this.checkCollison(this.p1Rocket, this.ship02)) {
			this.p1Rocket.reset();
			this.p1Score += this.shipExplode(this.ship02);
			this.scoreLeft.text = this.p1Score;
		}
		if(this.checkCollison(this.p1Rocket, this.ship01)) {
			this.p1Rocket.reset();
			this.p1Score += this.shipExplode(this.ship01);
			this.scoreLeft.text = this.p1Score;
		}
		
		if(game.settings.is2P) {
			if(this.checkCollison(this.p2Rocket, this.ship03)) {
				this.p2Rocket.reset();
				this.p2Score += this.shipExplode(this.ship03);
				this.scoreRight.text = this.p2Score;
			}
			if(this.checkCollison(this.p2Rocket, this.ship02)) {
				this.p2Rocket.reset();
				this.p2Score += this.shipExplode(this.ship02);
				this.scoreRight.text = this.p2Score;
			}
			if(this.checkCollison(this.p2Rocket, this.ship01)) {
				this.p2Rocket.reset();
				this.p2Score += this.shipExplode(this.ship01);
				this.scoreRight.text = this.p2Score;
			}
		}
	}
	checkCollison(rocket, ship) {
		// simple AABB checking
		if (rocket.x < ship.x + ship.width && 
			rocket.x + rocket.width > ship.x && 
			rocket.y < ship.y + ship.height &&
			rocket.height + rocket.y > ship.y) {
			return true;
		} else {
			return false;
		}
	}
	shipExplode(ship) {
		// temporarily hide ship
		ship.alpha = 0;
		// create explosion 
		let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
		boom.anims.play('explode');
		boom.on('animationcomplete', () => {
			ship.reset();
			ship.alpha = 1;
			boom.destroy();
		});
		
		this.sound.play('sfx_explosion');
		return ship.points;
	}
	enduranceMode() {
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		};
		this.isBonusRewarded = true;
		this.bounusTime = 5000 + (this.p1Score * 70);
		this.bounusClock = this.time.delayedCall(this.bounusTime, () => {
			this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
			this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
			this.gameOver = true;
		}, null, this);
	}
}