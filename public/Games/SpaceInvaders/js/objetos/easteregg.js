
var ee_contraseña;

var ee_texto;

function ini_easter_egg(){

    ee_contraseña = 0;
    game.global.easter_egg = false;

    ee_texto = "JOSE RAMON MOLA MOGOLLON"

    game.input.keyboard.onDownCallback = function(e) {


        if(game.state.current === "menu"){
            switch(ee_contraseña){
                case 0:{
                    if(e.keyCode === 83)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 1:{
                    if(e.keyCode === 80)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 2:{
                    if(e.keyCode === 73)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 3:{
                    if(e.keyCode === 68)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 4:{
                    if(e.keyCode === 69)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 5:{
                    if(e.keyCode === 82)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 6:{
                    if(e.keyCode === 77)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 7:{
                    if(e.keyCode === 65)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
                case 8:{
                    if(e.keyCode === 78)
                        ee_contraseña++;
                    else
                        ee_contraseña = 0;
                    break;
                }
            }


            if(ee_contraseña === 9){
                ee_contraseña++;
                game.global.easter_egg = true;

                var sprite = game.add.sprite(0, 0, 'fadeOut');
                sprite.width = game.world.width;
                sprite.height = game.world.height;

                var tween = game.add.tween(sprite).to({ alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        }

    }

}

var ee_frase;
var ee_marcados = [];
var ee_cont;

function ee_ini(){

    if(game.global.easter_egg){

        ee_cont = 0;

        ee_frase = game.add.text(game.world.centerX, 85*Y, "                        ", { fontSize: '20px', fill: '#ffffff' });
        ee_frase.anchor.setTo(0.5);
        ee_frase.width = ee_frase.width*X;
        ee_frase.height = ee_frase.height*Y;

        for (var i = 0; i < 24; i++) {
            ee_marcados[i] = false;
        }

        ee_marcados[4] = true;
        ee_marcados[10] = true;
        ee_marcados[15] = true;
    }

}

function ee_next(){

    if(game.global.easter_egg){
        if(ee_cont < 21){
            var rand = Math.floor((Math.random() * 24));

            while(ee_marcados[rand])
                rand = Math.floor((Math.random() * 24));


            var pre = ee_frase.text.substr(0, rand);
            var post = ee_frase.text.substr(rand+1, ee_frase.text.length);

            ee_marcados[rand] = true;
            ee_frase.text = pre + ee_texto[rand] + post;
            ee_cont++;

        }
    }
}