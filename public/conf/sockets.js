
var socket = io.connect(HOME_URL, {'forceNew': true}); //Modificar HOME_URL en config.js y añadirlo en el index.html del juego junto hasta este archivo
var id_juego; //id que devuelve el socket del juego y que se envia mediante url por si se quiere usar

socket.on("conectado", function(){ //El servidor emite esta funcion para avisar que se ha conectado un nuevo socket

    var url = new URL(document.URL);
    id_juego = url.searchParams.get("id");
    socket.emit("recibida_conn", url.searchParams.get("id")); //debemos avisar al servidor de que no es un nuevo socket, sino que es uno que ya existía

    url = new URL(document.URL);
    if(url.searchParams.get("mode") === 'exposition'){ //avisamos al juego de que estamos en modo exposicion.

        //Cambiar funcionalidad si no se usa Phaser.js
        game.device.desktop = true;
        game.global.exposition = true;
    }

});



/**
* data: {
*   ids_users: array,       -> array de usuarios ordenado por jugador 1, 2, 3...
*   userdata: {             -> datos enviados por el usuario
*       id_juego: string,   -> necesario para cuando se conecta, no hace falta usarlo en este archivo
*       key: string,        -> nombre de la acción (nombreTecla_on | nombreTecla_off) dependiendo de si la ha pulsado o dejado de pulsar
*       userID: number      -> id del usuario para saber la posición en el array de usuarios
*   }
* }
* **/
socket.on('press', function(data){ //Cuando el usuario pulsa una tecla se llama a esta funcion

    /** IMPORTANTE -> SI SE QUIERE AÑADIR JUGADORES,
     * COMPROBAR QUE EL userID COINCIDE CON ids_users[NUMERO]
     * */
    if(data.userdata.userID === data.ids_users[0]){ //ACCIONES DEL JUGADOR 1-------------------------------------------------------
        switch(data.userdata.key){
            case "A_on": { // El jugador comienza a pulsar el botón A
                cursors.space.isDown = true; // tecla por defecto: espacio
                cursors.space.isUp = false;
                break;
            }
            case "A_off": { // El jugador deja de pulsar el botón A
                cursors.space.isDown = false; // tecla por defecto: espacio
                cursors.space.isUp = true;
                break;
            }
            case "B_on": {
                // tecla por defecto: ninguna
                break;
            }
            case "B_off": {
                // tecla por defecto: ninguna
                break;
            }
            case "left_on": {
                cursors.left.isDown = true; // tecla por defecto: izquierda
                cursors.left.isUp = false;
                break;
            }
            case "left_off": {
                cursors.left.isDown = false; // tecla por defecto: izquierda
                cursors.left.isUp = true;
                break;
            }
            case "right_on": {
                cursors.right.isDown = true; // tecla por defecto: derecha
                cursors.right.isUp = false;
                break;
            }
            case "right_off": {
                cursors.right.isDown = false; // tecla por defecto: derecha
                cursors.right.isUp = true;
                break;
            }
            case "down_on": {
                cursors.down.isDown = true; // tecla por defecto: abajo
                cursors.down.isUp = false;
                break;
            }
            case "down_off": {
                cursors.down.isDown = false; // tecla por defecto: abajo
                cursors.down.isUp = true;
                break;
            }
            case "up_on": {
                cursors.up.isDown = true; // tecla por defecto: arriba
                cursors.up.isUp = false;
                break;
            }
            case "up_off": {
                cursors.up.isDown = false; // tecla por defecto: arriba
                cursors.up.isUp = true;
                break;
            }
            case "start_on": { // tecla por defecto: Escape
                //funcion a realizar cuando se pulse escape
                break;
            }
            case "start_off": { // tecla por defecto: Escape
                //funcion a realizar cuando se deje de pulsar escape
                break;
            }
        }
    }
});



socket.on('refresh_page', function(id){ //Si el servidor recarga la página, volvemos al catalogo
    window.location.replace(HOME_URL+"/catalogue.html");
});

socket.on('checked_id', function(pos){
    //funcion llamada cuando se conecta un usuario nuevo
});

socket.on('delete_last', function(pos){
    //funcion llamada cuando se desconecta un usuario
});