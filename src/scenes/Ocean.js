class Ocean extends Phaser.Scene {
	constructor() {
		super("oceanScene")
	}
	preload() {
		// load images
		this.load.image('background_ocean', './assets/ocean/background.png');
		this.load.image('seabed_vvfar_ocean', './assets/ocean/vvfar_seabed.png');
		this.load.image('seabed_vfar_ocean', './assets/ocean/vfar_seabed.png');
		this.load.image('seabed_far_ocean', './assets/ocean/far_seabed.png');
		this.load.image('seabed_main_ocean', './assets/ocean/main_seabed.png');
		this.load.image('seabed_coral_ocean', './assets/ocean/coralleaf_seabed.png');
		// load fishes
		this.load.image('fish1', './assets/ocean/fish1.png')
		this.load.image('fish2', './assets/ocean/fish2.png')
		this.load.image('fish3', './assets/ocean/fish3.png')
	}
	create() {
		this.createScene();
		
		
	}
	update() {
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
	createScene() {
		// create scenes
		this.background = this.add.tileSprite(0, 0, 640, 480, 'background_ocean').setOrigin(0, 0);
		this.vvfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vvfar_ocean').setOrigin(0, 0);
		this.fish1 = this.add.tileSprite(0, 0, 640, 480, 'fish1').setOrigin(0, 0);
		this.vfarSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_vfar_ocean').setOrigin(0, 0);
		this.fish2 = this.add.tileSprite(0, 0, 640, 480, 'fish2').setOrigin(0, 0);
		this.farSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_far_ocean').setOrigin(0, 0);
		this.mainSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_main_ocean').setOrigin(0, 0);
		this.fish3 = this.add.tileSprite(0, 0, 640, 480, 'fish3').setOrigin(0, 0);
		this.coralSeabed = this.add.tileSprite(0, 0, 640, 480, 'seabed_coral_ocean').setOrigin(0, 0);
	}
}