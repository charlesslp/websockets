
var pause_fondo;    // imagen transparente simulando el pause
var textContinue;   // texto "conitnuar"
var textSonido; // texto "sonido activado"
var arrow;  // flecha seleccionadora
var selectPause;    // a donde apunta la flecha

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


        textSalir = game.add.text(game.world.centerX, 250*Y, "Salir", { fontSize: '20px', fill: '#ffffff'});
        textSalir.width = textSalir.width*X;
        textSalir.height = textSalir.height*Y;
        textSalir.anchor.setTo(0.5,0.5);


        if(game.global.PLAY_MUSIC)
            textSonido.text = "Sonido activado";
        else
            textSonido.text = "Sonido desactivado";

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


        player.body.velocity.x = 0;

        for (var i = 0; i < misiles.children.length; i++){
            misiles.children[i].body.velocity.y = 0;
        }

        for (var i = 0; i < balas.children.length; i++){
            balas.children[i].body.velocity.y = 0;
        }


        if(!game.device.desktop){
            arrow1.destroy();
            arrow2.destroy();
            textContinue.inputEnabled = true;
            textSonido.inputEnabled = true;
            textSalir.inputEnabled = true;
            textContinue.events.onInputDown.add(function() {select_pause('continue')}, this);
            textSonido.events.onInputDown.add(function() {select_pause('sonido')}, this);
            textSalir.events.onInputDown.add(function() {select_pause('salir')}, this);
        }

        cursors.left.isDown = false;
        cursors.right.isDown = false;
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
    textSonido.destroy();
    textSalir.destroy();
    arrow1.destroy();
    arrow2.destroy();
    selectPause = "";

    for (var i = 0; i < misiles.children.length; i++){
        misiles.children[i].body.velocity.y = 150*Y;
    }

    for (var i = 0; i < balas.children.length; i++){
        balas.children[i].body.velocity.y = -400*Y;
    }

    cursors.left.isDown = false;
    cursors.right.isDown = false;
    cursors.space.isDown = false;
}

function moveArrow(order){

    if(order === "up"){
        if(selectPause ==="sonido"){
            selec_continue();
        }
        else if(selectPause === "salir"){
            selec_sonido();
        }
    }
    else if(order === "down"){
        if(selectPause ==="continue"){
            selec_sonido();
        }
        else if(selectPause === "sonido"){
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


function selec_sonido(){
    arrow1.x = textSonido.x-textSonido.width/2-35*X;
    arrow1.y = textSonido.y;
    arrow2.x = textSonido.x+textSonido.width/2+35*X;
    arrow2.y = textSonido.y;
    selectPause = "sonido";
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
        case "salir": {
            if(game.global.exposition)
                window.location.href = '/catalogue.html?id=' + id_juego;
            else
                window.location.href = '/';
            break;
        }
    }
}