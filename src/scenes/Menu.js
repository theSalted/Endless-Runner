class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene")
	}
	preload() {
		// load audio
		this.load.audio('sfx_select', './assets/blip.wav');
		this.load.audio('sfx_explosion', './assets/explosion.wav');
		this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
		this.load.image('titlescreen', './assets/titlescreen.png');
		this.load.image('spaceship', './assets/bearcan.png');
		this.load.image('forest', './assets/forests.png');
		this.load.image('mounts', './assets/mounts.png');
		this.load.image('clouds', './assets/cloud.png');
		this.load.image('starfield', './assets/starfield.png');
		this.load.audio('background_music','./assets/escape_basic.wav');
		this.load.spritesheet('rollingBear', './assets/bearsheet.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 4})
	}
	create() {
		// menu text configuration
		this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);
		this.mounts = this.add.tileSprite(0, 0, 640, 480, 'mounts').setOrigin(0, 0);
		this.forest = this.add.tileSprite(0, 0, 640, 480, 'forest').setOrigin(0, 0);
		
		
		this.music =  this.sound.add('background_music', {
			volume: 0.8,
			loop: true
		})
		this.music.play()
		
		
		this.anims.create({
			key: 'rolling',
			frames: this.anims.generateFrameNumbers('rollingBear', { start:0, end: 4, first: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize * 4, 'rollingBear', 0, 30, -2, -2).setOrigin(0, 0);
		this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize * 5 + borderPadding * 2, 'rollingBear', 0, 20, -2, -2).setOrigin(0, 0);
		this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding * 4, 'rollingBear', 0, 10, -2, -2).setOrigin(0, 0);
		this.ship01.play('rolling');
		this.ship02.play('rolling');
		this.ship03.play('rolling');
		
		this.titlescreen = this.add.image(0, 0,'titlescreen').setOrigin(0, 0);
		
		/*let menuConfig = {
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
		};
		
		// show menu text
		this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
		menuConfig.fontSize = '20px';
		this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) or (SPACE) to fire', menuConfig).setOrigin(0.5);
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize, '(P) to pause and resume', menuConfig).setOrigin(0.5);
		menuConfig.backgroundColor = '#37946e';
		menuConfig.color = '#000';
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding, 'Press ← for Novice or → for Export', menuConfig).setOrigin(0.5); */
		
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
		
		this.starfield.tilePositionX -= 1.5
		this.clouds.tilePositionX -= (3.5);
		this.mounts.tilePositionX -= (4.5);
		this.forest.tilePositionX -= (6.5);
		
		this.ship01.update();
		this.ship02.update();
		this.ship03.update();
		
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
			this.music.destroy()
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
			this.music.destroy()
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
			this.music.destroy()
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
			this.music.destroy()
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
			this.music.destroy()
			this.scene.start('playScene');
		}
	}
}