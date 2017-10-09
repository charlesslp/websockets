var socket = io.connect('http://charleslp.info:4000', {'forceNew': true});
var fromSocket = false;
var id_juego;

socket.on("conectado", function(){


    var url = new URL(document.URL)
    id_juego = url.searchParams.get("id");
    socket.emit("recibida_conn", url.searchParams.get("id"));

});



socket.on('press', function(data){

	switch(data.userdata.key){
		case "play_PG": {
            if(data.userdata.userID === data.ids_users[0])
                cursors.x.isDown = true;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.enter.isDown = true;
			break;
		}
        case "up_down_PG": {				//tecla de flecha arriba pulsada
            if(data.userdata.userID === data.ids_users[0])
                cursors.w.isDown = true;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.up.isDown = true;
            break;
        }
        case "down_down_PG": {				//tecla de flecha abajo pulsada
            if(data.userdata.userID === data.ids_users[0])
                cursors.s.isDown = true;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.down.isDown = true;
            break;
        }
        case "up_up_PG": {					//tecla de flecha arriba levantada
            if(data.userdata.userID === data.ids_users[0])
                cursors.w.isDown = false;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.up.isDown = false;
            break;
        }
        case "down_up_PG": {				//tecla de flecha abajo levantada
            if(data.userdata.userID === data.ids_users[0])
                cursors.s.isDown = false;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.down.isDown = false;
            break;
        }
	}
});