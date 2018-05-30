
var cursors;

function ini_ball(){

    ball = game.add.sprite(game.world.centerX, 8*Y, 'player');
    ball.width = 8*X;
    ball.height = 8*Y;

    game.physics.arcade.enable(ball);

    ball.direction = false; // true = derecha
    ball.body.velocity.y = 200*Y;

}

function step_ball(){

    game.physics.arcade.overlap(ball, players, changeDirection, null, this);

    if(ball.direction){
        ball.body.velocity.x = 300*X;
    }
    else{
        ball.body.velocity.x = -300*X;
    }

    if(ball.y <= 0){
        ball.body.velocity.y = Math.abs(ball.body.velocity.y);
    } else if(ball.y+ball.height >= game.world.height){
        ball.body.velocity.y = -Math.abs(ball.body.velocity.y);
    }

    if(ball.x > game.world.width){
        if(!scored){
            scored = true;
            SCORE0++;
            scoreText0.text = SCORE0;
        }
        if(ball.x > game.world.width + 450*X){
            ball.x = game.world.centerX;
            ball.y = 8*Y;
            ball.body.velocity.y = 200*Y;
            scored = false;
            if(SCORE0 > 6){
                gana(1);
            }
        }
    }

    if(ball.x < 0){
        if(!scored){
            scored = true;
            SCORE1++;
            scoreText1.text = SCORE1;
        }
        if(ball.x < -450*X){
            ball.x = game.world.centerX;
            ball.y = 8*Y;
            ball.body.velocity.y = 200*Y;
            scored = false;
            if(SCORE1 > 6){
                gana(2);
            }
        }
    }

    

}

function changeDirection(ball, player){

    if(player.x > game.world.centerX)
        ball.direction = false;
    else
        ball.direction = true;

    var resta = (ball.y+ball.height/2) - player.y; //calculamos la distancia desde donde esta el jugador a donde está la pelota

    if(resta < 0)
        resta = 0;
    else if(resta > player.height)
        resta = player.height;

    resta = resta-player.height/2; //Si la distancia es menor que la mitad de la barra saldrá negativo, mientras que si no, saldrá positivo

    ball.body.velocity.y = 15*resta;

}

function gana(i){

    ball.kill();


    preparado_p1 = game.add.text(game.world.centerX/2+10*X, game.world.centerY, message1, { fontSize: '20px', fill: '#ffffff' });
    preparado_p1.width = preparado_p1.width*X;
    preparado_p1.height = preparado_p1.height*Y;
    preparado_p1.anchor.setTo(0.5,0.5);

    if(!game.device.desktop){
        preparado_p1.x += game.world.centerX - preparado_p1.width/2;
    }
    if(numPlayers > 1){
        preparado_p2 = game.add.text(game.world.centerX-10*X+game.world.centerX/2, game.world.centerY, message2, { fontSize: '20px', fill: '#ffffff' });
        preparado_p2.width = preparado_p2.width*X;
        preparado_p2.height = preparado_p2.height*Y;
        preparado_p2.anchor.setTo(0.5,0.5);
    }
    else
        p2_ready = true;

    var endMessage = '';

    if(numPlayers > 1)
        endMessage = '¡Player '+i+' Gana!';
    else {
        if(i === 1)
            endMessage = '¡Has ganado!';
        else
            endMessage = '¡Has perdido!';
    }

    endText = game.add.text(game.world.centerX, 0, endMessage, { fontSize: '50px', fill: '#ffffff' });
    endText.width = endText.width*X;
    endText.height = endText.height*Y;
    endText.anchor.setTo(0.5,0.5);
    endText.y = preparado_p1.y - endText.height-20*Y;

    jugando = false;

}