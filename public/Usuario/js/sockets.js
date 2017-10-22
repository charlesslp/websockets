
var socket = io.connect('http://charleslp.info:4001', {'forceNew': true});
var id_juego;
var userID;


function comprobar_num(e){

	id_juego = document.getElementById("numero").value;

	socket.emit("comprueba", id_juego);

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

	return false;
}


function press(key){
	var array = {key: key, id_juego: id_juego, userID: userID};
	console.log(key);
	socket.emit('press_key', array);
}

socket.on("checked", function (id){

	if(id >= 0){
		userID = id;
		document.getElementById("form_num").style.display = 'none';
		document.getElementById("game").style.display = 'block';
	}
	else{
		id_juego = 0;
	}

});