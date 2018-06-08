
var shot_sound;

var pointerDown = [];


var ini_jugador = function(){

    player = game.add.sprite(game.world.centerX-13*X, game.world.height - 50*Y - Z, 'player'); // creamos el jugador en su posicion y con su imagen
    player.width = player.width*X;
    player.height = player.height*Y;

    game.physics.arcade.enable(player); // le ponemos físicas al jugador

    // animaciones
    player.animations.add('destroy', [1, 2], 7, true); // (nombre de la animacion, frames, velocidad, loop)
    player.body.collideWorldBounds = true; // choca con los límites de la pantalla


    cursors = game.input.keyboard.createCursorKeys(); // entradas por teclado
    cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    cursors.escape = game.input.keyboard.addKey(Phaser.KeyCode.ESC);

    shot_sound = game.add.audio('shoot', 0.5);

    pointerDown = [];
    pointerDown.push(false);
    pointerDown.push(false);
}





var step_player = function(){

    player.body.velocity.x = 0;

    game.physics.arcade.overlap(player, misiles, quita_vida, null, this);



    if(!game.device.desktop){
        controller.frame=0;
        clicked(game.input.pointer1, 0);
        clicked(game.input.pointer2, 1);
    }



    if (cursors.left.isDown)
    {

        if(!game.device.desktop)
            player.body.velocity.x = -200*X;
        else
            player.body.velocity.x = -250*X;
    }
    else if (cursors.right.isDown)
    {
        
        if(!game.device.desktop)
            player.body.velocity.x = 200*X;
        else
            player.body.velocity.x = 250*X;
    }
    else
    {
        player.frame = 0;
    }
    
    if(cursors.space.isDown && !disparado && espacioUp){
    	espacioUp = false;
        disparado = true;
        bala = balas.create(player.body.x+12*X, player.body.y, 'bala');
        bala.width = bala.width*X;
        bala.height = bala.height*Y;
        bala.body.velocity.y = -400*Y;

        if(game.global.PLAY_MUSIC)
            shot_sound.play();
    }

    if(cursors.space.isUp)
    	espacioUp = true;

    if(!game.device.desktop || fromSocket){
        cursors.space.isDown = false;
        if(!fromSocket){
            cursors.right.isDown = false;
            cursors.left.isDown = false;
        }
        fromSocket = false;
    }

}

function clicked(pointer, n){
    if(pointer.isDown){
        pointerDown[n] = true;

        if(pointer.position.x > 190*X && pointer.position.x < game.world.width-135*X && pointer.position.y > game.world.height/3){
            cursors.right.isDown = true;
            controller.frame=2;
        }
        else {
            if(pointer.position.x < 110*X && pointer.position.y > game.world.height/2){
                cursors.left.isDown = true;
                controller.frame=1;
            }
            else
                controller.frame=0;
        }

    }

    if(pointer.isUp && pointerDown[n]){
        pointerDown[n] = false;
        if(Math.abs(pointer.positionUp.x-pointer.positionDown.x) < 50*X &&
            Math.abs(pointer.positionUp.y-pointer.positionDown.y) < 50*Y &&
            pointer.positionUp.x > game.world.width-130*X && pointer.positionUp.y > game.world.height/2/*-25*Y-Z*/){
                cursors.space.isDown = true;
            }
    }
}
