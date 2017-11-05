
window.addEventListener('resize', function() {

    if(!game.device.desktop){
        game.width = window.innerWidth
        game.height = window.innerHeight;
        game.renderer.resize(game.width,game.height);

        game.world.width = window.innerWidth
        game.world.height = window.innerHeight;

        game.global.x = window.innerWidth/560;
        game.global.y = window.innerHeight/370;

        X = game.global.x;
        Y = game.global.y;

        gamepad.width = game.world.width;
        gamepad.height = game.world.height;

        pad.x = 7*X;
        pad.y = game.world.height-230*Y;
        pad.width = 220*X;
        pad.height = 220*Y;

        if(pad.width < pad.height){
            pad.height = pad.width;
        }
        else {
            pad.width = pad.height;
        }

        botonA.x = 448*X;
        botonA.y = 113*Y;
        botonA.width = 100*X;
        botonA.height = 100*Y;

        botonB.x = 350*X;
        botonB.y = 204*Y;
        botonB.width = 100*X;
        botonB.height = 100*Y;


        startImg.x = 238*X;
        startImg.y = 173*Y;
        startImg.width = 100*X;
        startImg.height = 50*Y;

        textPlayer.x = game.world.centerX;
        textPlayer.y = 70*Y;
        textPlayer.width = 100*X;
        textPlayer.height = 50*Y;
        textPlayer.anchor.setTo(0.5, 1);

    }

});
