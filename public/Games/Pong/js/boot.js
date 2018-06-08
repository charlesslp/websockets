
var primeraPortrait;

var bootState = {
    preload: function(){

        game.load.image('landscape', './assets/images/landscape.png');
        game.load.image('phone', './assets/images/phone.png');
        game.load.image('recarga', './assets/images/recarga.png');
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
};
