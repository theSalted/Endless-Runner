class GameOver extends Phaser.Scene {
	constructor() {
		super("gameOver");
	}
	create() {
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
			'Game Over', menuConfig).setOrigin(0.5);
                        menuConfig.backgroundColor = '#00FF00';
                menuConfig.color = '#000';
                this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
			'Press R to Restart or Q to Quit', menuConfig).setOrigin(0.5);

		// key mapping
		keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
                keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

	}
	update() {
	       if (Phaser.Input.Keyboard.JustDown(keyR)) {
	               this.scene.start("playScene1");
	       }

                if (Phaser.Input.Keyboard.JustDown(keyQ)) {
			     this.scene.start("menuScene");
		}
	}
}

