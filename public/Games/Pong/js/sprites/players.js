


function ini_players(){

    players[0] = game.add.sprite(20*X, game.world.centerY-20*Y, 'player');
    players[1] = game.add.sprite(game.world.width - 27*X, game.world.centerY-20*Y, 'player');

    for (var i = 0; i < 2; i++) {
        players[i].width = 7*X;
        players[i].height = 40*Y;

        game.physics.arcade.enable(players[i]);

        players[i].body.collideWorldBounds = true; // choca con los límites de la pantalla
    }

    cursors = game.input.keyboard.createCursorKeys(); // entradas por teclado

    cursors.escape = game.input.keyboard.addKey(Phaser.KeyCode.ESC);

    if(numPlayers > 1){
        cursors.up = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        cursors.down = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        cursors.w = game.input.keyboard.addKey(Phaser.KeyCode.W);
        cursors.s = game.input.keyboard.addKey(Phaser.KeyCode.S);

        cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        cursors.enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    }
    else {
        cursors.w = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        cursors.s = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

        cursors.enter = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

}

function step_players(){

    players[0].body.velocity.y = 0;
    if(numPlayers > 1)
        players[1].body.velocity.y = 0;


    if(cursors.w.isDown){
        players[0].body.velocity.y = -300*Y;
    }
    else if(cursors.s.isDown){
        players[0].body.velocity.y = 300*Y;
    }
    if(numPlayers > 1) {
        if (cursors.up.isDown) {
            players[1].body.velocity.y = -300 * Y;
        }
        else if (cursors.down.isDown) {
            players[1].body.velocity.y = 300 * Y;
        }
    }

}


function ini_HUD(){
    scoreText0 = game.add.text(70*X, 2*Y, '0', { fontSize: '50px', fill: '#ffffff' });
    scoreText0.width = scoreText0.width*X;
    scoreText0.height = scoreText0.height*Y;
    scoreText0.anchor.setTo(0.5,0);
    scoreText1 = game.add.text(game.world.width - 70*X, 2*Y, '0', { fontSize: '50px', fill: '#ffffff' });
    scoreText1.width = scoreText1.width*X;
    scoreText1.height = scoreText1.height*Y;
    scoreText1.anchor.setTo(0.5,0);
}