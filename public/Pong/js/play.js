
var X;
var Y;

var players = [];
var ball;
var cursors;

var scored = false;
var jugando = false;
var isPaused = false;
var SCORE0 = 0;
var SCORE1 = 0;

var scoreText0;
var scoreText1;
var endText;
var p1_ready = false;
var preparado_p1;
var p2_ready = false;
var preparado_p2;
var primera_vez = true;

var playState = {

	preload: function(){
        game.load.image('player', 'Pong/assets/images/player.png');
        game.load.image('ball', 'Pong/assets/images/ball.png');
        game.load.image('pause_fondo', 'Pong/assets/images/transparente.png');
        game.load.spritesheet('arrow', 'Pong/assets/images/greenArrow.png', 85, 85);
	},
    create: function() {

        X = game.global.x;
        Y = game.global.y;

        isPaused = false;

        preparado_p1 = game.add.text(game.world.centerX/2+10*X, game.world.centerY, '¿Preparado juador 1?\n           Pulsa A', { fontSize: '20px', fill: '#ffffff' });
        preparado_p1.width = preparado_p1.width*X;
        preparado_p1.height = preparado_p1.height*Y;
        preparado_p1.anchor.setTo(0.5,0.5);

        preparado_p2 = game.add.text(game.world.centerX-10*X+game.world.centerX/2, game.world.centerY, '¿Preparado jugador 2?\n           Pulsa A', { fontSize: '20px', fill: '#ffffff' });
        preparado_p2.width = preparado_p2.width*X;
        preparado_p2.height = preparado_p2.height*Y;
        preparado_p2.anchor.setTo(0.5,0.5);

        
        ini_players();

        ini_HUD();

    },
    update: function() {

        if(!isPaused){
            if(jugando){
                step_players();
            
                step_ball();
            } else{


                if(cursors.enter.isDown){
                    preparado_p2.destroy();
                    p2_ready = true;
                }
                if(cursors.x.isDown){
                    preparado_p1.destroy();
                    p1_ready = true;
                }

                cursors.enter.isDown = false;
                cursors.x.isDown = false;

                if(p1_ready && p2_ready){
                    if(primera_vez){
                        ini_ball();
                        primera_vez = false;
                        p1_ready = false;
                        p2_ready = false;
                        jugando = true;
                    }
                    else {
                        players[0].destroy();
                        players[1].destroy();
                        ball.destroy();
                        scoreText0.destroy();
                        scoreText1.destroy();
                        endText.destroy();
                        SCORE0 = 0;
                        SCORE1 = 0;
                        ini_players();
                        ini_HUD();
                        ini_ball();
                        p1_ready = false;
                        p2_ready = false;
                        jugando = true;
                    }
                }
            }
        }
    }
};