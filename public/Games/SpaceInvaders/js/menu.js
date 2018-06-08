
var primeraPortrait;

var bootState = {
    preload: function(){

        game.load.image('landscape', './assets/letras/landscape.png');
        game.load.image('phone', './assets/images/phone.png');
        game.load.image('recarga', './assets/letras/recarga.png');
        game.load.image('recarga2', './assets/images/recarga2.png');
        game.load.image('gira_fondo', './assets/images/gira_fondo.png');
    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE); // le decimos que vamos a usar las físicas en nuestro juego

        primeraPortrait = false;

        if(!game.device.desktop && game.scale.isGamePortrait){

            primeraPortrait = true;

            game.stage.backgroundColor = "#e4ff00";

            fondo_portrait = game.add.image(0, 0, 'gira_fondo');
            fondo_portrait.width = game.world.width;
            fondo_portrait.height = game.world.height;

            label_portrait = game.add.image(window.innerWidth/2, window.innerHeight*3/5, 'landscape');
            label_portrait.anchor.setTo(0.5);
            label_portrait.scale.setTo(0.35,0.35);
            label_portrait.width = window.innerWidth;
            label_portrait.height = (label_portrait.height-25)*window.innerHeight/370;

            phone_portrait = game.add.image(window.innerWidth/2, window.innerHeight*2/5, 'phone');
            phone_portrait.anchor.setTo(0.5);
        
        }
        else
            game.state.start('menu');
    }
}



var loadingLabel;   // image - Cargando...
var label_pulsa;    // image - Toca para empezar o pulsa espacio para empezar

var label_portrait;
var phone_portrait;
var fondo_portrait;

var music;          // audio

var button;         // button - Apaga y enciende la musica
var pointerDown;    // bool - se ha pulsado pero no levantado
var spacekey;

var X;              // int - ecuacion para el resize
var Y;              // int - ecuacion para el resize


