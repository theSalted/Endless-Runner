class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene");
	}
	preload() {
		this.load.audio('sfx_mount', './assets/mount/mount_song.wav');
		this.load.audio('sfx_background_ocean', './assets/ocean/ocean_song.wav');
		this.load.audio('sfx_background_sky', './assets/sky/sky_song.wav');
		this.load.audio('sfx_hit', './assets/hit.wav');
		this.load.audio('sfx_teleport', './assets/teleport_sound.wav');
		this.load.image('menu', './assets/menu.png')
		
		this.load.image('starfield_mount', './assets/mount/purplestarfield.png');
		this.load.image('cloud_mount', './assets/mount/cloud.png');
		this.load.image('mount_mount', './assets/mount/mountains.png');
		this.load.image('forest_mount', './assets/mount/forest.png');
		
		this.load.image('sky_sky', './assets/sky/sky.png');
		this.load.image('star_sky', './assets/sky/stars.png');
		this.load.image('moon_sky', './assets/sky/moon.png');
		this.load.image('mount_sky', './assets/sky/mount.png');
		this.load.image('cloud_sky', './assets/sky/cloud.png');
		
		this.load.image('background_ocean', './assets/ocean/background.png');
		this.load.image('seabed_vvfar_ocean', './assets/ocean/vvfar_seabed.png');
		this.load.image('seabed_vfar_ocean', './assets/ocean/vfar_seabed.png');
		this.load.image('seabed_far_ocean', './assets/ocean/far_seabed.png');
		this.load.image('seabed_main_ocean', './assets/ocean/main_seabed.png');
		this.load.image('seabed_coral_ocean', './assets/ocean/coralleaf_seabed.png');
		this.load.image('fish1', './assets/ocean/fish1.png')
		this.load.image('fish2', './assets/ocean/fish2.png')
		this.load.image('fish3', './assets/ocean/fish3.png')
	}
	create() {
		this.random = Math.floor(Math.random() * 3);
		
		if(this.random == 0) {
			this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield_mount').setOrigin(0, 0);
			this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud_mount').setOrigin(0, 0);
			this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount_mount').setOrigin(0, 0);
			this.forest = this.add.tileSprite(0, 0, 640, 480, 'forest_mount').setOrigin(0, 0);
			
			this.backgroundMusic =  this.sound.add('sfx_mount', {
				volume: 1,
				loop: true
			})
		} else if (this.random <= 1) {
			this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky_sky').setOrigin(0, 0);
			this.stars = this.add.tileSprite(0, 0, 640, 480, 'star_sky').setOrigin(0, 0);
			this.moon = this.add.tileSprite(0, 0, 640, 480, 'moon_sky').setOrigin(0, 0);
			this.mount = this.add.tileSprite(0, 0, 640, 480, 'mount_sky').setOrigin(0, 0);
			this.cloud = this.add.tileSprite(0, 0, 640, 480, 'cloud_sky').setOrigin(0, 0);
			
			this.backgroundMusic =  this.sound.add('sfx_background_sky', {
				volume: 1,
				loop: true
			})
		} else {
			this.background = this.add.tileSprite(0, 0, 640, 480, 'background_ocean').setOrigin(0, 0);
			this.vvfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vvfar_ocean').setOrigin(0, 0);
			this.fish1 = this.add.tileSprite(0, 0, 640, 480, 'fish1').setOrigin(0, 0);
			this.vfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vfar_ocean').setOrigin(0, 0);
			this.fish2 = this.add.tileSprite(0, 0, 640, 480, 'fish2').setOrigin(0, 0);
			this.farSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_far_ocean').setOrigin(0, 0);
			this.mainSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_main_ocean').setOrigin(0, 0);
			this.fish3 = this.add.tileSprite(0, 0, 640, 480, 'fish3').setOrigin(0, 0);
			this.coralSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_coral_ocean').setOrigin(0, 0);
			
			this.backgroundMusic =  this.sound.add('sfx_background_ocean', {
				volume: 1,
				loop: true
			})
		}
		
		this.backgroundMusic.play()
		
		/*
		let menuConfig = {
            fontFamily: 'Impact',
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
			'Dimension Dash', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
			'SPACE = JUMP = SWIM = FLY', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press SPACE to Start', menuConfig).setOrigin(0.5);
			
		
		*/
		
		this.menu = this.add.image(315, 235, 'menu');
		
		// key mapping
		keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);		
		
	}
	update() {
		
		if(this.random == 0) {
			this.starfield.tilePositionX += 1.5;
			this.cloud.tilePositionX += (3.5);
			this.mount.tilePositionX += (4.5);
			this.forest.tilePositionX += (6.5);	
		} else if (this.random <= 1) {
			this.moon.tilePositionX += (0.1);
			this.stars.tilePositionX += (0.3);
			this.mount.tilePositionX += (1.5);
			this.cloud.tilePositionX += (5.5);	
		} else {
			this.background.tilePositionX += 0.3
			this.vvfarSeabed.tilePositionX += 0.5
			this.vfarSeabed.tilePositionX += 0.8
			this.farSeabed.tilePositionX += 1.1
			this.mainSeabed.tilePositionX += 1.5
			this.coralSeabed.tilePositionX += 2.2
			this.fish1.tilePositionX += 3.1
			this.fish2.tilePositionX -= 1.1
			this.fish3.tilePositionX -= 1.4
		}
		
		if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
			this.backgroundMusic.pause();
			if(this.random == 0) {
				this.scene.start("mountScene");
			} else if (this.random <= 1) {
				this.scene.start("skyScene");
			} else {
				this.scene.start("oceanScene");
			}
			//this.sound.get('sfx_background1').stop();
		}
	}
}

