
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

var controller;      // sprite - Mando para cuando se juega en movil

var pause_fondo;    // imagen transparente simulando el pause
var textContinue;   // texto "conitnuar"
var textSonido; // texto "sonido activado"
var arrow;  // flecha seleccionadora
var selectPause;    // a donde apunta la flecha

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

    },
    update: function() {

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

    }
};



function pause(){

    if(!isPaused){
        isPaused = true;
        pause_fondo = game.add.sprite(0, 0, 'pause_fondo'); // creamos el jugador en su posicion y con su imagen
        pause_fondo.width = game.world.width;
        pause_fondo.height = game.world.height;

        textContinue = game.add.text(game.world.centerX, 150*Y, 'Continuar', { fontSize: '20px', fill: '#ffffff'});
        textContinue.width = textContinue.width*X;
        textContinue.height = textContinue.height*Y;
        textContinue.anchor.setTo(0.5,0.5);
        
        textSonido = game.add.text(game.world.centerX, 200*Y, "Sonido activado", { fontSize: '20px', fill: '#ffffff'});
        textSonido.width = textSonido.width*X;
        textSonido.height = textSonido.height*Y;
        textSonido.anchor.setTo(0.5,0.5);


        if(game.global.PLAY_MUSIC)
            textSonido.text = "Sonido activado";
        else
            textSonido.text = "Sonido desactivado";

        arrow1 = game.add.sprite(textContinue.x-textContinue.width/2-35*X, textContinue.y, 'arrow');
        arrow1.width = 30*X;
        arrow1.height = 25*Y;
        arrow1.anchor.setTo(0.5,0.5);
        arrow1.scale.setTo(0.5,0.5);


        arrow2 = game.add.sprite(textContinue.x+textContinue.width/2+35*X, textContinue.y, 'arrow');
        arrow2.anchor.setTo(0.5,0.5);
        arrow2.width = 30*X;
        arrow2.height = 25*Y;
        arrow2.scale.setTo(-0.5,0.5);

        selectPause = "continue";


        player.body.velocity.x = 0;

        for (var i = 0; i < misiles.children.length; i++){
            misiles.children[i].body.velocity.y = 0;
        }

        for (var i = 0; i < balas.children.length; i++){
            balas.children[i].body.velocity.y = 0;
        }
    }
    else {
        un_pause();
    }
}

function un_pause(){
    isPaused = false;
    pause_fondo.destroy();
    textContinue.destroy();
    textSonido.destroy();
    arrow1.destroy();
    arrow2.destroy();
    selectPause = "";

    for (var i = 0; i < misiles.children.length; i++){
        misiles.children[i].body.velocity.y = 150*Y;
    }

    for (var i = 0; i < balas.children.length; i++){
        balas.children[i].body.velocity.y = -400*Y;
    }
}

function moveArrow(order){

    if(order === "up" && selectPause === "sonido"){
        arrow1.x = textContinue.x-textContinue.width/2-35*X;
        arrow1.y = textContinue.y;
        arrow2.x = textContinue.x+textContinue.width/2+35*X;
        arrow2.y = textContinue.y;
        selectPause = "continue";
    }
    else if(order === "down" && selectPause === "continue"){
        arrow1.x = textSonido.x-textSonido.width/2-35*X;
        arrow1.y = textSonido.y;
        arrow2.x = textSonido.x+textSonido.width/2+35*X;
        arrow2.y = textSonido.y;
        selectPause = "sonido";
    }

}

function select_pause(){
    switch(selectPause){
        case "continue": un_pause(); break;
        case "sonido": {
            if(game.global.PLAY_MUSIC){
                game.global.PLAY_MUSIC = false;
                textSonido.text = "Sonido desactivado";
            }
            else{
                game.global.PLAY_MUSIC = true;
                textSonido.text = "Sonido activado";
            }
            break;
        }
    }
}