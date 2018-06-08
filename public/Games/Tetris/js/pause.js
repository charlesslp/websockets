
var pause_fondo;    // imagen transparente simulando el pause
var textContinue;   // texto "conitnuar"
var textSonido; // texto "sonido activado"
var arrow;  // flecha seleccionadora
var selectPause;    // a donde apunta la flecha

var vel_x;
var vel_y;

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


        textSalir = game.add.text(game.world.centerX, 200*Y, "Salir", { fontSize: '20px', fill: '#ffffff'});
        textSalir.width = textSalir.width*X;
        textSalir.height = textSalir.height*Y;
        textSalir.anchor.setTo(0.5,0.5);

        arrow1 = game.add.sprite(textContinue.x-textContinue.width/2-35*X, textContinue.y, 'arrow');
        arrow1.anchor.setTo(0.5,0.5);
        arrow1.width = 30*X;
        arrow1.height = 25*Y;
        arrow1.frame=0;


        arrow2 = game.add.sprite(textContinue.x+textContinue.width/2+35*X, textContinue.y, 'arrow');
        arrow2.anchor.setTo(0.5,0.5);
        arrow2.width = 30*X;
        arrow2.height = 25*Y;
        arrow2.frame=1;

        selectPause = "continue";

        if(!game.device.desktop){
            arrow1.destroy();
            arrow2.destroy();
            textContinue.inputEnabled = true;
            textSalir.inputEnabled = true;
            textContinue.events.onInputDown.add(function() {select_pause('continue')}, this);
            textSalir.events.onInputDown.add(function() {select_pause('salir')}, this);
        }

        cursors.left.isDown = false;
        cursors.right.isDown = false;
        cursors.down.isDown = false;
        cursors.space.isDown = false;


    }
    else {
        un_pause();
    }
}

function un_pause(){
    isPaused = false;
    pause_fondo.destroy();
    textContinue.destroy();
    textSalir.destroy();
    arrow1.destroy();
    arrow2.destroy();
    selectPause = "";
    who_pressed = -1;


    cursors.left.isDown = false;
    cursors.right.isDown = false;
    cursors.down.isDown = false;
    cursors.space.isDown = false;
}

function moveArrow(order){

    if(order === "up"){
        if(selectPause === "salir"){
            selec_continue();
        }
    }
    else if(order === "down"){
        if(selectPause === "continue"){
            selec_salir();
        }
    }

}

function selec_continue(){
    arrow1.x = textContinue.x-textContinue.width/2-35*X;
    arrow1.y = textContinue.y;
    arrow2.x = textContinue.x+textContinue.width/2+35*X;
    arrow2.y = textContinue.y;
    selectPause = "continue";
}

function selec_salir(){
    arrow1.x = textSalir.x-textSalir.width/2-35*X;
    arrow1.y = textSalir.y;
    arrow2.x = textSalir.x+textSalir.width/2+35*X;
    arrow2.y = textSalir.y;
    selectPause = "salir";
}

function select_pause(selectEspecific){

    if(selectEspecific)
        selectPause = selectEspecific;

    switch(selectPause){
        case "continue": un_pause(); break;
        case "salir": {
            if(game.global.exposition)
                window.location.href = '/catalogue.html?id=' + id_juego;
            else
                window.location.href = '/';
            break;
        }
        default: un_pause(); break;
    }
}