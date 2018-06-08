
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VARIABLES GLOBALES

//record actual: 5450
//diego 20860


var X;
var Y;
var Z;

var player;
var enemies;
var cursors;
var muros;
var balas;
var bosses;


var disparado;  //bool - Indica si aún hay una bala en juego
var direction;  //int - Indica la velocidad del enemigo en x (+10 o -10)
var stop_all;   //bool - Indica si se ha detenido el juego (carga, quitar vida, etc.)
var espacioUp;  //bool - Indica si se ha levantado la tecla espacio
var isPaused;

var SCORE;      //int - Indica la puntuación actual
var VIDAS;      //int - Indica las vidas
var NIVEL;      //int - Indica el nivel de dificultad
var TIMER;      //int - Contador para mostrar GAME OVER
var EXTRA_LIFE; //int - Indica la puntuación que hay que alcanzar para obtener una vida extra

var img_vidas;  //array - Guarda las imágenes de las vidas mostradas en el HUD

var scoreText;  //text - Muestra el score
var livesText;  //text - Muestra las vidas

var controller;     // sprite - Mando para cuando se juega en movil

var isDown = false; //for pause mode
var isUp = false;
var isSpace = false;

var button;

// VARIABLES GLOBALES
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var playState = {

    create: function() {

        X = game.global.x;
        Y = game.global.y;
        Z = 0;

        if(!game.device.desktop){
            Y = Y-Y*0.12;
            Z = game.world.height*0.12;
        }

        disparado = false;
        direction = 10*X;
        stop_all = true;
        espacioUp = true;
        isPaused = false;

        SCORE = 0;
        VIDAS = 3;
        NIVEL = 1;
        TIMER = 0;
        EXTRA_LIFE = 1000;

        img_vidas = [];
        
        ini_jugador();

        ini_enemies();
        
        ini_muro();

        ini_balas();

        ini_misiles();

        ini_HUD();

        if(!game.device.desktop){
            button = game.add.button(game.world.width-42*X, 2*Y, 'buttonPause', function (){
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

        if(!isPaused){
            if(!stop_all){
                step_player();

                step_enemy();
            }
            else{
                player.body.velocity.x = 0;
                if(VIDAS <= 0){
                    if(TIMER === 120){
                        sprite = game.add.sprite(0, 0, 'fadeOut');
                        sprite.width = game.world.width;
                        sprite.height = game.world.height;
                        sprite.alpha = 0;

                        var tween = game.add.tween(sprite).to({ alpha: 1}, 600, Phaser.Easing.Linear.None, true, 300, 0, false);

                        tween.onComplete.add(function(){ game.state.start("menu"); }, this);
                        
                    }
                    else
                        TIMER++;
                }
            }

            step_bala();

            step_misil();
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

