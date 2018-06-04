
var loadingLabel;   // image - Cargando...
var label_pulsa;    // image - Toca para empezar o pulsa espacio para empezar

var music;          // audio

var button;         // button - Apaga y enciende la musica
var pointerDown;    // bool - se ha pulsado pero no levantado
var spacekey;

var X;              // int - ecuacion para el resize
var Y;              // int - ecuacion para el resize


var isDown = false; //para el modo pausa
var isUp = false;
var isSpace = false;

var numPlayers = 1;

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

        game.load.image('player', './assets/images/player.png');
        game.load.image('ball', './assets/images/ball.png');
        game.load.image('pause_fondo', './assets/images/transparente.png');
        game.load.image('button', './assets/images/boton.png');
        game.load.image('logo', './assets/images/logo.png');
        game.load.spritesheet('arrow', './assets/images/greenArrow.png', 85, 85);



    },
    create: function() {
        game.stage.backgroundColor = "#000000";
        loadingLabel.kill();

        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        textTitle = game.add.image(game.world.centerX, 100*Y, 'logo');
        textTitle.width = 350*X;
        textTitle.height = 100*Y;
        textTitle.anchor.setTo(0.5,0.5);

        textJugador1 = game.add.text(game.world.centerX, 230*Y, '1 Jugador', { fontSize: '20px', fill: '#ffffff'});
        textJugador1.width = textJugador1.width*X;
        textJugador1.height = textJugador1.height*Y;
        textJugador1.anchor.setTo(0.5,0.5);


        textJugador2 = game.add.text(game.world.centerX, 280*Y, "2 Jugadores", { fontSize: '20px', fill: '#ffffff'});
        textJugador2.width = textJugador2.width*X;
        textJugador2.height = textJugador2.height*Y;
        textJugador2.anchor.setTo(0.5,0.5);


        arrow1 = game.add.sprite(textJugador1.x-textJugador1.width/2-35*X, textJugador1.y, 'arrow');
        arrow1.anchor.setTo(0.5,0.5);
        arrow1.width = 30*X;
        arrow1.height = 25*Y;
        arrow1.frame=0;


        arrow2 = game.add.sprite(textJugador1.x+textJugador1.width/2+35*X, textJugador1.y, 'arrow');
        arrow2.anchor.setTo(0.5,0.5);
        arrow2.width = 30*X;
        arrow2.height = 25*Y;
        arrow2.frame=1;


        var sprite;

        sprite = game.add.sprite(0, 0, 'ball');
        sprite.width = game.world.width;
        sprite.height = game.world.height;

        //var tween = game.add.tween(sprite).to({ alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 200, 0, false);
        var tween = game.add.tween(sprite).to({ alpha: 0}, 20, Phaser.Easing.Linear.None, true, 200, 0, false);

        tween.onComplete.add(function(){
            spacekey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            spacekey.onDown.addOnce(this.start, this);
        }, this);

        cursors = game.input.keyboard.createCursorKeys(); // entradas por teclado
        cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        cursors.w = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        cursors.s = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

        numPlayers = 1;

        if(!game.device.desktop){
            textJugador1.text = "Toca la pantalla para jugar";
            textJugador2.kill();
            arrow1.kill();
            arrow2.kill();
        }
    },
    start: function() {
        game.state.start('play');
    },
    update: function() {

        if(!game.device.desktop && window.innerWidth >= window.innerHeight){
            if(game.input.pointer1.isDown) {
                numPlayers = 1;
                this.start();
            }
        }
        else if(game.device.desktop) {

            if(game.global.exposition){
                if(cursors.space.isDown){
                    this.start();
                }
            }

            if (cursors.s.isDown && !isDown) {
                arrow1.x = textJugador2.x - textJugador2.width / 2 - 35 * X;
                arrow1.y = textJugador2.y;
                arrow2.x = textJugador2.x + textJugador2.width / 2 + 35 * X;
                arrow2.y = textJugador2.y;
                numPlayers = 2;
                isDown = true;
            }
            else if (!cursors.s.isDown)
                isDown = false;

            if (cursors.w.isDown && !isUp) {
                arrow1.x = textJugador1.x - textJugador1.width / 2 - 35 * X;
                arrow1.y = textJugador1.y;
                arrow2.x = textJugador1.x + textJugador1.width / 2 + 35 * X;
                arrow2.y = textJugador1.y;
                numPlayers = 1;
                isUp = true;
            }
            else if (!cursors.w.isDown)
                isUp = false;
        }
    }
};
