
var socket = io.connect('http://charleslp.info:4001', {'forceNew': true});
var id_juego;
var userID;
var player_num;




var url = new URL(document.URL)
var mi_id = url.searchParams.get("id");

if(mi_id !== null){
	comprobar_num(mi_id);
}

function comprobar_num(e){

	if(mi_id === null)
		id_juego = document.getElementById("numero").value;
	else
		id_juego = mi_id;

	socket.emit("comprueba", id_juego);

	return false;
}

function empezar(){
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	}
	else {
		cancelFullScreen.call(doc);
	}

	document.getElementById("bienvenido_usuario").style.display = 'none';
	document.getElementById("game").style.display = 'block';
}

function press(key){
	var array = {key: key, id_juego: id_juego, userID: userID};
	console.log(key);
	socket.emit('press_key', array);
}

socket.on("checked", function (id, num){

	if(id >= 0){
		userID = id;
		player_num = num;
		console.log(player_num);
		document.getElementById("form_num").style.display = 'none';
		document.getElementById("bienvenido_usuario").style.display = 'block';
	}
	else{
		id_juego = 0;
	}

});

socket.on("change_order", function (data){

	for (var i = 0; i < data.length; i++) {
		if(data[i] === userID){
			console.log("dentro del for");
			player_num = i+1;
			textPlayer.text = "Player " + player_num;
			i = data.length;
		}
	}

});

