
var socket;


$(document).ready(function(){
	socket = io.connect('http://charleslp.info:4000', {'forceNew': true});
	ini_spaceinvaders();
});



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