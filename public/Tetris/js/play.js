
var X;
var Y;

var jugando = false;
var isPaused = false;
var gameOver = false;

var gameOverText = "";
var transparente = "";

var TIMER = 0;

var button

var playState = {

	preload: function(){
    },
    create: function() {

        X = game.global.x;
        Y = game.global.y;

        TIMER = 0;

        jugando = true;
        isPaused = false;
        gameOver = false;

        var background = game.add.sprite(game.world.centerX-LONG*11, game.world.height-LONG*22, "background");
        background.width=LONG*22;
        background.height=LONG*22;

        ini_token();

        if(!game.device.desktop){
            button = game.add.button(game.world.width-45*X, 5*Y, 'button', function (){
                pause();
            }, this);
            button.width = 40*X;
            button.height = 40*Y;
        }

    },
    update: function() {

        if(cursors.escape.isDown && !isPaused){
            pause();
        }

        if(jugando){
            if(!isPaused)
                step_token();
            else{
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
        else {

            if(!gameOver){
                transparente = game.add.sprite(game.world.centerX, game.world.centerY, "pause_fondo");
                transparente.width = game.world.width;
                transparente.height = 130;
                transparente.anchor.set(0.5,0.5);
                gameOverText = game.add.sprite(game.world.centerX, game.world.centerY, "gameOver");
                gameOverText.anchor.set(0.5,0.5);
                pressedTurn = true;
                gameOver = true;
            }
            else{
                if(TIMER === 120){
                    TIMER = 0;
                    var sprite = game.add.sprite(0, 0, 'fadeOut');
                    sprite.width = game.world.width;
                    sprite.height = game.world.height;
                    sprite.alpha = 0;

                    var tween = game.add.tween(sprite).to({ alpha: 1}, 600, Phaser.Easing.Linear.None, true, 300, 0, false);

                    tween.onComplete.add(function(){
                        game.state.start("menu");
                    }, this);

                }
                else
                    TIMER++;
            }

            pressedTurn = false;

        }

    }
};