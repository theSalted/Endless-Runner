/*
Title: Dimension Dash
Date: 07/08/2021 - we decided to take extra time in order to polish our game
Collaborators: 	 
 Yanyao Hu
 Yuhao Chen
 Izat Temiraliev

Creative tilt justification:
1) We think that the most interesting part of our game is that a main character can
travel to different dimensions (with different physics) through portals.  We are 
particularly proud of implementing the physics for our in-game assets and collisions.
We did look beyond the class examples for many instances of our game.  We tried to 
make a new form of an endless run, in a way that the levels are constanly changing along
with game physics.

2) We believe that our game has a very great visual style and the music themes suit them as well.
Our character has a different set of equipment (character model) which is supposedly allow them to
travel across the levels.

We decided to use global variables for Health and Score in order to keep track of them across different
levels (when you portal to another scene).  It took some time to figure out, because the Phaser 3 documentation
is very inconvenient to use.  
We believe that our game has a very good visual design with a very original art for all in-game assets.

For our music we modified some copyright free audio samples to suit our game's atmosphere.
AdhesiveWombat - Night Shade ♫ NO COPYRIGHT 8-bit Music
Eric Skiff - Underclocked ♫ NO COPYRIGHT 8-bit Music
Kubbi - Digestive biscuit ♫ NO COPYRIGHT 8-bit Music
And generated audio effects by using online jsfrx software
*/

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

var sceneRand_ground = ['skyScene', 'oceanScene'];
var sceneRand_sky = ['mountScene', 'oceanScene'];
var sceneRand_ocean = ['mountScene', 'skyScene'];


// reserve keyboard vars
let keyLEFT, keyRIGHT, keyDOWN, keySPACE, keyR, keyQ;
