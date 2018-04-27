
var X;
var Y;

var jugando = false;
var isPaused = false;

var gameOverText = "";
var transparente = "";

var playState = {

	preload: function(){
        game.load.spritesheet('token', 'Tetris/assets/images/gameboy/Tetris_sprites/tetris_sheet.png', 32, 32);
        game.load.spritesheet('nextTok', 'Tetris/assets/images/gameboy/Tetris_sprites/next_token_sheet.png', 96, 128);
        game.load.image('background', 'Tetris/assets/images/gameboy/fondo.png');
        game.load.image('line', 'Tetris/assets/images/token3.png');
        game.load.image('pause_fondo', 'Tetris/assets/images/transparente.png');
        game.load.image('gameOver', 'Tetris/assets/images/gameOver.png');
        game.load.spritesheet('arrow', 'Tetris/assets/images/greenArrow.png', 85, 85);
	},
    create: function() {

        X = game.global.x;
        Y = game.global.y;

        jugando = true;

        var background = game.add.sprite(game.world.centerX-32*7, game.world.height-32*28, "background");

        ini_token();

    },
    update: function() {

        if(jugando){
            if(!isPaused)
                step_token();
        }
        else {
            if(!gameOverText){
                transparente = game.add.sprite(game.world.centerX, game.world.centerY, "pause_fondo");
                transparente.width = game.world.width;
                transparente.height = 130;
                transparente.anchor.set(0.5,0.5);
                gameOverText = game.add.sprite(game.world.centerX, game.world.centerY, "gameOver");
                gameOverText.anchor.set(0.5,0.5);
                pressedTurn = true;
            }            
			
		    if(!cursors.space.isDown){
		        pressedTurn = false;
		    }
		    
			if(!pressedTurn && cursors.space.isDown){
        		resetGame();
        	}

        }

    }
};