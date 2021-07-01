class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene")
	}
	preload() {
		// load audio
		this.load.audio('sfx_select', './assets/blip.wav');
		this.load.audio('sfx_explosion', './assets/explosion.wav');
		this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
	}
	create() {
		// menu text configuration
		let menuConfig = {
			fontFamily: 'Impact',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5
			},
			fixedWidth: 0
		}
		
		// show menu text
		this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
		menuConfig.fontSize = '20px';
		this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) or (SPACE) to fire', menuConfig).setOrigin(0.5);
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize, '(P) to pause and resume', menuConfig).setOrigin(0.5);
		menuConfig.backgroundColor = '#37946e';
		menuConfig.color = '#000';
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding, 'Press ← for Novice or → for Export', menuConfig).setOrigin(0.5);
		
		//defines key
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		
		// initialize high score
		game.highScore = 0;
	}
	update() {
		// novice mode
		if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
			game.settings = {
				spaceshipSpeed: 3.5,
				speedUpSpeed: 4.5,
				gameTimer: 60000,
				speedUpAfter: 30000,
				timerAlwaysDisplay: false,
				endranceMode: true,
				testMode: false,
				midAirControl: true,
				is2P: false
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
		// export mode
		if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
			game.settings = {
				spaceshipSpeed: 4.5,
				speedUpSpeed: 5.5,
				gameTimer: 45000,
				speedUpAfter: 20000,
				timerAlwaysDisplay: false,
				endranceMode: true,
				testMode: false,
				midAirControl: false,
				is2P: false
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
		// novice 2p
		if (Phaser.Input.Keyboard.JustDown(keyA)) {
			game.settings = {
				spaceshipSpeed: 3.5,
				speedUpSpeed: 4.5,
				gameTimer: 60000,
				speedUpAfter: 30000,
				timerAlwaysDisplay: false,
				endranceMode: false,
				testMode: false,
				midAirControl: true,
				is2P: true
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
		// export 2p
		if (Phaser.Input.Keyboard.JustDown(keyD)) {
			game.settings = {
				spaceshipSpeed: 4.5,
				speedUpSpeed: 5.5,
				gameTimer: 45000,
				speedUpAfter: 20000,
				timerAlwaysDisplay: false,
				endranceMode: false,
				testMode: false,
				midAirControl: false,
				is2P: true
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
		// test mode
		if (Phaser.Input.Keyboard.JustDown(keyF)) {
			game.settings = {
				spaceshipSpeed: 2.5,
				speedUpSpeed: 3.5,
				gameTimer: 3000,
				speedUpAfter: 6000,
				timerAlwaysDisplay: true,
				endranceMode: false,
				testMode: true,
				midAirControl: false,
				is2P: false
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
	}
}