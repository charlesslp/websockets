
var boss_sound;
var mov_sound = [];

var sound_cont = 3;


var ini_enemies = function(){

    enemies = game.add.group(); // añadimos el grupo de "plataformas" al game
    enemies.enableBody = true; // permite las físicas dentro del grupo

    bosses = game.add.group();
    bosses.enableBody = true;
    bosses.time = 0;

    enemies.time = 0;
    enemies.time_lapsed = 0;
    enemies.tiempoDisparo = 0;
    enemies.enemy_moved = [false, false, false, false, false];


    var enemy;
    var delay = 1000;

    for (var i = 4; i >= 0; i--) {
        for (var j = 0; j < 11; j++) {
            enemy = enemies.create((j*36+6)*X, (i*26+70+NIVEL*20)*Y, 'enemy');
            enemy.width = enemy.width*X;
            enemy.height = enemy.height*Y;
            enemy.move = true;
            enemy.row = i;
            enemy.alpha = 0;
            if(i === 0){
                enemy.frame=0;
                enemy.type=30;
            }
            else if (i < 3){
                enemy.frame=2;
                enemy.type=20;
            }
            else{
                enemy.frame=4;
                enemy.type=10;
            }

            delay += 20;

            var tween = game.add.tween(enemy).to({ alpha: 1 }, 10, Phaser.Easing.Linear.None, true, delay, 0, false);
            
            if(i === 0 && j === 10)
                tween.onComplete.add(function(){ stop_all = false; }, this);

        }
    }

    sound_cont = 3;

    boss_sound = game.add.audio('boss', 0.5, true);
    mov_sound[0] = game.add.audio('mov1');
    mov_sound[1] = game.add.audio('mov2');
    mov_sound[2] = game.add.audio('mov3');
    mov_sound[3] = game.add.audio('mov4');
    
}




var step_enemy = function () {

    enemies.time += 1;
    bosses.time += 1;

    game.physics.arcade.overlap(balas, enemies, destruir, null, this);
    game.physics.arcade.overlap(enemies, muros, destruir_muro, null, this);
    game.physics.arcade.overlap(balas, bosses, destruir, null, this);
    game.physics.arcade.overlap(enemies, player, game_over, null, this);

    
    //MOVER ENEMIGO
    if(enemies.time_lapsed === 0){
        enemies.time_lapsed = enemies.time;
    }
    else
        enemies.time_lapsed += 1;   


    for (var i = 4; i >= 0; i--) {
        if(enemies.time_lapsed > enemies.length-i*enemies.length/5.5){

            move_enemy(i);

            if(i === 4){
                enemies.time = 0;
            }

            if(i === 0){
                
                if(game.global.PLAY_MUSIC)
                    mov_sound[sound_cont].play();

                sound_cont++;
                if(sound_cont >= 4)
                    sound_cont = 0;

                for (var j = 0; j < 5; j++) {
                    enemies.time_lapsed = 0;
                    enemies.enemy_moved[j] = false;
                }
            }


            if(i === 0){
                var cambiarDireccion = false;

                for (var j = 0; j < enemies.children.length; j++){
                    if(enemies.children[j].move){
                        
                        if(direction > 0){
                            if(enemies.children[j].x + direction + 24*X > game.world.width)
                                cambiarDireccion = true;
                        }
                        else {
                            if(enemies.children[j].x + direction < 0)
                                cambiarDireccion = true;
                        }
                    }
                }

                if(cambiarDireccion){
                    for (var k = 0; k < enemies.children.length; k++){
                        if(enemies.children[k].move){
                            enemies.children[k].y += 10*Y;
                            if(enemies.children[k].y >= game.world.height-70*Y-Z)
                                game_over();
                        }
                    }
                    direction = -direction;
                }
            }

        }
    }

    



    //DISPARO ENEMIGO

    if(enemies.tiempoDisparo > 50 && enemies.children.length > 0){
        enemies.tiempoDisparo = 0;
        var rand = Math.floor((Math.random() * enemies.children.length));
        var rand2 = Math.floor((Math.random() * 3)+1);
        misil = misiles.create(enemies.children[rand].body.x+12*X, enemies.children[rand].body.y+12*Y, 'misil'+rand2);
        misil.width = misil.width*X;
        misil.height = misil.height*Y;
        misil.body.velocity.y = 150*Y;
        misil.animations.add('move', [0,1,2,3], 12, true);
        misil.play('move');
    }
    else
        enemies.tiempoDisparo++;


    //BOSS ALEATORIO
    var rand = Math.floor((Math.random() * 1000));
    if(rand === 0 && bosses.time > 1000){
        boss = bosses.create(0, 50*Y, 'boss');
        boss.width = boss.width*X;
        boss.height = boss.height*Y;
        boss.body.velocity.x = 120*X;
        boss.type = 100;

        if(game.global.PLAY_MUSIC)
            boss_sound.play();

        bosses.time = 0;
    }
    
    for (var i = 0; i < bosses.children.length; i++){
        if(bosses.children[i].body.x > game.world.width + 50*X){
            boss_sound.stop();
            bosses.children[i].destroy();
        }
    }

}




function move_enemy (row){

    if(!enemies.enemy_moved[row]){

        enemies.enemy_moved[row] = true;

        for (var i = 0; i < enemies.children.length; i++){
            if(enemies.children[i].move){
                
                if(enemies.children[i].row === row){
                    if(enemies.children[i].frame%2 === 0)
                        enemies.children[i].frame += 1;
                    else
                        enemies.children[i].frame -= 1;
                }
            }
        }

        for (var i = 0; i < enemies.children.length; i++){
            if(enemies.children[i].move && enemies.children[i].row === row){
                enemies.children[i].x += direction;
            }
        }


    }


}


function destruir_muro (enemy, muro) {
    muro.destroy();
}