var menuState = {


	preload: function() {

        X = game.global.x;
        Y = game.global.y;

        pointerDown = false;

        game.stage.backgroundColor = "#ffffff";

        loadingLabel = game.add.text(game.world.centerX, game.world.centerY, "Cargando...");
        loadingLabel.width = loadingLabel.width*X;
        loadingLabel.height = loadingLabel.height*Y;
        loadingLabel.anchor.setTo(0.5);
        

        game.load.image('titulo', './assets/images/titulo.png');
        game.load.image('fadeOut', './assets/images/fadeOut.png');
        game.load.image('pulsaEspacio', './assets/letras/pulsaEspacio.png');
        game.load.image('pulsaA', './assets/letras/pulsaA.png');
        game.load.image('tocaPantalla', './assets/letras/tocaPantalla.png');
		game.load.image('gameOver', './assets/letras/gameOver.png');
		game.load.image('reglas', './assets/images/reglas.png');
        game.load.image('line', './assets/images/line.png');
        game.load.image('boton_disparo', './assets/images/boton_disparo2.png');
        game.load.image('pause_fondo', './assets/images/transparente.png');


        game.load.image('buttonPause', './assets/images/botonPause.png');
        game.load.spritesheet('button', './assets/images/button.png', 50, 50);
        game.load.spritesheet('player', './assets/images/player.png', 26, 16);
        game.load.spritesheet('muro', './assets/images/muro4.png', 24, 24);
        game.load.spritesheet('enemy', './assets/images/enemies.png', 24, 24);
        game.load.spritesheet('boss', './assets/images/boss.png', 35, 17);
        game.load.spritesheet('misil1', './assets/images/e_bullet1.png', 8, 11);
        game.load.spritesheet('misil2', './assets/images/e_bullet2.png', 8, 11);
        game.load.spritesheet('misil3', './assets/images/e_bullet3.png', 8, 11);
        game.load.spritesheet('explosion', './assets/images/explosion.png', 11, 11);
        game.load.spritesheet('bala', './assets/images/bullet.png', 2, 5);
        game.load.spritesheet('mando', './assets/images/mando.png', 50, 32);
        game.load.spritesheet('arrow', './assets/images/greenArrow.png', 85, 85);


        game.load.audio('intro_song', './assets/sonidos/spaceinvaders.mp3');
        game.load.audio('shoot', './assets/sonidos/shoot.wav');
        game.load.audio('mov1', './assets/sonidos/fastinvader1.wav');
        game.load.audio('mov2', './assets/sonidos/fastinvader2.wav');
        game.load.audio('mov3', './assets/sonidos/fastinvader3.wav');
        game.load.audio('mov4', './assets/sonidos/fastinvader4.wav');
        game.load.audio('enemykill', './assets/sonidos/invaderkilled.wav');
        game.load.audio('boss', './assets/sonidos/boss.wav');
        game.load.audio('bosskill', './assets/sonidos/bosskilled.wav');
        game.load.audio('explosion', './assets/sonidos/explosion.wav');

	},
	create: function() {

        game.stage.backgroundColor = "#000000";
        loadingLabel.kill();
        
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        var sprite;
        var speed;
        var delay = -1000;

        for (var i = 0; i < 40; i++) {

            sprite = game.add.sprite(game.world.randomX, game.world.height+10*Y, 'bala');
            sprite.width = sprite.width*X;
            sprite.height = sprite.height*Y;
            speed = game.rnd.between(1000, 2000);


            //tween( atributo a modificar ) | to( { final de la animacion }, tiempo de la animación, efecto, empezar automaticamente, delay o tiempo hasta el inicio de la animación, REPETICIONES, loop alante-atras)
            game.add.tween(sprite).to({ y: -50*Y }, speed, Phaser.Easing.Linear.None, true, delay, 10000, false);

            delay += 100;
            
        }



        var image = game.add.image(game.world.centerX, 110*Y, 'titulo');
        image.anchor.setTo(0.5);
        image.width = image.width*X;
        image.height = image.height*Y;

        if(game.global.exposition)
            label_pulsa = game.add.image(game.world.centerX, image.y+image.height/2+5*Y, 'pulsaA');
        else if(game.device.desktop)
            label_pulsa = game.add.image(game.world.centerX, image.y+image.height/2+5*Y, 'pulsaEspacio');
        else
            label_pulsa = game.add.image(game.world.centerX, image.y+image.height/2+5*Y, 'tocaPantalla');

        label_pulsa.anchor.setTo(0.5);
        label_pulsa.scale.setTo(0.25,0.25);
        label_pulsa.width = label_pulsa.width*X;
        label_pulsa.height = label_pulsa.height*Y;

        game.add.tween(label_pulsa).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, 10000, true);

        image = game.add.image(game.world.centerX, label_pulsa.y+10*Y, 'reglas');
        image.anchor.setTo(0.5);
        image.width = image.width*X;
        image.height = image.height*Y;
        image.y += image.height/2 + 20;

        sprite = game.add.sprite(0, 0, 'fadeOut');
        sprite.width = game.world.width;
        sprite.height = game.world.height;

        var tween = game.add.tween(sprite).to({ alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 200, 0, false);

        tween.onComplete.add(function(){  
            spacekey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            spacekey.onDown.addOnce(this.start, this);
        }, this);


        music = game.add.audio('intro_song', 1, true); //(key, volumen, loop)
        button = game.add.button(game.world.width-55*X, 5*Y, 'button', this.actionOnClick, this);
        button.width = button.width*X;
        button.height = button.height*Y;

        if(game.global.PLAY_MUSIC){
            music.play();
            button.frame = 0;
        }
        else{
            button.frame = 1;
        }


        ini_easter_egg();
    },
    start: function() {
        music.stop();
    	game.state.start('play');
    },
    actionOnClick: function() {
        if(!game.device.desktop && window.innerWidth < window.innerHeight)
            console.log("gira el movil");
        else {
            game.global.PLAY_MUSIC = !game.global.PLAY_MUSIC;

            music.stop();

            if(game.global.PLAY_MUSIC){
                music.play();
                button.frame = 0;
            }
            else{
                button.frame = 1;
            }
        }
    },
    update: function() {

        if(!game.device.desktop && window.innerWidth >= window.innerHeight){
            if(game.input.pointer1.isDown)
                pointerDown = true;

            if(game.input.pointer1.isUp && pointerDown){
                pointerDown = false;
                if(Math.abs(game.input.pointer1.positionUp.x-game.input.pointer1.positionDown.x) < 50*X &&
                    Math.abs(game.input.pointer1.positionUp.y-game.input.pointer1.positionDown.y) < 50*Y &&
                    (game.input.pointer1.positionUp.x < button.x || game.input.pointer1.positionUp.y > button.y+button.height))
                        this.start();
            }
        }
    }
};

