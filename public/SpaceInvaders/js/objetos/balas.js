

var explosion_sound;
var enemykill_sound;
var bosskill_sound;

var ini_balas = function(){

    balas = game.add.group();
    balas.enableBody = true;

    enemykill_sound = game.add.audio('enemykill', 0.5);
    bosskill_sound = game.add.audio('bosskill', 0.5, true);

    ee_ini();
}


var ini_misiles = function(){ // los misiles son las balas que lanzan los enemigos

    misiles = game.add.group();
    misiles.enableBody = true;

    explosion_sound = game.add.audio('explosion', 0.5);
}






var step_bala = function () {
    game.physics.arcade.overlap(balas, muros, choca_muro, null, this);
    game.physics.arcade.overlap(balas, misiles, choca_misil, null, this);

    for (var i = 0; i < balas.children.length; i++){
        if(balas.children[i].body.y <= 27*Y){

            var explosion = game.add.sprite(balas.children[i].x, balas.children[i].y-5*Y, 'explosion');
            explosion.width = explosion.width*X;
            explosion.height = explosion.height*Y;

            explosion.animations.add('explode', [0], 4, false);
            explosion.play('explode');
            explosion.anchor.setTo(0.5);
            explosion.animations._anims['explode'].onComplete.add(kill_anim, this);

            balas.children[i].destroy();
            disparado = false;
        }
    }

}

var step_misil = function () {

    game.physics.arcade.overlap(misiles, muros, rompe_muro, null, this);

    for (var i = 0; i < misiles.children.length; i++){
        if(misiles.children[i].body.y > game.world.height-25*Y-misiles.children[i].body.height-Z){

            var explosion = game.add.sprite(misiles.children[i].x, misiles.children[i].y+11*Y, 'explosion');
            explosion.width = explosion.width*X;
            explosion.height = explosion.height*Y;

            explosion.animations.add('explode', [0], 4, false);
            explosion.play('explode');
            explosion.anchor.setTo(0.5);
            explosion.animations._anims['explode'].onComplete.add(kill_anim, this);

            misiles.children[i].destroy();
        }
    }

}

function choca_misil(bala, misil){
    disparado = false;

    var explosion = game.add.sprite(bala.x, bala.y, 'explosion');
    explosion.width = explosion.width*X;
    explosion.height = explosion.height*Y;

    explosion.animations.add('explode', [1], 4, false);
    explosion.play('explode');
    explosion.anchor.setTo(0.5);
    explosion.animations._anims['explode'].onComplete.add(kill_anim, this);

    bala.kill();
    misil.kill();
}

function kill_anim(bala, anim){
    bala.kill();
}
 

function choca_muro(bala, muro){
    disparado = false;
    rompe_muro(bala, muro);
}



function rompe_muro (bala, muro) {

    bala.kill();

    if(muro.vida <= 1)
        muro.kill();
    else{
        muro.vida--;
        muro.frame++;
        muro.frame++;
    }

}




function destruir (bala, enemy) {

    if(enemy.frame !== 6){

        SCORE += enemy.type;
        scoreText.text = "Score: " + SCORE;

        if(SCORE >= EXTRA_LIFE && VIDAS < 9){
            img_vidas[VIDAS] = game.add.sprite((25+VIDAS*35)*X, game.world.height-21*Y-Z, 'player');
            img_vidas[VIDAS].width = img_vidas[VIDAS].width*X;
            img_vidas[VIDAS].height = img_vidas[VIDAS].height*Y;

            VIDAS++;
            livesText.text= VIDAS;
            EXTRA_LIFE += 1000;
        }

        disparado = false;
        bala.kill();

        enemy.move = false;

        if(enemy.type !== 100) //Si no es el boss
            anim = enemy.animations.add('kill', [6], 2, false);
        else{
            enemy.body.velocity.x = 0;
            anim = enemy.animations.add('kill', [1], 1.5, false);
        }

        if(enemy.type >= 100){
            boss_sound.stop();

            if(game.global.PLAY_MUSIC)
                bosskill_sound.play();
        }
        else{
            if(game.global.PLAY_MUSIC)
                enemykill_sound.play();
        }

        anim.onComplete.add(destruir_enemigo, this);

        anim.play();
    }
}

function destruir_enemigo (enemy, anim) {

    enemy.destroy();

    if(enemy.type >= 100){
        bosskill_sound.stop();
    }

    if(enemies.length <= 0){
        NIVEL++;
        stop_all = true;

        misiles.callAll("kill");
        balas.callAll("kill");
        bosses.callAll("kill");
        boss_sound.stop();
        bosskill_sound.stop();
        disparado = false;
        ini_enemies();
    }

    ee_next();
}





function quita_vida(player, misil){


    misil.kill();
    misiles.callAll("kill");
    balas.callAll("kill");
    disparado = false;
    stop_all = true;

    if(game.global.PLAY_MUSIC)
        explosion_sound.play();

    anim = player.animations.add('kill', [1,2,1,2,1,2,0], 5, false);
    anim.onComplete.add(quitar_vida_2, this);

    
    anim.play();


}

function quitar_vida_2(){

    misiles.callAll("kill");

    stop_all = false;
    VIDAS--;
    livesText.text = VIDAS;
    img_vidas[VIDAS].destroy();

    if(VIDAS <= 0)
        game_over();
}

function game_over(){
    
    var image = game.add.image(game.world.centerX, game.world.centerY, 'gameOver');
    image.anchor.setTo(0.5);
    image.scale.setTo(0.75,0.75);
    image.width = image.width*X;
    image.height = image.height*Y;
    
    stop_all = true;

    misiles.callAll("kill");
    balas.callAll("kill");
    bosses.callAll("kill");
    player.kill();

    boss_sound.stop();
    bosskill_sound.stop();

    VIDAS = 0;

}

function start_again(){
    game.state.start("menu")
}