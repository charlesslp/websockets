//SpaceInvaders

var socket = io.connect(HOME_URL, {'forceNew': true});
var fromSocket = false;
var id_juego;

socket.on("conectado", function(){

    var url = new URL(document.URL)
    id_juego = url.searchParams.get("id");
    socket.emit("recibida_conn", url.searchParams.get("id"));

    url = new URL(document.URL)
    if(url.searchParams.get("mode") === 'exposition'){
        game.device.desktop = true;
        game.global.exposition = true;
    }


});


socket.on('press', function(data){

    if(data.userdata.userID === data.ids_users[0]){
        switch(data.userdata.key){
            case "A_on": {
                if(game.state.getCurrentState().key === "menu"){
                    music.stop();
                    game.state.start('play');
                }
                else if(!isPaused) {
                    cursors.space.isDown = true;
                    fromSocket = true;
                }
                else {
                    select_pause(); // en main.js
                }
                break;
            }
            case "left_on": {   
                cursors.left.isDown = true;
                fromSocket = true;
                break;
            }
            case "right_on": {   
                cursors.right.isDown = true;
                fromSocket = true;
                break;
            }
            case "left_off": {   
                cursors.left.isDown = false;
                fromSocket = true;
                break;
            }
            case "right_off": {   
                cursors.right.isDown = false;
                fromSocket = true;
                break;
            }
            case "start_off": {
                if(game.state.getCurrentState().key === "play")
                    pause(); // en main.js
                break;
            }
            case "down_off": {
                if(isPaused){
                    moveArrow("down"); // en main.js
                }
                break;
            }
            case "up_off": {
                if(isPaused){
                    moveArrow("up"); // en main.js
                }
                break;
            }
        }
    }
});

socket.on('refresh_page', function(id){
    window.location.replace(HOME_URL+"/catalogue.html");
});

socket.on('checked_id', function(pos){
    console.log("checked", pos);
});

socket.on('delete_last', function(pos){
    console.log("deleted", pos);
});