
//var game = new Phaser.Game(560, 370, Phaser.AUTO, 'gameDiv');
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "game");


	game.global = {
		PLAY_MUSIC: false,

		x: window.innerWidth/560,
		y: window.innerHeight/370
	}

    game.state.add('menu', menuState);
    game.state.add('boot', bootState);
    game.state.add('play', playState);

    game.state.start('boot');