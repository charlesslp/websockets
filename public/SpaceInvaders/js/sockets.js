
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
        case "play_SI": {  
            music.stop();
            game.state.start('play');
            break;
        }
        case "shoot_SI": {   
            cursors.space.isDown = true;
            fromSocket = true;
            break;
        }
        case "left_down_SI": {   
            cursors.left.isDown = true;
            fromSocket = true;
            break;
        }
        case "right_down_SI": {   
            cursors.right.isDown = true;
            fromSocket = true;
            break;
        }
        case "left_up_SI": {   
            cursors.left.isDown = false;
            fromSocket = true;
            break;
        }
        case "right_up_SI": {   
            cursors.right.isDown = false;
            fromSocket = true;
            break;
        }
    }
});
