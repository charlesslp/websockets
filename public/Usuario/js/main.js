
var socket;
var id_juego;
var userID;
var list;

$(document).ready(function(){
	socket = io.connect('http://charleslp.info:4000', {'forceNew': true});
	//ini_spaceinvaders();
	//ini_pong();
	socket_menu();
	menu_seleccion();
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

function menu_seleccion(){

	spaceinvaders = document.getElementById("btn_SI_MENU");
	pong = document.getElementById("btn_PG_MENU");

	socket_menu();

	window.addEventListener('resize', function() {
		resize_menu();
	});

	resize_menu();
}

function resize_menu(){

	if($(window).width() >= $(window).height()){
		if(pong.classList.contains('two_btn_v')){
			spaceinvaders.classList.remove('two_btn_v');
			pong.classList.remove('two_btn_v');
		}
		if(!pong.classList.contains('two_btn_h')){
			spaceinvaders.classList.add('two_btn_h');
			pong.classList.add('two_btn_h');
		}
	}
	else {
		if(pong.classList.contains('two_btn_h')){
			spaceinvaders.classList.remove('two_btn_h');
			pong.classList.remove('two_btn_h');
		}
		if(!pong.classList.contains('two_btn_v')){
			spaceinvaders.classList.add('two_btn_v');
			pong.classList.add('two_btn_v');
		}
	}
}


function socket_menu(){

	socket.on("checked", function (id){

		if(id >= 0){
			userID = id;
			document.getElementById("form_num").style.display = 'none';

			spaceinvaders.style.display = 'block';
			spaceinvaders.addEventListener("touchstart", function(){
				spaceinvaders.style.backgroundImage = "url(Usuario/assets/left_press.png)";
			}, false);
			spaceinvaders.addEventListener("touchend", function(){
				list = {id_juego: id_juego, start: "start_SI"};
				socket.emit("start", list);
				ini_spaceinvaders();
				spaceinvaders.style.display = 'none';
				pong.style.display = 'none';
			}, false);

			pong.style.display = 'block';
			pong.addEventListener("touchstart", function(){
				pong.style.backgroundImage = "url(Usuario/assets/left_press.png)";
			}, false);
			pong.addEventListener("touchend", function(){
				list = {id_juego: id_juego, start: "start_PG"};
				socket.emit("start", list);
				ini_pong();
				spaceinvaders.style.display = 'none';
				pong.style.display = 'none';
			}, false);

		}
		else{
			id_juego = 0;
		}

	});
}