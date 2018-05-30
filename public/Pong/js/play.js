
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

var button; //boton pausa

var message1 = '¿Preparado jugador 1?\n      Pulsa Espacio';
var message2 = '¿Preparado jugador 2?\n          Pulsa Enter';

var playState = {

	preload: function(){
	},
    create: function() {
        console.log(numPlayers);
        X = game.global.x;
        Y = game.global.y;

        isPaused = false;

        message1 = '¿Preparado jugador 1?\n      Pulsa Espacio';
        message2 = '¿Preparado jugador 2?\n          Pulsa Enter';

        if(game.global.exposition){
            message1 = '¿Preparado jugador 1?\n           Pulsa A';
            message2 = '¿Preparado jugador 2?\n           Pulsa A';
        }
        else if(!game.device.desktop){
            message1 = 'Toca la parte superior para subir\n    y la parte inferior para bajar';
            button = game.add.button(game.world.width-45*X, 5*Y, 'button', function (){
                pause();
            }, this);
            button.width = 40*X;
            button.height = 40*Y;
        }

        preparado_p1 = game.add.text(game.world.centerX/2+10*X, game.world.centerY, message1, { fontSize: '20px', fill: '#ffffff' });
        preparado_p1.width = preparado_p1.width*X;
        preparado_p1.height = preparado_p1.height*Y;
        preparado_p1.anchor.setTo(0.5,0.5);

        if(!game.device.desktop){
            preparado_p1.x += game.world.centerX - preparado_p1.width/2;
            message1 = '       ¿Quieres volver a jugar?\nToca la parte superior para subir\n    y la parte inferior para bajar';
        }
        if(numPlayers > 1){
            preparado_p2 = game.add.text(game.world.centerX-10*X+game.world.centerX/2, game.world.centerY, message2, { fontSize: '20px', fill: '#ffffff' });
            preparado_p2.width = preparado_p2.width*X;
            preparado_p2.height = preparado_p2.height*Y;
            preparado_p2.anchor.setTo(0.5,0.5);
        }
        else
            p2_ready = true;
        
        ini_players();

        ini_HUD();

    },
    update: function() {

        if(cursors.escape.isDown && !isPaused){
            pause();
        }

        if(!game.device.desktop && window.innerWidth >= window.innerHeight){
            checkTouch();
        }


        if(!isPaused){
            if(jugando){
                step_players();
                if(numPlayers <= 1)
                     step_npc();
                step_ball();
            } else{


                if(!p2_ready && cursors.enter.isDown){
                    preparado_p2.destroy();
                    p2_ready = true;
                }
                if(!p1_ready && cursors.space.isDown){
                    preparado_p1.destroy();
                    p1_ready = true;
                }

                cursors.enter.isDown = false;
                cursors.space.isDown = false;

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
        else {
            if(cursors.down.isDown && !isDown){
                moveArrow("down");
                isDown = true;
            }
            else if(!cursors.down.isDown)
                isDown = false;

            if(cursors.up.isDown && !isUp){
                moveArrow("up");
                isUp = true;
            }
            else if(!cursors.up.isDown)
                isUp = false;

            if(cursors.space.isDown && !isSpace){
                select_pause();
                isSpace = true;
            }
            else if(!cursors.space.isDown)
                isSpace = false;
        }
    }
};

function checkTouch() {

    if (!isPaused && !jugando) {
        if (game.input.pointer1.isDown)
            cursors.space.isDown = true;
    }
    else if(!isPaused && jugando) {
        if (game.input.pointer1.isUp) {
            cursors.up.isDown = false;
            cursors.down.isDown = false;
        }else {
            if(game.input.pointer1.isDown && (game.input.pointer1.x < button.x || game.input.pointer1.y > button.y+button.height)) {
                if (game.input.pointer1.y < game.world.centerY) {
                    cursors.up.isDown = true;
                    cursors.down.isDown = false;
                }
                else if (game.input.pointer1.y > game.world.centerY) {
                    cursors.down.isDown = true;
                    cursors.up.isDown = false;
                }
            }
        }
    }
}