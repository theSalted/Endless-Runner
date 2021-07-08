let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Sky, Mount, Ocean, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let p1Score = 0;
let health = 3;

var sceneRand = ['mountScene', 'skyScene'];

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyDOWN, keySPACE, keyR, keyQ;
