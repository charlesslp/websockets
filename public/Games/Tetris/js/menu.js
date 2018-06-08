
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
var tweenComplete = false;

var menuState = {


    preload: function() {

        X = game.global.x;
        Y = game.global.y;

        pointerDown = false;
        tweenComplete = false;

        game.stage.backgroundColor = "#ffffff";

        loadingLabel = game.add.text(game.world.centerX, game.world.centerY, "Cargando...");
        loadingLabel.width = loadingLabel.width*X;
        loadingLabel.height = loadingLabel.height*Y;
        loadingLabel.anchor.setTo(0.5);

        game.load.image('fadeIn', './assets/images/token3.png');
        game.load.image('logo', './assets/images/logo.png');
        game.load.image('pulsaEspacio', './assets/images/pulsaEspacio.png');
        game.load.image('pulsaA', './assets/images/pulsaA.png');
        game.load.image('tocaPantalla', './assets/images/tocaPantalla.png');
        game.load.spritesheet('arrow', './assets/images/greenArrow.png', 85, 85);


        game.load.spritesheet('token', './assets/images/gameboy/Tetris_sprites/tetris_sheet.png', 32, 32);
        game.load.spritesheet('nextTok', './assets/images/gameboy/Tetris_sprites/next_token_sheet.png', 96, 128);
        game.load.image('background', './assets/images/gameboy/fondo.png');
        game.load.image('line', './assets/images/token3.png');
        game.load.image('pause_fondo', './assets/images/transparente.png');
        game.load.image('gameOver', './assets/images/gameOver.png');
        game.load.spritesheet('arrow', './assets/images/greenArrow.png', 85, 85);
        game.load.image('button', './assets/images/boton.png');
        game.load.image('fadeOut', './assets/images/fadeOut.png');

    },
    create: function() {
        game.stage.backgroundColor = "#000000";
        loadingLabel.kill();

        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        textTitle = game.add.image(game.world.centerX, game.world.centerY, 'logo');
        textTitle.width = game.world.width < game.world.height ? game.world.width:game.world.height;
        textTitle.height = game.world.height;
        textTitle.anchor.setTo(0.5,0.5);

        if(game.global.exposition) {
            label_pulsa = game.add.image(game.world.centerX, 310 * Y, 'pulsaA');
        }
        else if(game.device.desktop) {
            label_pulsa = game.add.image(game.world.centerX, 310*Y, 'pulsaEspacio');
        }
        else {
            label_pulsa = game.add.image(game.world.centerX, 310*Y, 'tocaPantalla');
        }


        label_pulsa.width = textTitle.width-20*X;
        label_pulsa.height = 30*Y;
        label_pulsa.anchor.setTo(0.5,0.5);

        game.add.tween(label_pulsa).to({ alpha: 0 }, 600, Phaser.Easing.Linear.None, true, 0, 10000, true);

/*
        textJugador2 = game.add.text(game.world.centerX, 250*Y, "2 Jugadores", { fontSize: '20px', fill: '#ffffff'});
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
*/

        var sprite;

        sprite = game.add.sprite(0, 0, 'fadeIn');
        sprite.width = game.world.width;
        sprite.height = game.world.height;

        //var tween = game.add.tween(sprite).to({ alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 200, 0, false);
        var tween = game.add.tween(sprite).to({ alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 200, 0, false);

        tween.onComplete.add(function(){
            tweenComplete = true;

            spacekey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            spacekey.onDown.addOnce(this.start, this);
        }, this);

        cursors = game.input.keyboard.createCursorKeys(); // entradas por teclado
        cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        /*
        cursors.w = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        cursors.s = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

        numPlayers = 1;

        if(!game.device.desktop){
            textJugador1.text = "Toca la pantalla para jugar";
            textJugador2.kill();
            arrow1.kill();
            arrow2.kill();
        }*/
    },
    start: function() {
        game.state.start('play');
    },
    update: function() {

        if(!game.device.desktop){
            if(game.input.pointer1.isDown && tweenComplete) {
                tweenComplete = false;
                this.start();
            }
        }
        else if(game.device.desktop) {

            if(game.global.exposition){
                if(cursors.space.isDown){
                    this.start();
                }
            }
/*
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
*/
        }
    }
};
