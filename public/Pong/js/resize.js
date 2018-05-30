
window.addEventListener('resize', function() {

    if(!game.device.desktop && window.innerWidth < window.innerHeight){

        game.width = window.innerWidth
        game.height = window.innerHeight;
        game.renderer.resize(game.width,game.height);

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

        if(game.state.current === "play"){
        	stop_all = true;
        }
    
    }else if(!game.device.desktop && window.innerWidth >= window.innerHeight){
        game.width = window.innerWidth;
        game.height = window.innerHeight;
        game.renderer.resize(game.width,game.height);

        game.world.width = window.innerWidth;
        game.world.height = window.innerHeight;

        if(label_portrait)
            label_portrait.kill();
        if(phone_portrait)
            phone_portrait.kill();
        if(fondo_portrait)
            fondo_portrait.kill();

        game.stage.backgroundColor = "#000000";

        game.global.x = window.innerWidth/560;
        game.global.y = window.innerHeight/370;
        if(primeraPortrait){
            primeraPortrait = false;
            game.state.start('menu');
        }

        if(game.state.current === "play"){
        	stop_all = false;
        }
    }

    if(game.device.desktop){
        sprite = game.add.sprite(0, 0, 'recarga2');
        sprite.width = window.innerWidth;
        sprite.height = window.innerHeight;
        label_pulsa = game.add.image(window.innerWidth/2, window.innerHeight/2, 'recarga');
        label_pulsa.anchor.setTo(0.5);
        label_pulsa.scale.setTo(0.35,0.35);
        label_pulsa.width = window.innerWidth;
        label_pulsa.height = label_pulsa.height*window.innerHeight/370;
    }
});