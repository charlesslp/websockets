var socket = io.connect('http://charleslp.info:4000', {'forceNew': true});

var id_juego;


socket.on('ID', function(id){
    id_juego = id;
    document.getElementById("rand_num").innerHTML = id_juego;
});


socket.on('start', function(id){
	window.location.href = '/spaceinvaders.html?id=' + id_juego;
});
