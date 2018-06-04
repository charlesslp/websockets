//Pong

var socket = io.connect(HOME_URL, {'forceNew': true});
var fromSocket = false;
var id_juego;

socket.on("conectado", function(){

    var url = new URL(document.URL)
    id_juego = url.searchParams.get("id");
    socket.emit("recibida_conn", url.searchParams.get("id"));

    url = new URL(document.URL);
    if(url.searchParams.get("mode") === 'exposition'){
        game.device.desktop = true;
        game.global.exposition = true;
    }
});



var who_pressed = -1;

socket.on('press', function(data){


    if(!isPaused){
    	switch(data.userdata.key){
    		case "A_on": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.space.isDown = true;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.enter.isDown = true;
                break;
            }
            case "A_off": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.space.isDown = false;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.enter.isDown = false;
                break;
            }
            case "up_on": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.w.isDown = true;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.up.isDown = true;
                break;
            }
            case "down_on": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.s.isDown = true;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.down.isDown = true;
                break;
            }
            case "up_off": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.w.isDown = false;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.up.isDown = false;
                break;
            }
            case "down_off": {
                if(data.userdata.userID === data.ids_users[0])
                    cursors.s.isDown = false;
                else if(data.userdata.userID === data.ids_users[1])
                    cursors.down.isDown = false;
                break;
            }
            case "start_off": {
                if(who_pressed === -1){
                    who_pressed = data.userdata.userID;
                    pause();
                }
                else {
                    if(who_pressed === data.userdata.userID)
                        pause();
                }
                break;
            }
    	}
    }
    else {
        switch(data.userdata.key){
            case "A_off": {
                if(who_pressed === data.userdata.userID){
                    select_pause();
                }
                break;
            }
            case "up_off": {
                if(who_pressed === data.userdata.userID){
                    moveArrow("up");
                }
                break;
            }
            case "down_off": {
                if(who_pressed === data.userdata.userID){
                    moveArrow("down");
                }
                break;
            }
            case "start_off": {
                if(who_pressed === -1){
                    who_pressed = data.userdata.userID;
                    pause();
                }
                else {
                    if(who_pressed === data.userdata.userID)
                        pause();
                }
                break;
            }
        }
    }
});

socket.on('refresh_page', function(id){
    window.location.replace(HOME_URL+"/catalogue.html");
});

