

    var ini_muro = function(){

        muros = game.add.group(); // añadimos el grupo de "plataformas" al game

        muros.enableBody = true; // permite las físicas dentro del grupo


        var muro;
        var n;

        for (var k = 0; k < 4; k++) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 4; j++) {
                    if(!(i === 0 && (j === 1 || j === 2))){


                        switch(k){
                            case 0: n = 40; break;
                            case 1: n = 15; break;
                            case 2: n = -15; break;
                            case 3: n = -40; break;
                        }

                        muro = muros.create(k*(game.world.width/4)+((game.world.width/8)-24*X)+(j*12*X)+n*X, (game.world.height - 70*Y) - i*12*Y - Z, 'muro');
                        muro.width = muro.width*X*0.5;
                        muro.height = muro.height*Y*0.5;
                        if(i === 0 || (i === 1 && (j === 0 || j === 3)) || (i === 2 && (j === 1 || j === 2))){
                            muro.tipo = 0;
                            muro.frame = 8;
                        }
                        else if (i === 1 && j === 1){
                            muro.tipo = 1;
                            muro.frame = 16;
                        }
                        else if(i === 1 && j === 2){
                            muro.tipo = 2;
                            muro.frame = 22;
                        }
                        else if(i === 2 && j === 0){
                            muro.tipo = 3;
                            muro.frame = 30;
                        }
                        else{
                            muro.tipo = 4;
                            muro.frame = 36;
                        }

                        muro.vida = 3;
                        muro.body.immovable = true;
                    }
                }
            }                
        }


    }

    var ini_HUD = function(){       

        scoreText = game.add.text(10*X, 2*Y, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });
        livesText = game.add.text(5*X, game.world.height-24*Y-Z, VIDAS, { fontSize: '20px', fill: '#ffffff' });
        scoreText.width = scoreText.width*X;
        scoreText.height = scoreText.height*Y;
        livesText.width = livesText.width*X;
        livesText.height = livesText.height*Y;

        sprite = game.add.sprite(0, 27*Y, 'fadeOut');
        sprite.width = game.world.width;
        sprite.height = 2*Y;

        if(!game.device.desktop){
            sprite.width = game.world.width-47*X;

            sprite = game.add.sprite(game.world.width-47*X, 0, 'fadeOut');
            sprite.width = 2*X;
            sprite.height = 29*Y;
        }

        sprite = game.add.sprite(0, game.world.height-25*Y-Z, 'line');
        sprite.width = game.world.width;
        sprite.height = 2*Y;


        for (var i = 0; i < VIDAS; i++) {
            img_vidas[i] = game.add.sprite((25+i*35)*X, game.world.height-21*Y-Z, 'player');
            img_vidas[i].width = img_vidas[i].width*X;
            img_vidas[i].height = img_vidas[i].height*Y;
        }

        scoreText.alpha = 0
        var tween = game.add.tween(scoreText).to({ alpha: 1}, 200, Phaser.Easing.Linear.None, true, 0, 5, false);


        if(!game.device.desktop){

            sprite = game.add.sprite(0, game.world.height-52*Y, 'line');
            sprite.width = game.world.width-130*X;;
            sprite.height = 2*Y;


            sprite = game.add.sprite(game.world.width-130*X, game.world.height-25*Y-Z, 'line');
            sprite.width = 2*X;
            sprite.height = 25*Y+Z;

            controller = game.add.sprite(100*X, game.world.height-50*Y, 'mando');
            controller.scale.setTo(1.8);
            controller.width = controller.width*X;
            controller.height = controller.height*Y;


            var boton_disparo = game.add.image(game.world.width-100*X, game.world.height-38*Y, 'boton_disparo');
            boton_disparo.anchor.setTo(0, 0.5);
            boton_disparo.width = 60*X;
            boton_disparo.height = 60*Y;
        }


    }