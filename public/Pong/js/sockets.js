//Pong

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
		case "A_on": {
            if(data.userdata.userID === data.ids_users[0])
                cursors.x.isDown = true;
            else if(data.userdata.userID === data.ids_users[1])
                cursors.enter.isDown = true;
            break;
        }
        case "A_off": {
            if(data.userdata.userID === data.ids_users[0])
                cursors.x.isDown = false;
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
	}
});