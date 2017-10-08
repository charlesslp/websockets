
var socket = io.connect('http://charleslp.info:4000', {'forceNew': true});
var fromSocket = false;
var id_juego;

socket.on("conectado", function(id){

    id_juego = id;

    var url = new URL(document.URL)
    socket.emit("recibida_conn", url.searchParams.get("id"));

});

socket.on('press', function(key){

    
    switch(key){
        case "play": {  
            music.stop();
            game.state.start('play');
            break;
        }
        case "shoot": {   
            cursors.space.isDown = true;
            fromSocket = true;
            break;
        }
        case "left_down": {   
            cursors.left.isDown = true;
            fromSocket = true;
            break;
        }
        case "right_down": {   
            cursors.right.isDown = true;
            fromSocket = true;
            break;
        }
        case "left_up": {   
            cursors.left.isDown = false;
            fromSocket = true;
            break;
        }
        case "right_up": {   
            cursors.right.isDown = false;
            fromSocket = true;
            break;
        }
    }
});
