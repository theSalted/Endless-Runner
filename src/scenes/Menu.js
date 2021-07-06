class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}
	preload() {
		this.load.audio('sfx_background1', './assets/ground_song.wav');
		this.load.audio('sfx_background2', './assets/ocean_song.wav');
		this.load.audio('sfx_background_sky', './assets/sky/sky_song.wav');
		this.load.audio('sfx_hit', './assets/hit.wav');
	}
	create() {
		console.log('Menu Loaded')
		let menuConfig = {
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
        }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
			'Endless Runner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
			'SPACE - JUMP', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press RIGHT to Start', menuConfig).setOrigin(0.5);

		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);		
	}
	update() {
		if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
			this.scene.start("skyScene");
			//this.sound.get('sfx_background1').stop();
		}
	}
}

