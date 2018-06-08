
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "game");


game.global = {
	x: window.innerWidth/560,
	y: window.innerHeight/370
};

game.state.add('menu', menuState);
game.state.add('boot', bootState);
game.state.add('play', playState);

game.state.start('boot');

//game.state.start('play');